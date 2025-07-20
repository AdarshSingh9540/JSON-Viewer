import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldType } from '@/types/schema';

interface TypeSelectorProps {
  value: FieldType;
  onChange: (value: FieldType) => void;
  className?: string;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  value,
  onChange,
  className = ''
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-[120px] schema-field-input ${className}`}>
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="string">string</SelectItem>
        <SelectItem value="number">number</SelectItem>
        <SelectItem value="nested">nested</SelectItem>
      </SelectContent>
    </Select>
  );
};