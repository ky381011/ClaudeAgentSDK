import { z } from "zod";
import { query } from "@anthropic-ai/claude-agent-sdk";

const Result = z.object({
  name: z.string(),
  age: z.number()
});

const schema = z.toJSONSchema(Result, { target: "draft-7" });

(async () => {
  for await (const message of query({
    prompt: "田中太郎、25歳という情報を返してください。",
    options: {
      outputFormat: {
        type: "json_schema",
        schema
      }
    }
  })) {
    if (
      message.type === "result" &&
      message.subtype === "success" &&
      message.structured_output
    ) {
      console.log(message.structured_output);
    }
  }
})();
