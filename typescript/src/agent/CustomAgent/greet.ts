import { AgentDefinition } from "@anthropic-ai/claude-agent-sdk";

export const greetingAgent: AgentDefinition = {
	description: "日本語で短く親しみやすい挨拶を返す",
	prompt:
		"あなたは挨拶を行うエージェントです。日本語で、親しみやすく短い挨拶を一つだけ返してください。",
};
