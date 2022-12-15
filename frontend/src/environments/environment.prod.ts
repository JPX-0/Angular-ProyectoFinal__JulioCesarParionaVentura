export const environment = {
  api(collection: string, method: string, id?: string) { 
    return `https://backend-angular-seven.vercel.app/${collection}/${method}` + (id ? `/${id}` : "");
  },
  production: true
};
