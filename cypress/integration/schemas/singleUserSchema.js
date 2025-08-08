import { userSchema } from './userSchema.js';

// Single user schema for individual user response validation
export const singleUserSchema = {
  type: "object",
  properties: {
    data: userSchema,
    support: {
      type: "object",
      properties: {
        url: { type: "string", pattern: "^https?://.+" },
        text: { type: "string" }
      },
      required: ["url", "text"]
    }
  },
  required: ["data", "support"],
  additionalProperties: false
};
