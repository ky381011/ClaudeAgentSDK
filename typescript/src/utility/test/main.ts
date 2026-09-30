import { query } from "@anthropic-ai/claude-agent-sdk";

async function main() {
  const result = query({
    prompt: "こんにちは。あなたは何ができますか？",
  });

  for await (const message of result) {
    console.log(message);
  }
}

main();
