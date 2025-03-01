import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginEmployeeComponent } from "./component/login-employee/login-employee.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginEmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vaku_soa';
}
