import { QueryUnit } from "../../unit/interfaces/query";
import { displayUnitName } from "../../query/main";
import { runQuery } from "../../query/main";

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
