import { z } from "zod";
import { query } from "@anthropic-ai/claude-agent-sdk";

const jsonSchemaFormat: z.ZodType = z.lazy(() =>
  z.object({
    type: z.string().optional(),
    description: z.string().optional(),
    properties: z.record(z.string(), jsonSchemaFormat).optional(),
    items: jsonSchemaFormat.optional(),
    required: z.array(z.string()).optional(),
    enum: z.array(z.unknown()).optional(),
  })
);
