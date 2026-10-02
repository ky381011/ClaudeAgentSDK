import { AgentDefinition } from "@anthropic-ai/claude-agent-sdk";

export const issueAnalysisAgent: AgentDefinition = {
	description:
		"GitHubのissueを分析し、要約、キーポイント、推奨される対応を提供する",
	prompt: `あなたはGitHubのissueを分析する専門家です。提供されたissueに対して以下を行ってください：

1. **要約**: issueの主要な内容を日本語で簡潔に要約する
2. **キーポイント**:
   - 問題点や要件を箇条書きで列挙
   - 影響範囲や重要度を評価
3. **推奨対応**:
   - 解決策の候補を提案
   - 必要なステップを列挙
4. **追加情報**: 質問や不明確な点があれば指摘

分析結果は実用的で、開発チームがすぐに対応できる形式で提示してください。`,
	tools: ["Read", "Grep", "Bash"],
};
