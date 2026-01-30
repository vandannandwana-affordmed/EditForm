import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useEditHook, useGetUserHook } from "./EditForm.hooks";

const mutateMock = vi.fn();
const getUserQueryMock = vi.fn();

vi.mock("@/pages/api/mutations", () => ({
  useCreateAccountMutation: () => ({
    mutate: mutateMock,
  }),
}));

vi.mock("@/pages/api/query", () => ({
  useGetUserQuery: () => getUserQueryMock(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useEditHook", () => {
  it("calls mutate with form values", () => {
    const { result } = renderHook(() => useEditHook());

    const setSubmitting = vi.fn();
    const values = {
      fullName: "Test User",
      email: "test@example.com",
      password: "Password1!",
    };

    act(() => {
      result.current.handleRegister(values, setSubmitting);
    });

    expect(mutateMock).toHaveBeenCalledWith(
      values,
      expect.objectContaining({
        onSettled: expect.any(Function),
      }),
    );
  });

  it("sets submitting false on mutation settled", () => {
    const { result } = renderHook(() => useEditHook());

    const setSubmitting = vi.fn();
    const values = {
      fullName: "Test User",
      email: "test@example.com",
      password: "Password1!",
    };

    act(() => {
      result.current.handleRegister(values, setSubmitting);
    });

    const onSettled = mutateMock.mock.calls[0][1].onSettled;

    act(() => {
      onSettled();
    });

    expect(setSubmitting).toHaveBeenCalledWith(false);
  });
});

describe("useGetUserHook", () => {
  it("returns currentUserHook from useGetUserQuery", () => {
    const fakeQueryResult = {
      data: {
        fullName: "Test User",
        email: "test@example.com",
      },
      isLoading: false,
      isSuccess: true,
    };

    getUserQueryMock.mockReturnValueOnce(fakeQueryResult);

    const { result } = renderHook(() => useGetUserHook());

    expect(result.current.currentUserHook).toBe(fakeQueryResult);
  });
});
