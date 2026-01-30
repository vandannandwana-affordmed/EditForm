import styles from "@/styles/components.module.css";
import { TextField, IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { useField } from "formik";
import { useState } from "react";

interface EditTextFieldProps {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
}

export default function MyTextField({ name, ...props }: EditTextFieldProps) {
  const [field, meta] = useField(name);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Stack mt={2} direction="row" alignItems="center" spacing={1}>
        <TextField
          variant="outlined"
          {...props}
          {...field}
          value={field.value ?? ""}
          disabled={!isEditing}
          fullWidth
          color={meta.touched && meta.error ? "error" : "primary"}
          sx={{ mt: 2 }}
        />

        <IconButton
          sx={{ mt: 2 }}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? <CheckIcon /> : <EditIcon />}
        </IconButton>
      </Stack>

      {meta.touched && meta.error && (
        <p className={styles.errorMessage}>{meta.error}</p>
      )}
    </>
  );
}
