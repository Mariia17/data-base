import * as fs from "fs";
class Database {
  constructor(path) {
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
  addUser(userData) {
    fs.readFile(this.path, { encoding: "utf8", flag: "r+" }, (err, data) => {
      if (err) throw err;
      const database = JSON.parse(data);
      const userId = userData.name + userData.surname;
      const userObject = { userId: userId, userData: userData };
      const isNewUser = !database.some((item) => item.userId === userId);
      if (isNewUser) {
        database.push(userObject);
        fs.writeFile(this.path, JSON.stringify(database), { flag: "w+" }, (err) => {
          if (err) throw err;
          console.log("File saved!");
        });
      } else {
        console.log("User already exists");
      }
    });
  }
}

const myDatabase = new Database("C:\\Users\\marij\\Documents\\MyBase.js");
myDatabase.addUser({ name: "Иван", surname: "Иванов", age: "30", occupation: "Механик" });
myDatabase.addUser({ name: "Иван", surname: "Иванов", age: "30", occupation: "Механик" });
//myDatabase.changeUser("id", { ocuupation: "Инжинер" });
//myDatabase.deleteUser("id");
//myDatabase.getDatabase();
//myDatabase.getUser("id");
