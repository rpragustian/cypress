// API methods index file
// Import all API methods from here: import { userApi, authApi } from '../integration/api/index.js';

// Export user API methods
export { userApi, getUser, getUsersList, createUser, updateUser, deleteUser } from './userApi.js';

// Export auth API methods
export { authApi, login, register, loginWithDefaultCredentials, registerWithDefaultCredentials } from './authApi.js';

// Export all APIs as a single object for convenience
import { userApi } from './userApi.js';
import { authApi } from './authApi.js';

export const api = {
  user: userApi,
  auth: authApi
};
