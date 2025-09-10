import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

import type { GenericFormProps } from "../types/form";

function GenericForm<T extends Record<string, any>>({
  initialData,
  fields,
  onSave,
}: GenericFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            type={field.type || "text"}
            name={field.name}
            value={(formData as Record<string, unknown>)[field.name] as string || ""}
            onChange={handleChange}
            required={field.required}
            fullWidth
            variant="standard"
          />
        ))}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save
        </Button>
      </Stack>
    </form>
  );
}

export default GenericForm;
