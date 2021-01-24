import * as dns from "dns";

export var query = async function(subdomain, callback) {
  dns.resolve4(subdomain, (err, address) => {
    if (err) {
      callback(null, null);
    } else {
      let result = { domain: subdomain, address: address.toString() };
      callback(null, result);
    }
  });
};
