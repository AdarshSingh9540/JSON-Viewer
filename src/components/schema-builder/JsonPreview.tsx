import React from 'react';
import { SchemaField } from '../../types/schema';

interface JsonPreviewProps {
  fields: SchemaField[];
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({ fields }) => {
  const generateJsonFromFields = (fields: SchemaField[]): Record<string, any> => {
    const result: Record<string, any> = {};
    
    fields.forEach(field => {
      if (!field.name) return;
      
      switch (field.type) {
        case 'string':
          result[field.name] = "STRING";
          break;
        case 'number':
          result[field.name] = "number";
          break;
        case 'nested':
          if (field.nested && field.nested.length > 0) {
            result[field.name] = generateJsonFromFields(field.nested);
          } else {
            result[field.name] = {};
          }
          break;
      }
    });
    
    return result;
  };

  const jsonOutput = generateJsonFromFields(fields);
  const jsonString = JSON.stringify(jsonOutput, null, 2);

  return (
    <div className="schema-preview h-full min-h-[400px]">
      {jsonString}
    </div>
  );
};