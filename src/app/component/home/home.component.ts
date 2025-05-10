import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterOutlet],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
