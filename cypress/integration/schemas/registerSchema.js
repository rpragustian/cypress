// Register schema for user registration response validation
export const registerSchema = {
  type: "object",
  properties: {
    id: { type: "integer", minimum: 1 },
    token: { type: "string", minLength: 1 }
  },
  required: ["id", "token"],
  additionalProperties: false
};
