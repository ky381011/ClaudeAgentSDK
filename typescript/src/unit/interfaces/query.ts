import type { Options } from "@anthropic-ai/claude-agent-sdk";

/**
 * システム制御可能な最小単位
 */
export interface QueryUnit {
  /** Unitを識別する名前 */
  name: string
  /** LLMに与えるプロンプト */
  prompt: string
  /** Unitが利用可能なツール */
  tools: Options["tools"]
}
