// Mock API modules - return empty/mock data for all API calls
const createMockApi = () => {
  return new Proxy({}, {
    get: (_target, prop) => {
      return async (...args: any[]) => {
        console.log(`API call: ${String(prop)}`, args);
        return { data: [], success: true, message: 'mock' };
      };
    },
  });
};

export const recommendationsAPI = createMockApi();
export const searchAPI = createMockApi();
export const userProfileAPI = createMockApi();
export const homeScreenAPI = createMockApi();
export const watchlistAPI = createMockApi();
export const communityAPI = createMockApi();
export const inboxFlowAPIs = createMockApi();
export const staticFormsAPI = createMockApi();
export const guestAPI = createMockApi();
export const yearWrapAPI = createMockApi();

export default createMockApi;
