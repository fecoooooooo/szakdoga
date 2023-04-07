const baseUrl = (<any>window).env.baseUrl || 'http://localhost:44301';

export const environment = {
  apiUrl: `${baseUrl}/api`,
};
