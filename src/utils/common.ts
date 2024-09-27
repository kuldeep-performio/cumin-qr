export const uid = (): string => {
  // Generates a random 8-character string
  const randomChars = Math.random().toString(36).substring(2, 10);
  // Generates a timestamp-based string
  const timestampChars = new Date().getTime().toString(36);
  // Concatenate both strings to ensure uniqueness
  return randomChars + timestampChars;
};
