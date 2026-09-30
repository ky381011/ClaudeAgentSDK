import type { Query, SDKMessage, SDKAssistantMessage, SDKUserMessage, SDKResultMessage } from "@anthropic-ai/claude-agent-sdk";

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

export async function getAllAssistantMessages(query: Query): Promise<string[]> {
  const messages: string[] = [];
  for await (const message of query) {
    if (message.type === 'assistant' && message.message.content) {
      const textBlock = message.message.content.find((block) => block.type === 'text');
      if (textBlock && 'text' in textBlock) {
        messages.push(textBlock.text);
      }
    }
  }
  return messages;
}
