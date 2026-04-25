import { useRef, useEffect, useState, useCallback, useId } from "react";

type YTPlayerInstance = {
  destroy: () => void;
  unMute: () => void;
  mute: () => void;
  isMuted: () => boolean;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
};

type YTNamespace = {
  Player: new (el: HTMLElement, opts: unknown) => YTPlayerInstance;
};

let iframeApiLoad: Promise<YTNamespace> | null = null;

function getYouTubeAPI(): Promise<YTNamespace> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  const w = window as unknown as {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  };
  if (w.YT?.Player) return Promise.resolve(w.YT);
  if (iframeApiLoad) return iframeApiLoad;
  iframeApiLoad = new Promise<YTNamespace>((resolve) => {
    const done = () => { if (w.YT?.Player) resolve(w.YT); };
    const previous = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      if (typeof previous === "function") previous();
      done();
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      (document.head || document.body).appendChild(tag);
    }
  });
  return iframeApiLoad;
}

type Props = {
  videoId: string;
  projectTitle: string;
  title: string;
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M4 3.5l13 6.5-13 6.5V3.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" aria-hidden="true">
      <rect x="4" y="3" width="5" height="14" rx="1.2" />
      <rect x="11" y="3" width="5" height="14" rx="1.2" />
    </svg>
  );
}

function SeekBackIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="12 15 7 10 12 5" />
      <polyline points="17 15 12 10 17 5" />
    </svg>
  );
}

function SeekForwardIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="8 15 13 10 8 5" />
      <polyline points="3 15 8 10 3 5" />
    </svg>
  );
}

