import { QueryUnit } from "../../unit/interfaces/query";
import { displayUnitName } from "../../query/main";
import { runQuery } from "../../query/main";

async function testDisplayUnitName() {
  console.log(`\x1b[42m1. Unit名表示テスト\x1b[0m`)
  console.log()

  const testMessage: string = "動作テスト"
  displayUnitName(testMessage)
}

async function testRunQuery() {
  console.log(`\x1b[42m2. Query実行テスト\x1b[0m`)
  console.log()

  const testQuery: QueryUnit = {
    name: "クエリ実行テスト",
    prompt: "こんにちは。あなたは何ができますか？",
  }

  const result = await runQuery(testQuery)

  console.log(result)
}

async function main() {
  const args = process.argv.slice(2)
  const testNumber = args[0]

  if (testNumber === "1") {
    await testDisplayUnitName()
  } else if (testNumber === "2") {
    await testRunQuery()
  } else {
    await testDisplayUnitName()
    console.log()
    await testRunQuery()
  }
}

if (require.main === module) {
  main()
}
