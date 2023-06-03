import React, { HTMLAttributes } from 'react';

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'filled' | 'outlined';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  className = '',
  variant = 'filled',
  ...rest
}) => {
  const variantClasses = {
    filled: 'bg-custom_red hover:bg-red-600 text-white',
    outlined: 'hover:bg-[#8D414725] text-custom_red font-bold',
  };

  return (
    <button
      className={`border border-custom_red w-full px-3 py-2 text-sm font-medium rounded-lg  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${variantClasses[variant]}  ${className}`}
      {...rest}
    />
  );
};

export default CustomButton;
