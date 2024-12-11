const MEMECOIN_LAUNCHED_EVENT_KEY = "0x0257c7875ae0eb2f487e258997d033dde6441d55296281bc727bc1e64b833cfd"
const MEMECOIN_CREATED_EVENT_KEY = "0x01be539d3a1327d450ab9b7a754f7708ea94f67182f2506217cafff2d694f8e1"

// Sepolia
const UNRUGGABLE_CONTRACT_ADDRESS = "0x494a72a742b7880725a965ee487d937fa6d08a94ba4eb9e29dd0663bc653a2"
const STARTING_BLOCK = 381350;
// Mainnet
// const UNRUGGABLE_CONTRACT_ADDRESS = "0x01a46467a9246f45c8c340f1f155266a26a71c07bd55d36e8d1c7d0d438a2dbc"
// const STARTING_BLOCK = 615556;

export const config = {
  streamUrl: "https://sepolia.starknet.a5a.ch",
  startingBlock: STARTING_BLOCK,
  network: "starknet",
  finality: "DATA_STATUS_PENDING",
  filter: {
    events: [
      {
        fromAddress: UNRUGGABLE_CONTRACT_ADDRESS,
        keys: [
          MEMECOIN_CREATED_EVENT_KEY 
        ],
        includeReverted: false,
        includeTransaction: true,
        includeReceipt: false
      },
    ]
  },
  sinkType: "webhook",
  sinkOptions: {
    targetUrl: "http://degen-date-consumer-1:8081/consume-indexer-msg:8081/consume-indexer-msg"
  }
};

export default function transform(block) {
  console.log(block);
  return block;
}

