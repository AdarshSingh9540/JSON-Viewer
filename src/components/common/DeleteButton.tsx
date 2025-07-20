import React from 'react';
import { X } from 'lucide-react';

interface DeleteButtonProps {
  onClick: () => void;
  className?: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  onClick,
  className = ''
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`schema-button-danger h-8 w-8 ${className}`}
    >
      <X className="h-4 w-4" />
    </button>
  );
};