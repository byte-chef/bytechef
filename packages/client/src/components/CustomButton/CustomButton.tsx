import React, { HTMLAttributes } from 'react';

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  className = '',
  ...rest
}) => {
  return (
    <button
      className={`w-full p-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mt-4 ${className}`}
      {...rest}
    />
  );
};

export default CustomButton;
