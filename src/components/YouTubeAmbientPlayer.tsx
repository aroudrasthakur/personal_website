import { useRef, useEffect, useState, useCallback, useId } from "react";

type YTPlayerInstance = {
  destroy: () => void;
  unMute: () => void;
  mute: () => void;
  isMuted: () => boolean;
};

type YTNamespace = {
  Player: new (el: HTMLElement, opts: unknown) => YTPlayerInstance;
};

let iframeApiLoad: Promise<YTNamespace> | null = null;

function getYouTubeAPI(): Promise<YTNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("no window"));
  }
  const w = window as unknown as {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  };
  if (w.YT?.Player) {
    return Promise.resolve(w.YT);
  }
  if (iframeApiLoad) {
    return iframeApiLoad;
  }
  iframeApiLoad = new Promise<YTNamespace>((resolve) => {
    const done = () => {
      if (w.YT?.Player) resolve(w.YT);
    };
    const previous = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      if (typeof previous === "function") previous();
      done();
    };
    if (
      !document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      )
    ) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      (document.head || document.body).appendChild(tag);
    }
  });
  return iframeApiLoad;
}

type Props = {
  videoId: string;
  /** Short label for the demo embed (e.g. project name). */
  projectTitle: string;
  /** Accessible name for the iframe. */
  title: string;
};

export default function YouTubeAmbientPlayer({
  videoId,
  projectTitle,
  title,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  /** Reflects the YouTube player: `true` = sound is audible (unmuted). */
  const [audioOn, setAudioOn] = useState(false);
  const unmuteHintId = useId();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    const playerId = videoId;

    (async () => {
      try {
        const YT = await getYouTubeAPI();
        if (cancelled) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Player = (YT as any).Player;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new Player(host, {
          width: "100%",
          height: "100%",
          videoId: playerId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            playsinline: 1,
            modestbranding: 1,
            loop: 1,
            playlist: videoId,
            fs: 0,
            disablekb: 1,
            iv_load_policy: 3,
            cc_load_policy: 0,
            mute: 1,
            enablejsapi: 1,
            origin:
              typeof window !== "undefined"
                ? window.location.origin
                : undefined,
          },
          events: {
            onReady: (e: { target: YTPlayerInstance }) => {
              if (cancelled) {
                e.target.destroy();
                return;
              }
              playerRef.current = e.target;
              setAudioOn(!e.target.isMuted());
            },
          },
        } as any);
      } catch {
        /* script blocked or no network */
      }
    })();

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* */
      }
      playerRef.current = null;
    };
  }, [videoId]);

  const toggleAudio = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (p.isMuted()) {
      p.unMute();
      setAudioOn(true);
    } else {
      p.mute();
      setAudioOn(false);
    }
  }, []);

  return (
    <div
      className="project-youtube-ambient"
      role="group"
      aria-label={`${projectTitle} demo video`}
    >
      <div className="project-youtube-ambient-header">
        <div className="project-youtube-ambient-chrome">
          <span className="project-youtube-ambient-label">DEMO</span>
          <span className="project-youtube-ambient-sep" aria-hidden />
        </div>
        <div className="project-youtube-ambient-audio">
          <span className="project-youtube-ambient-audio-kicker">Audio</span>
          <button
            type="button"
            className="project-youtube-audio-switch"
            role="switch"
            aria-checked={audioOn ? "true" : "false"}
            data-audio={audioOn ? "on" : "off"}
            aria-describedby={!audioOn ? unmuteHintId : undefined}
            aria-label="Demo audio"
            onClick={toggleAudio}
          >
            <span className="project-youtube-audio-switch-track">
              <span className="project-youtube-audio-switch-thumb" />
            </span>
          </button>
        </div>
      </div>
      <div className="project-youtube-embed-slab">
        <div className="project-youtube-ambient-rail" aria-hidden />
        <div className="project-youtube-embed" tabIndex={-1}>
          <div
            className="project-youtube-iframe-host"
            ref={hostRef}
            aria-label={title}
          />
          <div className="project-youtube-embed-fringe" aria-hidden />
          <div className="project-youtube-embed-scan" aria-hidden />
        </div>
      </div>
    </div>
  );
}
