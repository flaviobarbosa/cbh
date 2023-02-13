const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) candidate = getCandidateFromEvent(event);

  candidate = candidate ? stringifyIfNeeded(candidate) : TRIVIAL_PARTITION_KEY;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH)
    candidate = createHash(candidate);

  return candidate;
};

const getCandidateFromEvent = (event) => {
  if (event.partitionKey !== undefined)
    return event.partitionKey;
  
  return createEventHash(event);
}

const createEventHash = event => {
    const data = JSON.stringify(event);
    return createHash(data);
}
  
const createHash = data => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

const stringifyIfNeeded = candidate => {
  return typeof candidate === "string" ? candidate : JSON.stringify(candidate);
}
