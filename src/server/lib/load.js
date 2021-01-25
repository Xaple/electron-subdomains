import * as fs from "fs";
import * as path from "path";

export var load = function(callback) {
  let filePath = path.join(__dirname, "../../../dic.txt");
  // let filePath = "./src/server/dic.txt";
  let dictionary = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split(/\r?\n/g);
  callback(null, dictionary);
};
