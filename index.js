class Database {
  constructor(path) {
    this.path = path;
    this.fs = require("fs");
    this.fs.access(this.path, (err) => {
      if (err) {
        this.fs.writeFile(this.path, "[]", function (err) {
          if (err) throw err;
          console.log("Saved!");
        });
      } else {
        console.log("The file exists.");
      }
    });
  }
  addUser(userData) {
    this.fs.readFile(this.path, "utf8", (err, data) => {
      if (err) throw err;

      console.log(data);
    });
  }
}

const myDatabase = new Database("C:\\Users\\marij\\Documents\\MyBase.js");
myDatabase.addUser({ name: "Иван", sername: "Иванов", age: "30", occupation: "Механик" });
myDatabase.changeUser("id", { ocuupation: "Инжинер" });
myDatabase.deleteUser("id");
myDatabase.getDatabase();
myDatabase.getUser("id");
