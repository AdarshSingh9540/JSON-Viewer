import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FieldInputProps {
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  className?: string;
}

export const FieldInput: React.FC<FieldInputProps> = ({
  name,
  placeholder = '',
  register,
  error,
  className = ''
}) => {
  return (
    <div className="flex-1">
      <input
        {...register(name, { required: true })}
        placeholder={placeholder}
        className={`schema-field-input flex-1 max-w-[200px] ${className}`}
      />
      {error && (
        <span className="text-xs text-red-500 mt-1 block">
          This field is required
        </span>
      )}
    </div>
  );
};