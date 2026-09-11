import type { Options } from "@anthropic-ai/claude-agent-sdk";

/**
 * システム制御可能な最小単位
 */
export interface QueryUnit {
  /** Unitを識別する名前 */
  name: string
  /** LLMに与えるプロンプト */
  prompt: string
  /** Unitのオプション設定項目 */
  options?: Options
}

// テスト
const testPrompt: string = "こんにちは"
const queryUnit: QueryUnit = {
  name: "Test",
  prompt: testPrompt
}
