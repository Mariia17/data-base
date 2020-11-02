import { promiseWriteFile, promiseReadFile } from "utils";

type JSONPrimitive = string | number | boolean | null;
type JSONObject = { [x: string]: JSONValue };
type JSONArray = JSONValue[];
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
interface IUserObject {
  userId: string;
  userData: JSONObject;
}

class Database {
  private readonly path: string;
  constructor(path: string) {
    this.path = path;
  }

  init() {
    return promiseWriteFile(this.path, "[]", { flag: "wx+" }).then(
      () => {
        console.log("File saved");
      },
      (err) => {
        if (err.code === "EEXIST") {
          console.log("file exists");
        } else {
          throw err;
        }
      }
    );
  }

  addUser(userData: JSONObject) {
    return promiseReadFile(this.path, { encoding: "utf8", flag: "r+" })
      .then((data) => {
        if (typeof data !== "string") {
          throw new Error("string data expected");
        }
        const database: IUserObject[] = JSON.parse(data);
        const userIdArray = database.map((item) => item.userId);
        const userId = this.generateId(userIdArray);
        const userObject: IUserObject = { userId: userId, userData: userData };
        database.push(userObject);
        return promiseWriteFile(this.path, JSON.stringify(database), { flag: "w+" });
      })
      .then(() => {
        console.log("File saved!");
      })
      .catch((err) => {
        throw err;
      });
  }

  private generateId(id: string[]): string {
    const userId = Math.random().toString();
    if (!id.includes(userId)) return userId;
    return this.generateId(id);
  }
}
export default Database;
