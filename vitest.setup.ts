import "@testing-library/jest-dom";
import { vi } from "vitest";

// mock CSS modules
vi.mock("*.module.css", () => ({}));
