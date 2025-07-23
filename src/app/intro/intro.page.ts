import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit {

  slides = [
    {
      title: 'Bienvenido',
      description: 'Explora nuestra app para una mejor experiencia.',
      image: 'assets/img/slide1.svg'
    },
    {
      title: 'Rápido y sencillo',
      description: 'Accede a funciones de forma fácil y rápida.',
      image: 'assets/img/slide2.svg'
    },
    {
      title: 'Personaliza',
      description: 'Ajusta preferencias y temas a tu gusto.',
      image: 'assets/img/slide3.svg'
    },
    {
      title: 'Listo para comenzar',
      description: '¡Vamos a empezar!',
      image: 'assets/img/slide4.svg'
    }
  ];

  constructor(private router: Router, private storageService: StorageService) {}

  async ngOnInit() {
    // Opción 2: no redirigir automáticamente
    // El usuario debe navegar manualmente
  }

  async finalizarIntro() {
    await this.storageService.set('introSeen', true);
    this.router.navigateByUrl('/home');
  }

}
