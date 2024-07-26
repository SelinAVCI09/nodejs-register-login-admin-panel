export interface User {
  username: string;
  email?: string; // Eğer email zorunlu değilse '?' işareti kullanabilirsiniz
  password: string;
}