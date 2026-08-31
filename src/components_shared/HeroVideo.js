'use client';
import * as React from 'react';

/**
 * Background video for the hero sections.
 *
 * The poster is what paints first (and on phones it is all that ever loads),
 * so the largest-contentful paint no longer waits on a multi-megabyte video.
 * The video element is only mounted on wide viewports and never when the
 * browser reports data saver, which keeps mobile visitors off the download
 * entirely. Mounting after the first client render keeps SSR and hydration
 * identical — the server always renders the poster alone.
 */
export default function HeroVideo({ src, poster, alt = '' }) {
  const [showVideo, setShowVideo] = React.useState(false);

  React.useEffect(() => {
    const conn = navigator.connection || {};
    const wideEnough = window.matchMedia('(min-width: 900px)').matches;
    const cheapData = !conn.saveData && !/2g/.test(conn.effectiveType || '');
    setShowVideo(wideEnough && cheapData);
  }, []);

  const fill = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  };

  return (
    <>
      <img src={poster} alt={alt} style={fill} fetchPriority="high" decoding="async" />
      {showVideo && (
        <video autoPlay muted loop playsInline poster={poster} preload="auto" style={fill}>
          <source src={src} type="video/mp4" />
        </video>
      )}
    </>
  );
}
