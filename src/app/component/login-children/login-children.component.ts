import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { CredencialesChildren } from './credencialesChildren';
import { LoginChildrenService } from '../../login-children.service';
import { error } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-children',
  imports: [FormsModule],
  templateUrl: './login-children.component.html',
  styleUrl: './login-children.component.css'
})
export class LoginChildrenComponent {

  credenciales:CredencialesChildren = new CredencialesChildren();

  constructor(private loginChildrenService: LoginChildrenService,private router: Router) {}

  logeearse(){
    this.loginChildrenService.loginChildren(this.credenciales).subscribe({
      next:(dato)=>{
        console.log('Respuesta completa del backend:', dato);
      },
      error:(error:any)=>{
        console.log('Error en la petición:', error);
      },
    });
  }

  navigateToLoginemployee() {
    this.router.navigate(['/login-employee']);
  }
}

