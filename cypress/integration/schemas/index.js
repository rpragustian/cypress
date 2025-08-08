// Schemas index file
// Import all schemas from here: import { userSchema, singleUserSchema } from '../integration/schemas/index.js';

// Export user schemas
export { userSchema } from './userSchema.js';
export { usersListSchema } from './usersListSchema.js';
export { singleUserSchema } from './singleUserSchema.js';
export { createUserSchema } from './createUserSchema.js';
export { loginSchema } from './loginSchema.js';
export { registerSchema } from './registerSchema.js';

// Export all schemas as a single object for convenience
import { userSchema } from './userSchema.js';
import { usersListSchema } from './usersListSchema.js';
import { singleUserSchema } from './singleUserSchema.js';
import { createUserSchema } from './createUserSchema.js';
import { loginSchema } from './loginSchema.js';
import { registerSchema } from './registerSchema.js';

export const schemas = {
  user: userSchema,
  usersList: usersListSchema,
  singleUser: singleUserSchema,
  createUser: createUserSchema,
  login: loginSchema,
  register: registerSchema
};
