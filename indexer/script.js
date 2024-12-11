export const config = {
  streamUrl: Deno.env.get("APIBARA_STREAM_URL"),
  startingBlock: 0,
  network: "starknet",
  finality: "DATA_STATUS_PENDING",
  filter: {
    events: [
      {
        // New Stonk Event
        fromAddress: Deno.env.get("STONKS_CONTRACT_ADDRESS"),
        keys: [
          "0x03755b6d3f48992af15de25f545ee92c3cb4205c6b24d1aa65d93701bc3d63f9"
        ],
        includeReverted: false,
        includeTransaction: false,
        includeReceipt: false
      },
      {
        // Stonk Claimed Event
        fromAddress: Deno.env.get("STONKS_CONTRACT_ADDRESS"),
        keys: [
          "0x00e6009859f4b71dc66d2c774b2dc0852fce0cc94eb683969fdd8da1a07788fc"
        ],
        includeReverted: false,
        includeTransaction: false,
        includeReceipt: false
      }
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

