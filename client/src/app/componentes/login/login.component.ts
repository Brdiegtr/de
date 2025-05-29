import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Servicios/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario ya está autenticado
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);  // Redirige al home si el usuario ya está logueado
    }
  }

onSubmit() {
  this.error = ''; // Limpiar error previo
  console.log('Enviando login con:', this.email, this.password);

  this.auth.login({ email: this.email, password: this.password }).subscribe({
    next: (res: any) => {
      console.log('Respuesta login:', res);
      if (res.token && res.user) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/home']);
      } else {
        this.error = 'Respuesta inesperada del servidor';
      }
    },
    error: (err) => {
      console.error('Error login:', err);
      // Muestra el mensaje que venga del backend, o uno por defecto
      this.error = err.error?.msg || 'Error en el login, intenta nuevamente.';
    }
  });
}


}
