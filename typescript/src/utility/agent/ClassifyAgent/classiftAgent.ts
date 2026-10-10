import { query, AgentInfo } from "@anthropic-ai/claude-agent-sdk";
import type { Query } from "@anthropic-ai/claude-agent-sdk";

async function classifyAgent(query: Query){
  const supportedAgents = await query.supportedAgents();

  console.log(supportedAgents);
}

async function main() {
  const result = query({
    prompt: "Hello",
  });

  classifyAgent(result)
}

main().catch(console.error);
