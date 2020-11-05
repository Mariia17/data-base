import Database from "./index";
import { promiseWriteFile } from "./utils";

import * as fs from "fs";

jest.mock("fs");

test("test", () => {
  const a = new Database("./myBase.js");

  // @ts-ignore
  expect(a.path).toEqual("./myBase.js");
});

test("writeFile", () => {
  const _writeFile = jest.spyOn(fs, "writeFile");
  return promiseWriteFile("somepath", "data", "options").finally(() =>
    expect(_writeFile).toHaveBeenCalledWith("somepath", "data", "options", expect.any(Function))
  );
});

test("isPromiseResolves", () => {
  // @ts-ignore
  fs.shouldWriteFileFail.value = false;
  const result = promiseWriteFile("somepath", "data", "options");
  return expect(result).resolves.toBe(undefined);
});

test("isPromiseRejects", () => {
  // @ts-ignore
  fs.shouldWriteFileFail.value = true;
  const result = promiseWriteFile("somepath", "data", "options");
  return expect(result).rejects.toThrow();
});
