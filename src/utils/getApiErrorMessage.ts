import axios from "axios";

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 409) return "User already exists";
    if (status === 400) return message || "Invalid data";
    if (status === 500) return "Server error. Try again later";

    return message || "Something went wrong";
  }

  return "Unexpected error occurred";
}
