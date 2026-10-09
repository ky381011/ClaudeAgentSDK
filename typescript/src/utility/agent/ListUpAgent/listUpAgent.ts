import { query } from "@anthropic-ai/claude-agent-sdk";

async function main() {
  const result = query({
    prompt: "Hello",
  });

  const agents = await result.supportedAgents();

  console.log(agents);
}

main().catch(console.error);
