import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet, NavbarComponent],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
