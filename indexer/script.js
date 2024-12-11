const MEMECOIN_LAUNCHED_EVENT_KEY = "0x0257c7875ae0eb2f487e258997d033dde6441d55296281bc727bc1e64b833cfd"
const UNRUGGABLE_CONTRACT_ADDRESS = "0x494a72a742b7880725a965ee487d937fa6d08a94ba4eb9e29dd0663bc653a2"

export const config = {
  streamUrl: "https://sepolia.starknet.a5a.ch",
  startingBlock: 381350,
  network: "starknet",
  finality: "DATA_STATUS_PENDING",
  filter: {
    events: [
      {
        fromAddress: UNRUGGABLE_CONTRACT_ADDRESS,
        keys: [
          MEMECOIN_LAUNCHED_EVENT_KEY 
        ],
        includeReverted: false,
        includeTransaction: false,
        includeReceipt: false
      },
    ]
  },
  sinkType: "webhook",
  sinkOptions: {
    targetUrl: Deno.env.get("CONSUMER_TARGET_URL")
  }
};

export default function transform(block) {
  return block;
}

