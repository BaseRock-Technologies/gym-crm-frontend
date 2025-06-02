export const backendApiPath = assertValue(
  process.env.NEXT_PUBLIC_API_URL,
  "Missing environment variable for api",
);


function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}