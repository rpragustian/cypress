// Login schema for authentication response validation
export const loginSchema = {
  type: "object",
  properties: {
    token: { type: "string", minLength: 1 }
  },
  required: ["token"],
  additionalProperties: false
};