export default function YouTubeAmbientPlayer({ videoId, projectTitle, title }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const [audioOn, setAudioOn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const unmuteHintId = useId();

  // Build player
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;

    (async () => {
      try {
        const YT = await getYouTubeAPI();
        if (cancelled) return;
        const Player = (YT as any).Player;
        new Player(host, {
          width: "100%",
          height: "100%",
          videoId,
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
            origin: typeof window !== "undefined" ? window.location.origin : undefined,
          },
          events: {
            onReady: (e: { target: YTPlayerInstance }) => {
              if (cancelled) { e.target.destroy(); return; }
              playerRef.current = e.target;
              setAudioOn(!e.target.isMuted());
            },
            onStateChange: (e: { data: number }) => {
              // 1 = playing, 2 = paused, 0 = ended
              setIsPlaying(e.data === 1);
            },
          },
        } as any);
      } catch { /* script blocked or no network */ }
    })();

    return () => {
      cancelled = true;
      try { playerRef.current?.destroy(); } catch { /**/ }
      playerRef.current = null;
      setIsPlaying(false);
      setProgress(0);
    };
  }, [videoId]);

  // Poll progress while playing
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      try {
        const cur = p.getCurrentTime();
        const dur = p.getDuration();
        if (dur > 0) setProgress((cur / dur) * 100);
      } catch { /**/ }
    }, 500);
    return () => clearInterval(id);
  }, [isPlaying]);

  const toggleAudio = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (p.isMuted()) { p.unMute(); setAudioOn(true); }
    else { p.mute(); setAudioOn(false); }
  }, []);

  const togglePlay = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    try { isPlaying ? p.pauseVideo() : p.playVideo(); } catch { /**/ }
  }, [isPlaying]);

  const seek = useCallback((delta: number) => {
    const p = playerRef.current;
    if (!p) return;
    try { p.seekTo(p.getCurrentTime() + delta, true); } catch { /**/ }
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const track = progressTrackRef.current;
    const p = playerRef.current;
    if (!track || !p) return;
    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    try {
      const dur = p.getDuration();
      if (dur > 0) { p.seekTo(pct * dur, true); setProgress(pct * 100); }
    } catch { /**/ }
  }, []);

  return (
    <div className="project-youtube-ambient" role="group" aria-label={`${projectTitle} demo video`}>
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
          <div className="project-youtube-iframe-host" ref={hostRef} aria-label={title} />
          <div className="project-youtube-embed-fringe" aria-hidden />
          <div className="project-youtube-embed-scan" aria-hidden />

          {/* Controls overlay — sits above the iframe in the parent document.
              pointer-events: auto means window.pointermove always fires here
              (no cursor freeze) and the parent's cursor:none applies. */}
          <div
            className="yt-overlay"
            data-paused={!isPlaying}
            aria-hidden="true"
          >
            <div className="yt-center-row">
              <button className="yt-ctrl-btn" onClick={() => seek(-5)} tabIndex={-1}>
                <SeekBackIcon />
                <span className="yt-ctrl-label">5s</span>
              </button>
              <button className="yt-ctrl-btn yt-play-btn" onClick={togglePlay} tabIndex={-1}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button className="yt-ctrl-btn" onClick={() => seek(5)} tabIndex={-1}>
                <SeekForwardIcon />
                <span className="yt-ctrl-label">5s</span>
              </button>
            </div>

            <div className="yt-progress-wrap" onClick={handleProgressClick}>
              <div className="yt-progress-track" ref={progressTrackRef}>
                <div className="yt-progress-fill" style={{ width: `${progress}%` }} />
                <div className="yt-progress-knob" style={{ left: `${progress}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .yt-overlay {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.08) 0%,
            transparent 28%,
            transparent 55%,
            rgba(0,0,0,0.55) 100%
          );
          opacity: 0;
          transition: opacity 0.22s ease;
          border-radius: inherit;
        }

        .project-youtube-embed:hover .yt-overlay,
        .yt-overlay[data-paused='true'] {
          opacity: 1;
        }

        /* Center play/pause + seek row */
        .yt-center-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex: 1;
        }

        .yt-ctrl-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 0;
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 50%;
          background: rgba(0,0,0,0.52);
          backdrop-filter: blur(10px);
          color: #fff;
          width: 44px;
          height: 44px;
          justify-content: center;
          transition: transform 0.16s ease, background 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
        }

        .yt-ctrl-btn:hover {
          transform: scale(1.1);
          background: rgba(0,255,136,0.18);
          border-color: rgba(0,255,136,0.5);
          box-shadow: 0 0 18px rgba(0,255,136,0.22);
        }

        .yt-ctrl-btn:active {
          transform: scale(0.94);
        }

        .yt-play-btn {
          width: 56px;
          height: 56px;
          border-width: 1.5px;
          border-color: rgba(255,255,255,0.28);
        }

        .yt-ctrl-label {
          font-size: 0.52rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          line-height: 1;
          opacity: 0.75;
          /* hidden inside the round button — floats below the icon */
          position: absolute;
          bottom: -1.15rem;
          color: rgba(255,255,255,0.8);
          text-shadow: 0 1px 4px rgba(0,0,0,0.6);
          pointer-events: none;
        }

        .yt-ctrl-btn {
          position: relative; /* needed for the absolute label */
        }

        /* Progress bar */
        .yt-progress-wrap {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0.55rem 0.7rem 0.45rem;
        }

        .yt-progress-track {
          position: relative;
          height: 3px;
          border-radius: 999px;
          background: rgba(255,255,255,0.22);
          transition: height 0.15s ease;
        }

        .yt-progress-wrap:hover .yt-progress-track {
          height: 5px;
        }

        .yt-progress-fill {
          position: absolute;
          inset: 0 auto 0 0;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
          pointer-events: none;
          transition: width 0.18s linear;
        }

        .yt-progress-knob {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 8px rgba(0,255,136,0.55);
          pointer-events: none;
          transition: transform 0.15s ease;
        }

        .yt-progress-wrap:hover .yt-progress-knob {
          transform: translate(-50%, -50%) scale(1);
        }
      `}</style>
    </div>
  );
}
