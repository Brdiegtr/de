import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'node:path';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MiperfilComponent } from './componentes/miperfil/miperfil.component';
import { ModificarperfilComponent } from './componentes/modificarperfil/modificarperfil.component';
import { UploadComponent } from './componentes/upload/upload.component';
import { ImagenesdetallesComponent } from './componentes/imagenesdetalles/imagenesdetalles.component';
import { HomesinloguearComponent } from './componentes/homesinloguear/homesinloguear.component';

export const routes: Routes = [
  {
    path: '',
    component: HomesinloguearComponent,
  },
  {
    path: 'homeexplore',
    component: HomesinloguearComponent,
  }
  ,
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'Miperfil',
    component: MiperfilComponent,
  },
  {
    path: 'Modificarperfil',
    component: ModificarperfilComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
  },
  {
    path: 'detalle/:id',
    component: ImagenesdetallesComponent
  }

];
