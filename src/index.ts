import path from "path";

export const getDataPath = (): string => {
  return path.resolve(__dirname, "../data");
};
