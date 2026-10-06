import { cidrv4, z } from "zod";
import { query } from "@anthropic-ai/claude-agent-sdk";

const outputFormat = z.object({
  vpc: z.object({
    name: z.string(),
    addressPrefixes: z.array(z.string()),
    subnets: z.object({
      name: z.string(),
      addressPrefixes: z.array(z.string()),
    })
  })
})
