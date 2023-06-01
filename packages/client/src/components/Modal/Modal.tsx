import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, open }) => {
  if (!open) return null;

  return (
    <div className="absolute z-[100] top-0 left-0 right-0 bottom-0 bg-[#55555520] pointer-events-none flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[500px] h-[500px] pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;
