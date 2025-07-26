import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  // ✅ LOGIN
  loginUser(credentials: any): Promise<string> {
    return new Promise(async (accept, reject) => {
      const user = await this.storage.get('usuario'); // ← usar misma clave
      if (
        user &&
        credentials.email === user.email &&
        credentials.password === user.contraseña
      ) {
        await this.storage.set('isLoggedIn', true);
        accept("login correcto");
      } else {
        reject("login incorrecto");
      }
    });
  }

  // ✅ ESTADO DE SESIÓN
  async isLoggedIn(): Promise<boolean> {
    const value = await this.storage.get('isLoggedIn');
    return value === true;
  }

  // ✅ LOGOUT
  async logout(): Promise<void> {
    await this.storage.remove('isLoggedIn');
  }

  // ✅ REGISTRO DE USUARIO ÚNICO
  async registerUser(userData: any): Promise<void> {
    const existing = await this.storage.get('usuario'); // ← misma clave
    if (existing?.email === userData.email) {
      return Promise.reject('Ese correo ya está registrado');
    }
    await this.storage.set('usuario', userData);
  }
}
