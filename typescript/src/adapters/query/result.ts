import type { Query, SDKMessage, SDKAssistantMessage, SDKUserMessage, SDKResultMessage } from "@anthropic-ai/claude-agent-sdk";

export type { Query, SDKMessage, SDKAssistantMessage, SDKUserMessage, SDKResultMessage };

export async function collectQueryResults(query: Query): Promise<SDKMessage[]> {
  const messages: SDKMessage[] = [];
  for await (const message of query) {
    messages.push(message);
  }
  return messages;
}

export async function getAssistantResponse(query: Query): Promise<string | null> {
  let lastAssistantText: string | null = null;
  for await (const message of query) {
    if (message.type === 'assistant' && message.message.content) {
      const textBlock = message.message.content.find((block) => block.type === 'text');
      if (textBlock && 'text' in textBlock) {
        lastAssistantText = textBlock.text;
      }
    }
  }
  return lastAssistantText;
}

async function main() {
  const { query } = await import("@anthropic-ai/claude-agent-sdk");
  const { greetingAgent } = await import("./../../agent/CustomAgent/greet");

  console.log("Query result adapter module loaded");
  console.log("Testing collectQueryResults...\n");

  const result = query({
    prompt: "greeting-agent を使って挨拶してください。",
    options: {
      agents: {
        "greeting-agent": greetingAgent,
      },
    },
  });

  const messages = await collectQueryResults(result);
  console.log(`Collected ${messages.length} messages`);
  console.log("\nMessage types:");
  messages.forEach((msg, index) => {
    console.log(`  ${index + 1}. ${msg.type}`);
  });

  // console.log("\nExported functions:");
  // console.log("  - collectQueryResults(query: Query): Promise<SDKMessage[]>");
  // console.log("  - getAssistantResponse(query: Query): Promise<string | null>");
}

if (require.main === module) {
  main();
}
