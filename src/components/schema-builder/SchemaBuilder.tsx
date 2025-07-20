import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FieldRow } from './FieldRow';
import { JsonPreview } from './JsonPreview';
import { AddButton } from '@/components/common/AddButton';
import { SchemaField, SchemaBuilderData } from '@/types/schema';

const generateId = () => Math.random().toString(36).substr(2, 9);

const createNewField = (): SchemaField => ({
  id: generateId(),
  name: '',
  type: 'string',
  required: false,
  nested: [],
});

export const SchemaBuilder: React.FC = () => {
  const methods = useForm<SchemaBuilderData>({
    defaultValues: {
      fields: [createNewField()],
    },
  });

  const { watch, setValue, getValues } = methods;
  const watchedFields = watch('fields') || [];

  const addField = (parentPath?: string) => {
    const newField = createNewField();
    
    if (parentPath) {
      const currentNested = getValues(`${parentPath}.nested`) || [];
      setValue(`${parentPath}.nested`, [...currentNested, newField]);
    } else {
      setValue('fields', [...watchedFields, newField]);
    }
  };

  const deleteField = (path: string) => {
    const pathParts = path.split('.');
    
    if (pathParts.length === 2 && pathParts[0] === 'fields') {
      const index = parseInt(pathParts[1]);
      const newFields = watchedFields.filter((_, i) => i !== index);
      setValue('fields', newFields);
    } else {
      const parentPath = pathParts.slice(0, -1).join('.');
      const index = parseInt(pathParts[pathParts.length - 1]);
      const currentNested = getValues(`${parentPath}`) || [];
      const newNested = currentNested.filter((_: any, i: number) => i !== index);
      setValue(parentPath, newNested);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', getValues());
  };

  return (
    <div className="schema-container">
      <div className="flex h-screen">
        <div className="w-1/2 schema-panel border-r">
          <FormProvider {...methods}>
            <div className="space-y-4">
              {watchedFields.map((field, index) => (
                <FieldRow
                  key={field.id}
                  field={field}
                  index={index}
                  path={`fields.${index}`}
                  level={0}
                  onAddField={addField}
                  onDeleteField={deleteField}
                />
              ))}
              
              <AddButton onClick={() => addField()} />
            </div>
          </FormProvider>
          
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="schema-button-primary"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="w-1/2 schema-panel">
          <JsonPreview fields={watchedFields} />
        </div>
      </div>
    </div>
  );
};