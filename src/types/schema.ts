export interface SchemaField {
  id: string;
  name: string;
  type: 'string' | 'number' | 'nested';
  required?: boolean;
  nested?: SchemaField[];
}

export interface SchemaBuilderData {
  fields: SchemaField[];
}

export type FieldType = 'string' | 'number' | 'nested';