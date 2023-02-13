const {deterministicPartitionKey} = require("./dpk");
const crypto = require("crypto");

console.log(deterministicPartitionKey());