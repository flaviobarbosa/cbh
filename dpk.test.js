const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it('Returns candidate with partition key < MAX_PARTITION_KEY_LENGTH', () => {
    const partitionKey = crypto.randomBytes(2).toString('hex');
    const key = deterministicPartitionKey({ partitionKey: partitionKey });
    expect(key).toBe(partitionKey);
  })

  it('Returns candidate with partition key > MAX_PARTITION_KEY_LENGTH', () => {
    const partitionKey = crypto.randomBytes(256).toString('hex');
    const candidate = crypto.createHash("sha3-512").update(partitionKey).digest("hex")
    
    const key = deterministicPartitionKey({ partitionKey: partitionKey });
    expect(key).toBe(candidate);
  })

   it('Returns candidate without partition key ', () => {
    const event = crypto.randomBytes(2).toString('hex');
     
    const candidate = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex")
    
    const key = deterministicPartitionKey( event );
    expect(key).toBe(candidate);
   })
  
  it('Returns candidate with partition key not being string', () => {
    const partitionKey = [1,2,3]
     
    const candidate = JSON.stringify(partitionKey)
    
    const key = deterministicPartitionKey( { partitionKey: partitionKey } );
    expect(key).toBe(candidate);
  })
});
