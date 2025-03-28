export interface User  {
    persNames: string;
    persLastNames: string;
    persRole: string;
  }

  export interface ListUserResponse {
    users: User[]; // Suponiendo que la API devuelve una lista de usuarios
  }