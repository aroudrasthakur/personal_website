export function getYouTubeVideoId(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;
  const s = url.trim();

  const tryUrl = (href: string) => {
    try {
      const u = new URL(href);
      const host = u.hostname.replace(/^www\./, '');

      if (host === 'youtu.be') {
        const id = u.pathname.split('/').filter(Boolean)[0];
        return id && /^[\w-]{11}$/.test(id) ? id : null;
      }

      if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
        if (u.pathname === '/watch') {
          const v = u.searchParams.get('v');
          return v && /^[\w-]{11}$/.test(v) ? v : null;
        }
        const embed = u.pathname.match(/^\/embed\/([^/?]+)/);
        if (embed?.[1] && /^[\w-]{11}$/.test(embed[1])) return embed[1];
        const short = u.pathname.match(/^\/shorts\/([^/?]+)/);
        if (short?.[1] && /^[\w-]{11}$/.test(short[1])) return short[1];
      }
    } catch {
      /* ignore */
    }
    return null;
  };

  if (s.startsWith('http://') || s.startsWith('https://')) {
    return tryUrl(s);
  }

  if (/^[\w-]{11}$/.test(s)) return s;
  return null;
}

type EmbedMode = 'default' | 'ambient';

/**
 * @param mode ambient = muted autoplay, loop, minimal native chrome (per YouTube’s iframe rules).
 */
export function getYouTubeEmbedSrc(
  videoId: string,
  opts?: { rel?: 0 | 1; mode?: EmbedMode }
): string {
  const id = encodeURIComponent(videoId);
  const rel = opts?.rel ?? 0;

  if (opts?.mode === 'ambient') {
    // `loop=1` requires `playlist` set to the same video id. Mute required for autoplay in browsers.
    const q = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      autoplay: '1',
      mute: '1',
      loop: '1',
      playlist: videoId,
      controls: '0',
      iv_load_policy: '3',
      disablekb: '1',
      fs: '0',
      cc_load_policy: '0',
    });
    return `https://www.youtube.com/embed/${id}?${q.toString()}`;
  }

  return `https://www.youtube.com/embed/${id}?rel=${rel}`;
}
