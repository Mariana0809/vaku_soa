import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-children',
  imports: [],
  templateUrl: './login-children.component.html',
  styleUrl: './login-children.component.css'
})
export class LoginChildrenComponent {
  constructor(private router: Router) {
  }

  navigateToLoginemployee() {
    this.router.navigate(['/login-employee']);
  }
}
