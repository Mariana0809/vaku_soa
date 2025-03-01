import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginChildrenComponent } from './login-children/login-children.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoginChildrenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vaku_soa';
}
