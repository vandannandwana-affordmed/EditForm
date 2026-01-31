import "@testing-library/jest-dom";

declare global {
  const screen: typeof import("@testing-library/react").screen;
  const render: typeof import("@testing-library/react").render;
  const fireEvent: typeof import("@testing-library/react").fireEvent;
  const waitFor: typeof import("@testing-library/react").waitFor;
  const userEvent: typeof import("@testing-library/user-event").default;
  const toast: typeof import("react-toastify").toast;
  const vi: typeof import("vitest").vi;
}
