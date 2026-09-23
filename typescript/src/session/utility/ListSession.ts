import { listSessions } from "@anthropic-ai/claude-agent-sdk"

/**
 * Claude Codeのセッション一覧を取得する
 *
 * @param limit 取得するセッション数（デフォルト: 5）
 */
export async function getSessions(limit: number = 5) {
  const sessions = await listSessions()

  return sessions
    .sort((a, b) => b.lastModified - a.lastModified)
    .slice(0, limit)
}

/**
 * セッション一覧を表示する
 */
export async function displaySessions(): Promise<void> {
  const sessions = await getSessions()

  for (const session of sessions) {
    console.log(`Session ID    : ${session.sessionId}`)
    console.log(`Summary       : ${session.summary}`)
    console.log(
      `Last Modified : ${new Date(session.lastModified).toLocaleString()}`
    )
    console.log()
  }
}

displaySessions().catch((error) => {
  console.error(error)
  process.exit(1)
})
