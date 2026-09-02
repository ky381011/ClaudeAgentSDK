import { query } from "@anthropic-ai/claude-agent-sdk";
import { greetingAgent } from "./CustomAgent/greet";

async function main() {
  const result = query({
    prompt: "greeting-agent を使って挨拶してください。",
    options: {
      agents: {
        "greeting-agent": greetingAgent,
      },
    },
  });

  for await (const message of result) {
    console.log(message);
  }
}

if (require.main === module) {
  main();
}
