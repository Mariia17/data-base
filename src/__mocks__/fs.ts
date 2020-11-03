interface FS {
  writeFile: (path: unknown, data: unknown, options: unknown, callback: (err: Error | null) => void) => void;
}
const fs = jest.createMockFromModule<FS>("fs");
setTimeout(() => {
  fs.writeFile = (path, data, options, callback) => {
    setTimeout(() => {
      console.log("Works");
      callback(null);
    }, 0);
  };
}, 0);

export const writeFile = fs.writeFile;
