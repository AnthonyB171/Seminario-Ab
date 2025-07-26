import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
  IonText
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
    IonLabel,
    IonItem,
    IonText,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RegistroPage {

  registroForm: FormGroup;
  mensajeError: string | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // ✅ Inicializa el formulario directamente aquí
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registrar() {
    if (this.registroForm.invalid) {
      this.mensajeError = 'Por favor completa todos los campos correctamente.';
      return;
    }

    const datos = this.registroForm.value;

    // ✅ Guardar en Ionic Storage usando AuthService
    this.authService.registerUser(datos)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error: string | undefined) => {
        this.mensajeError = error;
      });
  }

  volverLogin() {
    this.router.navigate(['/login']);
  }
}
