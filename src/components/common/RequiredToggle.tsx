import React from 'react';
import { Switch } from '@/components/ui/switch';

interface RequiredToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const RequiredToggle: React.FC<RequiredToggleProps> = ({
  checked,
  onChange,
  className = ''
}) => {
  return (
    <Switch
      checked={checked}
      onCheckedChange={onChange}
      className={className}
    />
  );
};