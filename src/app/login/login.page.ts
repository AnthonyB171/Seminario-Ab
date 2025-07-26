import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // <-- Importar Router

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  validation_messages = {
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es válido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router // <-- Inyectar Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  ngOnInit() {}

  loginUser(credentials: { email: string; password: string }) {
    console.log(credentials);
    this.authService.loginUser(credentials).then(res => {
      console.log(res);
      // Redirigir al home después del login exitoso
      this.router.navigate(['/home']);
    }).catch(err => {
      console.error('Error de login:', err);
      // Aquí puedes manejar errores (mostrar alertas, etc.)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario válido:', this.loginForm.value);
      this.loginUser(this.loginForm.value);
    } else {
      console.log('Formulario inválido');
      this.loginForm.markAllAsTouched();
    }
  }

  goToRecover() {
    this.router.navigate(['/recover']); // Asegúrate de tener esta ruta definida
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }

  goToRegistro() {
    this.router.navigate(['/registro']);
  }
}

