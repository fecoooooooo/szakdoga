(<any>window).env = (<any>window).env || {};
const baseUrl = (<any>window).env.baseUrl || 'https://localhost:44301';

export const environment = {
  apiUrl: `${baseUrl}/api`,
};
