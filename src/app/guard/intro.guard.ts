import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  async canActivate(): Promise<boolean> {
    await this.storage.create(); // asegura que el storage esté listo
    const introSeen = await this.storage.get('introSeen');

    if (introSeen) {
      return true; // permitir paso al home
    } else {
      this.router.navigateByUrl('/intro');
      return false; // redirigir a intro
    }
  }
}
