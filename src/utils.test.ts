import { promiseWriteFile } from "./utils";
import { promiseReadFile } from "./utils";

import * as fs from "fs";

jest.mock("fs");


describe("promiseWriteFile", () => {
  test("writeFile", () => {
    const _writeFile = jest.spyOn(fs, "writeFile");
    return promiseWriteFile("somepath", "data", "options").finally(() =>
      expect(_writeFile).toHaveBeenCalledWith("somepath", "data", "options", expect.any(Function))
    );
  });

  test("writeFile should resolve promise", () => {
    // @ts-ignore
    fs.__testConfig.shouldWriteFileFail = false;
    const result = promiseWriteFile("somepath", "data", "options");
    return expect(result).resolves.toBe(undefined);
  });

  test("writeFile should reject promise", () => {
    // @ts-ignore
    fs.__testConfig.shouldWriteFileFail = true;
    const result = promiseWriteFile("somepath", "data", "options");
    return expect(result).rejects.toThrow();
  });
});

describe("promiseReadFile", () => {
  test("readFile", () => {
    const _readFile = jest.spyOn(fs, "readFile");
    return promiseReadFile("somepath", "options").finally(() =>
      expect(_readFile).toHaveBeenCalledWith("somepath", "options", expect.any(Function))
    );
  });

  test("readFile should resolve promise", () => {
    // @ts-ignore
    fs.__testConfig.shouldReadFileFail = false;
    const result = promiseReadFile("somepath", "options");
    return expect(result).resolves.toBe("data");
  });

  test("readFile should reject promise", () => {
    // @ts-ignore
    fs.__testConfig.shouldReadFileFail = true;
    const result = promiseReadFile("somepath", "options");
    return expect(result).rejects.toThrow();
  });
});





