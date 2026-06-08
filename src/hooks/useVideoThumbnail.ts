'use client';

import { useState, useEffect } from 'react';

/**
 * Extracts a single frame from a video at `seekTo` seconds (default 4s)
 * and returns it as a data-URL string usable as an <img src> or video poster.
 *
 * Returns null while loading and falls back to null on any error
 * (CORS, codec, short video) — callers should show their own placeholder.
 */
export function useVideoThumbnail(src: string | null | undefined, seekTo = 4): string | null {
  const [thumb, setThumb] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;

    let cancelled = false;

    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';

    const capture = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement('canvas');
        canvas.width  = video.videoWidth  || 1280;
        canvas.height = video.videoHeight || 720;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        if (!cancelled) setThumb(dataUrl);
      } catch {
        // CORS / tainted canvas — silently ignore
      } finally {
        video.src = '';
        video.load();
      }
    };

    const onSeeked = () => capture();

    const onLoaded = () => {
      // Clamp seek time to video duration to avoid seeking past end
      const target = Math.min(seekTo, Math.max(0, (video.duration || 0) - 0.1));
      // Jump to target; if already there seeked won't fire — capture directly
      if (Math.abs(video.currentTime - target) < 0.05) {
        capture();
      } else {
        video.currentTime = target;
      }
    };

    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('seeked', onSeeked);
    video.src = src;

    return () => {
      cancelled = true;
      video.removeEventListener('loadedmetadata', onLoaded);
      video.removeEventListener('seeked', onSeeked);
      video.src = '';
    };
  }, [src, seekTo]);

  return thumb;
}
