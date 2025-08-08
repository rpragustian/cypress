// Create user schema for user creation response validation
export const createUserSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    job: { type: "string", minLength: 1 },
    id: { type: "string", minLength: 1 },
    createdAt: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$" }
  },
  required: ["name", "job", "id", "createdAt"],
  additionalProperties: false
};
