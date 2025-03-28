import { Component, OnInit } from '@angular/core';
import { ListUserResponse, User } from '../../models/listUser';
import { UserListService } from '../../user-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = []; // Cambia el tipo a User[], no ListUserResponse
  loading = true;

  constructor(private userListService: UserListService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userListService.listUser().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }
}