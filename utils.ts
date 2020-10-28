import * as fs from "fs";
import { PathLike, WriteFileOptions } from "fs";

export const promiseWriteFile = (path: PathLike, data: string | NodeJS.ArrayBufferView, options: WriteFileOptions) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, options, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const promiseReadFile = (
  path: PathLike,
  options: { encoding?: null | undefined; flag?: string | undefined } | null | undefined
) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
