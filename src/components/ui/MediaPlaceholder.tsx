'use client';

import { cn } from '@/lib/utils';

interface MediaPlaceholderProps {
  type?: 'image' | 'video';
  label?: string;
  aspectRatio?: string;
  className?: string;
  accentColor?: string;
}

export default function MediaPlaceholder({
  type = 'image',
  label,
  aspectRatio = '16/9',
  className,
  accentColor = '#718F6B',
}: MediaPlaceholderProps) {
  return (
    <div
      className={cn('media-placeholder relative w-full overflow-hidden', className)}
      style={{ aspectRatio }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        {type === 'video' ? (
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: accentColor + '20', border: `1.5px solid ${accentColor}40` }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={accentColor}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        ) : (
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: accentColor + '15', border: `1.5px solid ${accentColor}30` }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        )}
        <p className="text-xs font-body" style={{ color: accentColor, opacity: 0.7 }}>
          {label || (type === 'video' ? '→ Video goes here' : '→ Screenshot goes here')}
        </p>
      </div>
    </div>
  );
}
