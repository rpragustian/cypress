import { userSchema } from './userSchema.js';

// Users list schema for paginated users response validation
export const usersListSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    per_page: { type: "integer", minimum: 1 },
    total: { type: "integer", minimum: 0 },
    total_pages: { type: "integer", minimum: 0 },
    data: {
      type: "array",
      items: userSchema,
      minItems: 0
    },
    support: {
      type: "object",
      properties: {
        url: { type: "string", pattern: "^https?://.+" },
        text: { type: "string" }
      },
      required: ["url", "text"]
    }
  },
  required: ["page", "per_page", "total", "total_pages", "data", "support"],
  additionalProperties: false
};
