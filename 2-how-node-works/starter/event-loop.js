const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

setTimeout(() => {
  console.log("timer is finished");
}, 0);

setImmediate(() => {
  console.log("immidate 1 finished");
});

fs.readFile("test-file.txt", () => {
  console.log("i/o finished");

  process.nextTick(() => console.log("process.nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password encrypted");
  });
});

console.log("hello  from the top-level code");
