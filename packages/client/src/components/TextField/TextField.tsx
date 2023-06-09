import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, className, ...rest }) => {
  const fieldId = label.split(' ').join('-').toLowerCase();

  return (
    <div className={className}>
      <label
        htmlFor={fieldId}
        className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
      >
        {label}
      </label>
      <input
        type="text"
        {...rest}
        id={fieldId}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default TextField;
