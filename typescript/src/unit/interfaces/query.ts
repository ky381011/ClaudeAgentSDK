import type { Options } from "@anthropic-ai/claude-agent-sdk";

/**
 * システム制御可能な最小単位
 */
export interface QueryUnit {
  name: string
  prompt: string
  tools: Options["tools"]
}
