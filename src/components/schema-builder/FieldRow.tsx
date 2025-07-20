import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SchemaField, FieldType } from '@/types/schema';
import { FieldInput } from '@/components/common/FieldInput';
import { TypeSelector } from '@/components/common/TypeSelector';
import { RequiredToggle } from '@/components/common/RequiredToggle';
import { DeleteButton } from '@/components/common/DeleteButton';
import { AddButton } from '@/components/common/AddButton';

interface FieldRowProps {
  field: SchemaField;
  index: number;
  path: string;
  level: number;
  onAddField: (parentPath?: string) => void;
  onDeleteField: (path: string) => void;
}

export const FieldRow: React.FC<FieldRowProps> = ({
  field,
  index,
  path,
  level,
  onAddField,
  onDeleteField,
}) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const currentType = watch(`${path}.type`);
  const isRequired = watch(`${path}.required`) || false;
  const isNested = currentType === 'nested';

  const handleTypeChange = (value: FieldType) => {
    setValue(`${path}.type`, value);
    if (value === 'nested' && !field.nested) {
      setValue(`${path}.nested`, []);
    }
  };

  const handleRequiredChange = (checked: boolean) => {
    setValue(`${path}.required`, checked);
  };

  const handleDelete = () => {
    onDeleteField(path);
  };

  const handleAddNested = () => {
    onAddField(path);
  };

  const getFieldError = (fieldPath: string) => {
    const pathParts = fieldPath.split('.');
    let error = errors;
    for (const part of pathParts) {
      if (error && typeof error === 'object' && part in error) {
        error = error[part];
      } else {
        return undefined;
      }
    }
    return error;
  };

  const containerStyle = {
    marginLeft: `${level * 40}px`,
    paddingLeft: level > 0 ? '20px' : '0',
  };

  const containerClasses = level > 0 ? 'schema-nested-container' : '';

  return (
    <div className={`space-y-3 ${containerClasses}`} style={containerStyle}>
      <div className="flex items-center gap-3 py-2">
        <FieldInput
          name={`${path}.name`}
          placeholder="Field name"
          register={register}
          error={getFieldError(`${path}.name`)}
        />

        <TypeSelector
          value={currentType}
          onChange={handleTypeChange}
        />

        <RequiredToggle
          checked={isRequired}
          onChange={handleRequiredChange}
        />

        <DeleteButton onClick={handleDelete} />
      </div>

      {isNested && field.nested && (
        <div className="space-y-3">
          {field.nested.map((nestedField, nestedIndex) => (
            <FieldRow
              key={nestedField.id}
              field={nestedField}
              index={nestedIndex}
              path={`${path}.nested.${nestedIndex}`}
              level={level + 1}
              onAddField={onAddField}
              onDeleteField={onDeleteField}
            />
          ))}
          <div style={{ 
            marginLeft: `${(level + 1) * 40}px`, 
            paddingLeft: level >= 0 ? '20px' : '0' 
          }}>
            <AddButton onClick={handleAddNested} />
          </div>
        </div>
      )}
    </div>
  );
};