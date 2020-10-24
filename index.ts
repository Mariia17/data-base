import * as fs from "fs";
import path from "path";

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
    fs.writeFile(path, "[]", { flag: "wx+" }, (err) => {
      if (err) {
        if (err.code === "EEXIST") {
          console.log("file exists");
        } else {
          throw err;
        }
      } else {
        console.log("File saved!");
      }
    });
  }
  addUser(userData: JSONObject) {
    fs.readFile(this.path, { encoding: "utf8", flag: "r+" }, (err, data) => {
      if (err) throw err;

      const database: IUserObject[] = JSON.parse(data);
      const userIdArray = database.map((item) => item.userId);
      const userId = this.generateId(userIdArray);
      const userObject: IUserObject = { userId: userId, userData: userData };
      database.push(userObject);

      fs.writeFile(this.path, JSON.stringify(database), { flag: "w+" }, (err) => {
        if (err) throw err;
        console.log("File saved!");
      });
    });
  }
  private generateId(id: string[]): string {
    const userId = Math.random().toString();
    if (!id.includes(userId)) return userId;
    return this.generateId(id);
  }
}

const myDatabase = new Database(path.join(".", "myBase.json"));
myDatabase.addUser({ name: "Иван", surname: "Иванов", age: "30", occupation: "s" });
myDatabase.addUser({ name: "Иван", surname: "Иванов", age: "30", occupation: "Механик" });
//myDatabase.changeUser("id", { ocuupation: "Инжинер" });
//myDatabase.deleteUser("id");
//myDatabase.getDatabase();
//myDatabase.getUser("id");
