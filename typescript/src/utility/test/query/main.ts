import * as readline from "readline";
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

function createReadlineInterface(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
}

function askMenu(): Promise<string> {
  return new Promise((resolve) => {
    const rl = createReadlineInterface()
    console.log("\n========== テスト選択メニュー ==========")
    console.log("1. Unit名表示テスト")
    console.log("2. Query実行テスト")
    console.log("3. すべて実行")
    console.log("0. 終了")
    console.log("=====================================\n")

    rl.question("テスト番号を入力してください: ", (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length > 0) {
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
  } else {
    let running = true
    while (running) {
      const choice = await askMenu()

      if (choice === "1") {
        await testDisplayUnitName()
      } else if (choice === "2") {
        await testRunQuery()
      } else if (choice === "3") {
        await testDisplayUnitName()
        console.log()
        await testRunQuery()
      } else if (choice === "0") {
        console.log("終了します")
        running = false
      } else {
        console.log("無効な選択です")
      }

      if (running) {
        console.log()
      }
    }
  }
}

if (require.main === module) {
  main()
}
