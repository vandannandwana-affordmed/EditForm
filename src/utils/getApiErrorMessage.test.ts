import { describe, it, expect } from "vitest";
import { AxiosError } from "axios";
import { getApiErrorMessage } from "./getApiErrorMessage";

describe("getApiErrorMessage", () => {
  it("returns 'User already exists' for 409 error", () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 409,
        data: { message: "Conflict" },
      },
    } as AxiosError;

    expect(getApiErrorMessage(error)).toBe("User already exists");
  });

  it("returns API message for 400 error", () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 400,
        data: { message: "Invalid email" },
      },
    } as AxiosError;

    expect(getApiErrorMessage(error)).toBe("Invalid email");
  });

  it("returns fallback message for 400 error when message is missing", () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 400,
        data: {},
      },
    } as AxiosError;

    expect(getApiErrorMessage(error)).toBe("Invalid data");
  });

  it("returns server error message for 500 error", () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 500,
      },
    } as AxiosError;

    expect(getApiErrorMessage(error)).toBe("Server error. Try again later");
  });

  it("returns default message for unknown axios status", () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 403,
        data: { message: "Forbidden" },
      },
    } as AxiosError;

    expect(getApiErrorMessage(error)).toBe("Forbidden");
  });

  it("returns generic fallback for axios error without response", () => {
    const error = {
      isAxiosError: true,
    } as AxiosError;

    expect(getApiErrorMessage(error)).toBe("Something went wrong");
  });

  it("returns unexpected error message for non-axios errors", () => {
    const error = new Error("Random error");

    expect(getApiErrorMessage(error)).toBe("Unexpected error occurred");
  });
});
