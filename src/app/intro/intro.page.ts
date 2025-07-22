import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Corregido aquí
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router'; // ✅ Corrección aquí

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule // ✅ Necesario para usar Router
  ]
})
export class IntroPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  goback() {
    console.log('Volver');
    this.router.navigateByUrl('/home');
  }
}
