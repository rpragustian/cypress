// User schema for individual user data validation
export const userSchema = {
  type: "object",
  properties: {
    id: { type: "integer", minimum: 1 },
    email: { type: "string", pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" },
    first_name: { type: "string", minLength: 1 },
    last_name: { type: "string", minLength: 1 },
    avatar: { type: "string", pattern: "^https?://.+" }
  },
  required: ["id", "email", "first_name", "last_name", "avatar"],
  additionalProperties: false
};
