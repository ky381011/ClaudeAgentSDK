import { execFile } from "node:child_process"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)
const pythonPath = "utility/python/calcurator"

async function callPythonFunction(
  functionName: string,
  args: number[]
): Promise<number> {
  const argsStr = args.join(",")
  try {
    const { stdout } = await execFileAsync("python", [
      "-c",
      `
import sys
sys.path.insert(0, '${pythonPath}')
from arithmetic import ${functionName}
result = ${functionName}(${argsStr})
print(result)
`,
    ])
    return parseFloat(stdout.trim())
  } catch (error) {
    console.error(`Error calling ${functionName}:`, error)
    throw error
  }
}

export { callPythonFunction }
