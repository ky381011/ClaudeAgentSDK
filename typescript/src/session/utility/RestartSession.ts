import { query } from "@anthropic-ai/claude-agent-sdk"
import { QueryUnit } from "../../unit/interfaces/query";

/**
 * Claude Codeのセッションを再開する
 *
 * @param sessionId セッションID
 * @param queryUnit クエリユニット（プロンプトとオプション）
 */
export async function restartSession(sessionId: string, queryUnit: QueryUnit) {
  return query({
    prompt: queryUnit.prompt,
    options: {
      ...queryUnit.options,
      resume: sessionId
    }
  })
}
