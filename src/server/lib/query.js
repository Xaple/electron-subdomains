import * as dns from "dns";

export var query = async function(subdomain, callback) {
  dns.resolve4(subdomain, (err, address) => {
    if (err) {
      callback(null, null);
    } else {
      let result = { code: 1, domain: subdomain, address: address.toString() };
      callback(null, result);
    }
  });
};
