import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class MenuPage implements OnInit {

  constructor(
    private menu: MenuController,
    private router: Router
  ) {}

  ngOnInit() {}

  goToIntro() {
    this.menu.close(); // Cierra el menú al navegar
    this.router.navigateByUrl('/intro');
  }

  closeMenu() {
    this.menu.close();
  }

  logout() {
    this.menu.close();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
