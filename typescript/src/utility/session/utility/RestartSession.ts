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

if (require.main === module) {
  const sessionId = process.argv[2]
  const prompt = process.argv[3]

  if (!sessionId || !prompt) {
    console.error('Usage: npx ts-node RestartSession.ts <sessionId> <prompt>')
    process.exit(1)
  }

  restartSession(sessionId, { name: 'RestartSession', prompt }).catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
