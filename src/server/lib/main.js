import { query } from "./query";
import * as async from "async";
import * as fs from "fs";
import * as path from "path";

export var main = function(domain, callback) {
  async.waterfall([
    function(callback) {
      let filePath = path.join(__dirname, "../../../dic.txt");
      let dictionary = fs
        .readFileSync(filePath)
        .toString()
        .trim()
        .split(/\r?\n/g);
      callback(null, dictionary);
    },
    function(dictionary) {
      async.mapSeries(
        dictionary,
        (item, next) => {
          query(item + "." + domain, (err, result) => {
            next();
            callback(null, result);
          });
        }
        // (err, results) => {
        //   //   console.log(results);
        // }
      );
    }
  ]);
};
