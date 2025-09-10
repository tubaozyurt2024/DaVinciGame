export interface Field {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

export interface GenericFormProps<T> {
  initialData: T;
  fields: Field[];
  onSave: (data: T) => void | Promise<void>;
}
