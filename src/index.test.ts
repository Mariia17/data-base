import Database from "./index";
import { promiseWriteFile } from "./utils";

jest.mock("fs");

test("test", () => {
  const a = new Database("./myBase.js");

  // @ts-ignore
  expect(a.path).toEqual("./myBase.js");
});

test("writeFile", () => {
  return promiseWriteFile("somepath", "data", "options");
});
