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
 * @param limit 表示するセッション数（引数で指定可能）
 */
export async function displaySessions(limit?: number): Promise<void> {
  const sessions = await getSessions(limit)

  for (const session of sessions) {
    console.log(`Session ID    : ${session.sessionId}`)
    console.log(`Summary       : ${session.summary}`)
    console.log(
      `Last Modified : ${new Date(session.lastModified).toLocaleString()}`
    )
    console.log()
  }
}

if (require.main === module) {
  const limit = process.argv[2] ? parseInt(process.argv[2], 10) : undefined

  displaySessions(limit).catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
