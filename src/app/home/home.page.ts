import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  colorclaro = 'var(--color-claro)';
  coloroscuro = 'var(--color-oscuro)';
  coloractual = this.coloroscuro;

  genres = [
    {
      Title: 'Champeta',
      Image: 'https://tse3.mm.bing.net/th/id/OIP.D1xnD1oDlGldhpIsy7_BtgHaDc?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      description: `La champeta es un género musical y cultural originario de Cartagena...`
    },
    {
      Title: 'Música Clásica',
      Image: 'https://formacioncatolica.org/wp-content/uploads/Articulo-Musica-Clasica-Cuarteto-1.jpg.webp',
      description: `La música clásica es un tipo de música académica...`
    },
    {
      Title: 'Reggaetón',
      Image: 'https://i0.wp.com/tulanemagazine.com/wp-content/uploads/1-82-2249095184-1542245031587.png?fit=599%2C337&ssl=1',
      description: `El reggaetón mezcla reggae, hip hop y ritmos latinos...`
    }
  ];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadStorageData();
    this.simularCargaDatos();
  }

  async cambiarcolor() {
    this.coloractual = this.coloractual === this.coloroscuro ? this.colorclaro : this.coloroscuro;
    await this.storageService.set('theme', this.coloractual);
    console.log('Tema guardado:', this.coloractual);
  }

  async loadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.coloractual = savedTheme;
      console.log('Tema cargado:', savedTheme);
    }
  }

  async simularCargaDatos() {
    const data = await this.obtenerDatosSimulados();
    console.log('Datos simulados: ', data);
  }

  obtenerDatosSimulados() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Champeta', 'Salsa', 'Reguetón']);
      }, 1500);
    });
  }

  irAIntro() {
    this.router.navigateByUrl('/intro');
  }
}
