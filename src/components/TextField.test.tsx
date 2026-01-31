import { Form, Formik } from "formik";
import { object, string } from "yup";
import MyTextField from "./TextField";

const FormikWrapper = ({
  children,
  initialValues,
  validationSchema,
}: {
  children: React.ReactNode;
  initialValues: Record<string, any>;
  validationSchema?: any;
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={vi.fn()}
  >
    <Form>{children}</Form>
  </Formik>
);

describe("MyTextField", () => {
  test("renders input field", () => {
    render(<MyTextField name="email" label="Email" type="email" />, {
      wrapper: (props) => (
        <FormikWrapper {...props} initialValues={{ email: "" }} />
      ),
    });

    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();
  });

  test("updates value when typing", () => {
    render(<MyTextField name="email" label="Email" type="email" />, {
      wrapper: (props) => (
        <FormikWrapper {...props} initialValues={{ email: "" }} />
      ),
    });

    const input = screen.getByLabelText(/email/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "test@example.com" } });

    expect(input.value).toBe("test@example.com");
  });

  it("shows error when invalid email", async () => {
    render(<MyTextField name="email" label="Email" type="email" />, {
      wrapper: (props) => (
        <FormikWrapper
          {...props}
          initialValues={{ email: "" }}
          validationSchema={object({
            email: string()
              .email("Invalid email")
              .required("Email is required"),
          })}
        />
      ),
    });

    const editButton = screen.getByRole("button");
    await userEvent.click(editButton);

    const input = screen.getByLabelText(/email/i);

    await userEvent.type(input, "test");
    await userEvent.tab();

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });
});
