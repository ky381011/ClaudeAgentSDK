import { z } from "zod";
import { query } from "@anthropic-ai/claude-agent-sdk";

// Define schema with Zod
const FeaturePlan = z.object({
  feature_name: z.string(),
  summary: z.string(),
  steps: z.array(
    z.object({
      step_number: z.number(),
      description: z.string(),
      estimated_complexity: z.enum(["low", "medium", "high"])
    })
  ),
  risks: z.array(z.string())
});

type FeaturePlan = z.infer<typeof FeaturePlan>;

// Convert to JSON Schema using the draft-07 target the SDK expects
const schema = z.toJSONSchema(FeaturePlan, { target: "draft-7" });

// Use in query
(async () => {
  try {
    for await (const message of query({
      prompt:
        "Plan how to add dark mode support to a React app. Break it into implementation steps.",
      options: {
        outputFormat: {
          type: "json_schema",
          schema: schema
        }
      }
    })) {
      if (message.type === "result" && message.subtype === "success" && message.structured_output) {
        // Validate and get fully typed result
        const parsed = FeaturePlan.safeParse(message.structured_output);
        if (parsed.success) {
          const plan: FeaturePlan = parsed.data;
          console.log(`Feature: ${plan.feature_name}`);
          console.log(`Summary: ${plan.summary}`);
          plan.steps.forEach((step) => {
            console.log(`${step.step_number}. [${step.estimated_complexity}] ${step.description}`);
          });
        }
      }
    }
  } catch (error) {
    // A single-shot query() throws after yielding an error result, such as
    // error_max_structured_output_retries; see the Error handling section.
    console.error(`Session ended with an error: ${error}`);
  }
})();
