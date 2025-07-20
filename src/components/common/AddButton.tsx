import React from 'react';

interface AddButtonProps {
  onClick: () => void;
  text?: string;
  className?: string;
  fullWidth?: boolean;
}

export const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  text = '+ Add Item',
  className = '',
  fullWidth = true
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`schema-button-primary ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {text}
    </button>
  );
};