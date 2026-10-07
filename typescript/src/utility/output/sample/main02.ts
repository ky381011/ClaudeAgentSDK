import { cidrv4, z } from "zod";
import { query } from "@anthropic-ai/claude-agent-sdk";

const outputFormat = z.object({
  vpc: z.record(
    z.string(),
    z.object({
      name: z.string(),
      addressPrefixes: z.array(z.string()),
      subnets: z.record(
        z.string(),
        z.object({
          name: z.string(),
          addressPrefixes: z.array(z.string()),
        })
      )
    })
  )
})

const schema = z.toJSONSchema(outputFormat, { target: "draft-7" });

const argsErrorMessage = `
引数が正しくありません。
1つ目 = A | B | C : RFCクラス
2つ目 = 数値 : VPC数
3つ目～ = 数値 : 各VPCのSubnet数

例: A 3 2 4 3

A → RFCクラス
3 → VPC数
2 → VPC01のSubnet数
4 → VPC02のSubnet数
3 → VPC03のSubnet数
`;

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    throw new Error(argsErrorMessage);
  }
  const rfcClass = args[0];

  if (!["A", "B", "C"].includes(rfcClass)) {
    throw new Error(argsErrorMessage);
  }

  const vpcCount = Number(args[1]);

  if (!Number.isInteger(vpcCount) || vpcCount <= 0) {
    throw new Error(argsErrorMessage);
  }

  const subnetCounts = args
    .slice(2)
    .map(Number);

  if (
    subnetCounts.some(
      (count) => !Number.isInteger(count) || count <= 0
    )
  ) {
    throw new Error(argsErrorMessage);
  }

  if (subnetCounts.length !== vpcCount) {
    throw new Error(argsErrorMessage);
  }
  
  const result = query({
    prompt: "",
    options: {
      outputFormat: {
        type: "json_schema",
        schema: schema
      }
    }
  });

  for await (const message of result) {
    console.log(message);
  }
}

if (require.main === module) {
  main();
}
