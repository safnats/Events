import React, { useState } from 'react';
import { EVENT_IMAGES } from '../../assets/images';

export const ImageWithFallback = ({
  src,
  alt = 'Event photo',
  className = '',
  style = {},
  fallbackSrc = EVENT_IMAGES.heroConcert,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    if (!error) {
      setError(true);
    }
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const currentSrc = error || !src ? fallbackSrc : src;

  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }} className={className}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #350047 0%, #4a0263 50%, #350047 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
      )}
      <img
        src={currentSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
        {...props}
      />
    </div>
  );
};
