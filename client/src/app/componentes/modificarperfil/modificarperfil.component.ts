import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Servicios/auth.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-modificarperfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],  // Importación de módulos necesarios
  templateUrl: './modificarperfil.component.html',
  styleUrls: ['./modificarperfil.component.css']
})
export class ModificarperfilComponent implements OnInit {
  perfilForm!: FormGroup; // Formulario reactivo
  userId: string = '';    // ID del usuario
  mensaje: string = '';   // Mensaje de éxito
  error: string = '';     // Mensaje de error
  isFormInitialized = false; // Bandera para verificar si el formulario está inicializado

  constructor(
    private authService: AuthService,
    private fb: FormBuilder   // FormBuilder para crear el formulario
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();   // Obtener el usuario desde el localStorage
    if (user) {
      this.userId = user.id || user._id;   // Asignar el ID del usuario

      // Crear el formulario reactivo con los valores actuales del usuario
      this.perfilForm = this.fb.group({
        nombrecompleto: [user.nombrecompleto, Validators.required],
        name: [user.name, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        bio: [user.bio || ''],  // Bio opcional, si no tiene valor, se asigna una cadena vacía
        password: ['']          // Contraseña opcional, si no se desea cambiar
      });

      this.isFormInitialized = true;  // El formulario está inicializado
    } else {
      this.error = "Usuario no encontrado";
      this.isFormInitialized = true;  // El formulario está inicializado, aunque con error
    }
  }

  // Método para actualizar el perfil
  actualizarPerfil(): void {
    if (this.perfilForm.invalid) return;   // Verifica si el formulario es válido

    // Llama al servicio para actualizar el perfil
    this.authService.updateProfile(this.userId, this.perfilForm.value).subscribe({
      next: (res: any) => {
        this.mensaje = res.msg;  // Si la actualización es exitosa, muestra el mensaje
        this.error = '';         // Limpia el mensaje de error
        localStorage.setItem('user', JSON.stringify(res.user));  // Guarda los nuevos datos en el localStorage
      },
      error: (err) => {
        this.error = err.error?.msg || 'Error al actualizar';  // Muestra el mensaje de error
        this.mensaje = '';  // Limpia el mensaje de éxito
      }
    });
  }
}
