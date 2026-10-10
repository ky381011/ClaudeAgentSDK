import { query, AgentInfo } from "@anthropic-ai/claude-agent-sdk";

async function main() {
  const result = query({
    prompt: "Hello",
  });

  const supportedAgents = await result.supportedAgents();
  const supportedAgentNames = supportedAgents.map(agent => agent.name);

  console.log("エージェント一覧");
  console.log(supportedAgentNames.join("\n"));
}

main().catch(console.error);
