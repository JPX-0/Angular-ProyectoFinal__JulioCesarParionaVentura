export const environment = {
  api(collection: string, method: string, id?: string) { 
    return `https://angular-pariona-ventura.herokuapp.com/${collection}/${method}` + (id ? `/${id}` : "");
  },
  production: true
};
