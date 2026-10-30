/**
 * カスタムエージェントのプロンプトに示す入出力例
 */
export interface AgentPromptExample {
  /** エージェントへの入力例 */
  input: string
  /** 入力例に対して期待する出力 */
  output: string
}

/**
 * カスタムエージェントのプロンプトを構成する章立て
 */
export interface AgentPromptSections {
  /** 役割: エージェントが何者で、どの分野の専門家か */
  role: string
  /** 目的: エージェントが達成すべきゴール */
  objective: string
  /** 背景: タスクの前提知識やプロジェクト固有の文脈 */
  context?: string
  /** 手順: タスクを進める順序 */
  instructions: string[]
  /** 制約: 守るべきルールや禁止事項 */
  constraints?: string[]
  /** 出力形式: 結果の形式や構成 */
  outputFormat?: string
  /** 入出力例: 期待する振る舞いの具体例 */
  examples?: AgentPromptExample[]
  /** エスカレーション: 判断できない場合や失敗した場合の対応 */
  escalation?: string
}
