import React from 'react';

interface LoadingOverlayProps {
  loading: boolean;
  message?: string;
  children: React.ReactNode;
}

const loadingGifs = [
  '/gifs/microwave.gif',
  '/gifs/cheeseburger.gif',
  '/gifs/cookie.gif',
  '/gifs/tomato.gif',
];

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loading,
  children,
  message = 'Loading...',
}) => {
  return (
    <div className="relative w-full h-full">
      {children}
      {loading && (
        <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col gap-4 items-center justify-center z-50 bg-white shadow-inner rounded-md">
          <h3 className="text-sm">{message}</h3>
          <img
            src={loadingGifs[Math.floor(Math.random() * loadingGifs.length)]}
            alt="A loading gif"
          />
        </div>
      )}
    </div>
  );
};

export default LoadingOverlay;
