import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginChildrenComponent } from './component/login-children/login-children.component';
import { LoginEmployeeComponent } from './component/login-employee/login-employee.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, LoginChildrenComponent, LoginEmployeeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'vaku_soa';
}