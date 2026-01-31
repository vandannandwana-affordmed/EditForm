import RegistrationForm from "./EditForm";

const mutateAsyncMock = vi.fn();

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const handleRegisterMock = vi.fn();

vi.mock("./editForm.hooks", () => ({
  useEditHook: () => ({
    handleRegister: handleRegisterMock,
  }),
  useGetUserHook: () => ({
    currentUserHook: { data: undefined },
  }),
}));

describe("RegistrationForm snapshots", () => {
  it("matches snapshot (initial empty state)", () => {
    const { container } = render(<RegistrationForm />);
    expect(container).toMatchSnapshot();
  });
});

describe("RegistrationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders registration form fields", () => {
    render(<RegistrationForm />);

    expect(screen.getByText(/create account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("shows all validation errors on empty submit", async () => {
    render(<RegistrationForm />);

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("submits form successfully", async () => {
    handleRegisterMock.mockResolvedValueOnce(undefined);

    render(<RegistrationForm />);

    const editButtons = screen.getAllByRole("button");
    for (const btn of editButtons) {
      await userEvent.click(btn);
    }

    await userEvent.type(screen.getByLabelText(/full name/i), "John Doe");
    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "Password1!");

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(handleRegisterMock).toHaveBeenCalled();
    });
  });

  it("shows error toast on API failure", async () => {
    const toastErrorSpy = vi.spyOn(toast, "error").mockImplementation(vi.fn());

    handleRegisterMock.mockImplementationOnce(() => {
      toast.error("Something went wrong!");
    });

    render(<RegistrationForm />);

    const editButtons = screen.getAllByRole("button");
    for (const btn of editButtons) {
      await userEvent.click(btn);
    }

    await userEvent.type(screen.getByLabelText(/full name/i), "Test User");
    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "Password1!");

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(toastErrorSpy).toHaveBeenCalledWith("Something went wrong!");
    });

    toastErrorSpy.mockRestore();
  });

  it("disables submit button while submitting", async () => {
    mutateAsyncMock.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );

    render(<RegistrationForm />);

    const editButtons = screen.getAllByRole("button");
    for (const btn of editButtons) {
      await userEvent.click(btn);
    }

    await userEvent.type(screen.getByLabelText(/full name/i), "Test User");
    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "Password1!");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
});
