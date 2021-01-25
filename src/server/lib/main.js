import { query } from "./query";
import { load } from "./load";
import { portscan } from "./portscan";
import * as async from "async";

export var main = function(domain, ports, callback) {
  async.waterfall([
    function(callback) {
      load((err, res) => {
        callback(null, res);
      });
    },
    function(dictionary) {
      async.mapSeries(
        dictionary,
        (item, next) => {
          query(item + "." + domain, (err, result) => {
            if (result) {
              portscan(result.address, ports, (err, res) => {
                result.ports = res;
                callback(null, result);
                next();
              });
            } else {
              callback(null, result);
              next();
            }
          });
        },
        () => {
          callback(null, { code: 0 });
        }
      );
    }
  ]);
};
