import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  open: boolean;
  onClickOutside?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  open,
  className = '',
  onClickOutside,
}) => {
  if (!open) return null;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClickOutside && onClickOutside();
      }}
      className="fixed z-[100] top-0 left-0 right-0 bottom-0 bg-[#55555560]  flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-lg shadow-lg  pointer-events-auto ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
