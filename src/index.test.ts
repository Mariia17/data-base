import Database from "./index";

test("test", () => {
  const a = new Database("./myBase.js");

  // @ts-ignore
  expect(a.path).toEqual("./myBase.js");
});

