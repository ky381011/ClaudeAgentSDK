import { listSessions } from "@anthropic-ai/claude-agent-sdk";

async function main() {
  const sessions = await listSessions();
  console.log(`Found ${sessions.length} sessions`);
  sessions.forEach((session) => {
    console.log(`- ${session.sessionId}: ${session.summary}`);
  });
}

main().catch(console.error);
