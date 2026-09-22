import { execFile } from "node:child_process"
import { promisify } from "node:util"
import path from "node:path"

// プロジェクトへの相対パス
// NOTE : このファイルからではなく npx コマンドを実行する場所からの相対パス
const projectRootPath = "../../"
// プロジェクトからの相対パス
const scriptPath = "utility/python/"

const mainPath = path.resolve(
  projectRootPath,
  scriptPath,
  "main.py",
)

const execFileAsync = promisify(execFile)

const args = [
  "calcurator",
  "arithmetic",
  "add",
  "10",
  "5"
]

async function main() {
  const { stdout } = await execFileAsync(
    "python",
    [mainPath, ...args],
  )

  console.log(stdout)
}

main()
export {}
