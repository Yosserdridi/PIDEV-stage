import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UserService } from 'src/app/services/users.service';

interface User {
  id?: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  password?: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  displayDialog: boolean = false;
  isNewUser: boolean = false;

  // Role options for selection
  roleOptions = [
    { label: 'User', value: 'ROLE_USER' },
    { label: 'Admin', value: 'ROLE_ADMIN' }
  ];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => this.users = data,
      (error) => this.showMessage('error', 'Error', 'Failed to fetch users')
    );
  }

  openCreateDialog() {
    this.selectedUser = {
      id: 0,
      username: '',
      email: '',
      roles: [],
      password: ''
    };
    this.isNewUser = true;
    this.displayDialog = true;
  }

  editUser(user: User) {
    this.selectedUser = user ? { ...user } : null;
    this.isNewUser = false;
    this.displayDialog = true;
  }

  deleteUser(id: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(id).subscribe(() => {
          this.showMessage('success', 'Success', 'User deleted');
          this.loadUsers();
        }, () => {
          this.showMessage('error', 'Error', 'Failed to delete user');
        });
      }
    });
  }

  saveUser() {
    if (this.isNewUser) {
      this.userService.createUser(this.selectedUser!).subscribe({
        next: () => {
          this.showMessage('success', 'Success', 'User created');
          this.loadUsers();
          this.displayDialog = false;
        },
        error: () => this.showMessage('error', 'Error', 'Failed to create user')
      });
    } else if (this.selectedUser!.id) {
      this.userService.updateUser(this.selectedUser!.id, this.selectedUser!).subscribe({
        next: () => {
          this.showMessage('success', 'Success', 'User updated');
          this.loadUsers();
          this.displayDialog = false;
        },
        error: () => this.showMessage('error', 'Error', 'Failed to update user')
      });
    }
  }

  showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
