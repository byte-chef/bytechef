import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  open: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, open, className = '' }) => {
  if (!open) return null;

  return (
    <div className="absolute z-[100] top-0 left-0 right-0 bottom-0 bg-[#55555560] pointer-events-none flex items-center justify-center">
      <div
        className={`bg-white rounded-lg shadow-lg w-[500px] h-[500px] pointer-events-auto ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
