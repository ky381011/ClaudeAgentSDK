import { query } from "@anthropic-ai/claude-agent-sdk";
import { QueryUnit } from "../unit/interfaces/query";

export function displayUnitName(queryName: string) {
  const color = "\x1b[36m" // 水色
  const reset = "\x1b[0m"

  const text = `Query Name : ${queryName}`
  const border = "=".repeat(text.length*2)

  console.log(`${color}${border}${reset}`)
  console.log(`${color}${text}${reset}`)
  console.log(`${color}${border}${reset}`)
}

export async function runQuery(content: QueryUnit): Promise<string> {
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
