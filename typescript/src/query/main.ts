import { query } from "@anthropic-ai/claude-agent-sdk";
import { QueryUnit } from "../unit/interfaces/query";

import chalk from "chalk"
import stringWidth from "string-width"

export function displayUnitName(queryName: string) {
  const text = ` Query Name : ${queryName} `
  const width = stringWidth(text)
  const border = "═".repeat(width)

  console.log(chalk.cyan(`╔${border}╗`))
  console.log(chalk.cyan(`║${text}║`))
  console.log(chalk.cyan(`╚${border}╝`))
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
