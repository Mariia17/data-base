import { promiseWriteFile } from "./utils";

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
})