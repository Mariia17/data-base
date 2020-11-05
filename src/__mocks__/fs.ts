interface FS {
  writeFile: (path: unknown, data: unknown, options: unknown, callback: (err: Error | null) => void) => void;
}
const fs = jest.createMockFromModule<FS>("fs");

export const shouldWriteFileFail = { value: false };

fs.writeFile = (path, data, options, callback) => {
  setTimeout(() => {
    if (shouldWriteFileFail.value) {
      callback(null);
    } else {
      callback(new Error());
    }
  }, 0);
};

export const writeFile = fs.writeFile;
