interface FS {
  writeFile: (path: unknown, data: unknown, options: unknown, callback: (err: Error | null) => void) => void;
  readFile: (path: unknown, options: unknown, callback: (err: Error | null, data: string | null) => void) => void;
}
const fs = jest.createMockFromModule<FS>("fs");

export const __testConfig = { shouldWriteFileFail: false, shouldReadFileFail: false };

fs.writeFile = (path, data, options, callback) => {
  setTimeout(() => {
    if (!__testConfig.shouldWriteFileFail) {
      callback(null);
    } else {
      callback(new Error());
    }
  }, 0);
};

fs.readFile = (path, options, callback) => {
  setTimeout(() => {
    if (!__testConfig.shouldReadFileFail) {
      callback(null, "data");
    } else {
      callback(new Error(), null);
    }
  }, 0);
};

export const writeFile = fs.writeFile;
export const readFile = fs.readFile;
