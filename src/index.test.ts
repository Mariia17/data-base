import Database from "./index";
import { promiseWriteFile } from "./utils";
import { mocked } from "ts-jest/utils";
jest.mock("./utils");

const _promiseWriteFile = mocked(promiseWriteFile);

test("Check if path matches", () => {
  const a = new Database("./myBase.js");
  // @ts-ignore
  expect(a.path).toEqual("./myBase.js");
});

test("Check if promiseWriteFile is called", () => {
  const database = new Database("./myBase");

  _promiseWriteFile.mockReturnValue(Promise.resolve());
  return database.init().finally(() => {
    expect(_promiseWriteFile).toHaveBeenCalled();
  });
});

test("Check if nothing happens when file already exists  ", () => {
  const database = new Database("./myBase");

  const err = { code: "EXIST" };
  _promiseWriteFile.mockReturnValue(Promise.reject(err));
  return expect(database.init()).resolves.toBe(undefined);
});

test("Promise should be rejected if error", () => {
  const database = new Database("./myBase");
  _promiseWriteFile.mockReturnValue(Promise.reject(new Error()));
  return expect(database.init()).rejects.toThrow();
});
