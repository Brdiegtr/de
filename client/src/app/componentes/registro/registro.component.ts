import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Para las funcionalidades comunes de Angular
import { FormsModule } from '@angular/forms';  // Para la vinculación de formularios
import { Router } from '@angular/router';  // Router para la navegación
import { AuthService } from '../../Servicios/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,  // Indicamos que es un componente standalone
  imports: [CommonModule, FormsModule],  // Importamos CommonModule y FormsModule
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']  // Usamos styleUrls en lugar de styleUrl (corrección)
})
export class RegistroComponent {
  nombrecompleto = '';
  name = '';
  email = '';
  password = '';
  error = '';
  success = '';

  // Inyectamos AuthService y Router para usarlos en el componente
  constructor(private auth: AuthService, private router: Router) {}

  // Método que se llama al enviar el formulario
  onSubmit() {
    this.auth.register({
      nombrecompleto: this.nombrecompleto,
       name: this.name,
       email: this.email,
       password: this.password
      }).subscribe({
      next: () => {
        this.success = 'Registro exitoso. Ya puedes iniciar sesión.';
        this.error = '';
        this.router.navigate(['/login']);  // Navegamos al login después del registro
      },
      error: (err) => {
        this.error = err.error.msg;
        this.success = '';
      }
    });
  }
}
