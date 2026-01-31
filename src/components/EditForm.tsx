import { Form, Formik } from "formik";
import styles from "@/styles/components.module.css";
import { Button, Typography } from "@mui/material";
import { validationSchema } from "@/validations/registerValidation";
import { User } from "@/types/user";
import { useEditHook, useGetUserHook } from "./EditForm.hooks";
import MyTextField from "./TextField";

export default function RegistrationForm() {
  const { handleRegister } = useEditHook();

  const { currentUserHook } = useGetUserHook();

  const initialValues: User = {
    fullName: currentUserHook?.data?.fullName ?? "",
    email: currentUserHook?.data?.email ?? "",
    password: "",
  };

  return (
    <div>
      <Typography variant="h1" fontSize="32px" textAlign={"center"}>
        Create Account
      </Typography>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleRegister(values, setSubmitting);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.mainForm}>
            <MyTextField name="fullName" label="Full Name" type="text" />

            <MyTextField name="email" label="Email" type="email" />

            <MyTextField name="password" label="Password" type="password" />

            <Button
              type="submit"
              variant="contained"
              className={styles.button}
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
