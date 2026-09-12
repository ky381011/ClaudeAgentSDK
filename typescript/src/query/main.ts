import { query } from "@anthropic-ai/claude-agent-sdk";
import { QueryUnit } from "../unit/interfaces/query";

function displayUnitName(queryName: string) {
  const color = "\x1b[36m" // 水色
  const reset = "\x1b[0m"

  const text = `Query Name : ${queryName}`
  const border = "=".repeat(text.length*2)

  console.log(`${color}${border}${reset}`)
  console.log(`${color}${text}${reset}`)
  console.log(`${color}${border}${reset}`)
}

async function runQuery(content: QueryUnit): Promise<string> {
  displayUnitName(content.name)
  
  const result = query({
    prompt: content.prompt,
    options: content.options
  });

  for await (const message of result) {
    if (message.type === "result") {
      if (message.subtype === "success") {
        return message.result
      }

      throw new Error(`Query failed: ${message.subtype}`)
    }
  }

  throw new Error("Query result not found")
}

async function main() {
  console.log(`\x1b[42m1. Unit名表示テスト\x1b[0m`)
  console.log()

  const testMessage: string = "動作テスト"
  displayUnitName(testMessage)

  console.log(`\x1b[42m2. Query実行テスト\x1b[0m`)
  console.log()

  const testQuery: QueryUnit = {
    name: "クエリ実行テスト",
    prompt: "こんにちは。あなたは何ができますか？",
  }

  const result = await runQuery(testQuery)

  console.log(result)
}

if (require.main === module) {
  main()
}
