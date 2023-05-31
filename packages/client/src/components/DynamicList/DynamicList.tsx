import React from 'react';
import { TrashIcon, PlusCircleIcon } from '@heroicons/react/20/solid';

interface DynamicListProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

const DynamicList: React.FC<DynamicListProps> = ({
  label,
  values,
  onChange,
  className = '',
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const fieldId = label.split(' ').join('-').toLowerCase();

  return (
    <div className={className}>
      <label
        htmlFor={fieldId}
        className="w-full block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
      >
        {label}
      </label>
      <ul className="h-[10rem] mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg overflow-hidden">
        <div className="w-full h-full overflow-y-scroll">
          {values.map((value, index) => (
            <li
              key={index}
              className={`flex items-center justify-between gap-3 w-full px-2 py-1 ${
                index % 2 === 0 ? 'bg-slate-200' : ''
              }`}
            >
              <p>{value}</p>
              <button
                type="button"
                aria-label={`Remove ${value}`}
                className="text-sm font-medium text-gray-900 dark:text-white"
                onClick={() => {
                  const newValues = [...values];
                  newValues.splice(index, 1);
                  onChange(newValues);
                }}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </div>
      </ul>
      <div className="w-full flex items-center gap-2">
        <input
          type="text"
          id={fieldId}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button
          type="button"
          aria-label="Add ingredient"
          className="mt-2 text-sm font-medium text-gray-900 dark:text-white"
          onClick={(event) => {
            event.preventDefault();
            const newValues = [...values];
            newValues.push(inputValue);
            onChange(newValues);
            setInputValue('');
          }}
        >
          <PlusCircleIcon className="w-6 h-6 text-green-600 mb-1" />
        </button>
      </div>
    </div>
  );
};

export default DynamicList;
