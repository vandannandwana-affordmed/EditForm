import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { vi } from "vitest";

Object.assign(globalThis, {
  render,
  screen,
  fireEvent,
  userEvent,
  waitFor,
  toast,
  vi,
});
