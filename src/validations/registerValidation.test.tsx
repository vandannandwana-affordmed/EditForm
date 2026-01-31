import { describe, it, expect } from "vitest";
import { validationSchema } from "./registerValidation";

describe("validationSchema", () => {
  it("passes with valid data", async () => {
    const validData = {
      fullName: "Vandan",
      email: "test@example.com",
      password: "Password1!",
    };

    await expect(validationSchema.validate(validData)).resolves.toBeTruthy();
  });

  it("fails when fullName is too short", async () => {
    const data = {
      fullName: "Va",
      email: "test@example.com",
      password: "Password1!",
    };

    await expect(validationSchema.validate(data)).rejects.toThrow(
      "Name must be at least 3 characters",
    );
  });

  it("fails when email is invalid", async () => {
    const data = {
      fullName: "Vandan",
      email: "invalid-email",
      password: "Password1!",
    };

    await expect(validationSchema.validate(data)).rejects.toThrow(
      "Invalid email",
    );
  });

  it("fails when password has no uppercase letter", async () => {
    const data = {
      fullName: "Vandan",
      email: "test@example.com",
      password: "password1!",
    };

    await expect(validationSchema.validate(data)).rejects.toThrow(
      "Password must contain at least one uppercase letter",
    );
  });

  it("fails when password has no number", async () => {
    const data = {
      fullName: "Vandan",
      email: "test@example.com",
      password: "Password!",
    };

    await expect(validationSchema.validate(data)).rejects.toThrow(
      "Password must contain at least one number",
    );
  });

  it("fails when password has no special character", async () => {
    const data = {
      fullName: "Vandan",
      email: "test@example.com",
      password: "Password1",
    };

    await expect(validationSchema.validate(data)).rejects.toThrow(
      "Password must contain at least one special character",
    );
  });
});
