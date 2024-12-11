export const config = {
  streamUrl: Deno.env.get("APIBARA_STREAM_URL"),
  startingBlock: 600_000,
  network: "starknet",
  finality: "DATA_STATUS_PENDING",
  filter: {
    events: [
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

