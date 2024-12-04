export const backendApiPath = assertValue(
  process.env.NEXT_PUBLIC_BACKEND_PATH,
  "Missing environment variable: NEXT_PUBLIC_BACKEND_PATH",
);


function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}