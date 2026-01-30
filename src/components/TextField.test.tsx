import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import MyTextField from "./TextField";
import { vi } from "vitest";

const renderWithFormik = ({
  initialValues,
  validationSchema,
}: {
  initialValues: Record<string, any>;
  validationSchema?: any;
}) => {
  return render(
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={vi.fn()}
    >
      <Form>
        <MyTextField name="email" label="Email" type="email" />
      </Form>
    </Formik>,
  );
};

describe("MyTextField", () => {
  test("renders input field", () => {
    renderWithFormik({
      initialValues: { email: "" },
    });

    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();
  });

  test("updates value when typing", () => {
    renderWithFormik({
      initialValues: { email: "" },
    });

    const input = screen.getByLabelText(/email/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "test@example.com" } });

    expect(input.value).toBe("test@example.com");
  });

  it("shows error when invalid email", async () => {
    renderWithFormik({
      initialValues: { email: "" },
      validationSchema: object({
        email: string().email("Invalid email").required("Email is required"),
      }),
    });

    const editButton = screen.getByRole("button");
    await userEvent.click(editButton);

    const input = screen.getByLabelText(/email/i);

    await userEvent.type(input, "test");
    await userEvent.tab();

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });
});
