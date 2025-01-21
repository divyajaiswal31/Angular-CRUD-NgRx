import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { createUser, editUser, deleteUser } from '../../store/actions/user.action';
import { User } from '../../store/models/user.model';
import { UserServiceService } from '../../store/services/user-service.service';
import { UserFormComponent } from "../user-form/user-form.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-list',  
  templateUrl: './user-list.component.html',
  standalone: true,
  styleUrls: ['./user-list.component.css'],
  imports: [FormsModule,UserFormComponent,CommonModule]
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  loading = true;
  error = '';
  showForm = false;
  isEditMode = false;
  selectedUser: User = { first_name: '', last_name: '', email: '', avatar: '' };
  
 

  constructor(private userService: UserServiceService, private store: Store) {}

  ngOnInit(): void {
    this.loadUsers();
     
  }
 

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response.data;
        this.loading = false;
      },
      (error) => {  
        this.error = 'Failed to load users';
        this.loading = false;
      }
    );
  }



  openAddForm(): void {
    this.selectedUser = { first_name: '', last_name: '', email: '', avatar: '' };
    this.isEditMode = false;
    this.showForm = true;
  }

  openEditForm(user: User): void {
    this.selectedUser = { ...user };
    this.isEditMode = true;
    this.showForm = true;
  }


  // handleFormSubmit(user: User): void {
  //   if (this.isEditMode) {
  //     this.userService.updateUser(user.id!, user).subscribe(
  //       () => {
  //         alert('User updated successfully!');
  //         this.loadUsers(); // Reload the user list
  //       },
  //       (error) => {
  //         alert('Failed to update user.');
  //         console.error(error);
  //       }
  //     );
  //   } else {
  //     this.userService.addUser(user).subscribe(
  //       () => {
  //         alert('User created successfully!');
  //         this.loadUsers(); // Reload the user list
  //       },
  //       (error) => {
  //         alert('Failed to create user.');
  //         console.error(error);
  //       }
  //     );
  //   }
  //   this.closeForm();
  // }
  // closeForm(): void {
  //     this.showForm = false;
  //   }

 //NORMAL CALL FOR THE API 
  // handleFormSubmit(user: User): void {
  //   if (this.isEditMode) {
  //     this.store.dispatch(editUser({ id: user.id!, user }));
  //   } else {
  //     this.store.dispatch(createUser({ user }));
  //   }
  //   alert(this.isEditMode ? 'User updated successfully!' : 'User created successfully!');
  //   this.closeForm();
  // }
  // closeForm():void {
  //   this.showForm = false;
  // }
  
//PERFORMING THE POST AND PUT OPERATIONS FOR THE API CALL 
  handleFormSubmit(user: User): void {
    if (this.isEditMode) {
      this.userService.updateUser(user.id!, user).subscribe(
        (updatedUser) => {
          this.store.dispatch(editUser({ id: user.id!,user: updatedUser }));
          alert('User updated successfully!');
          this.loadUsers();
        },
        (error) => {
          console.error('Error updating user:', error);
          alert('Failed to update user.');
        }
      );
    } else {
      this.userService.addUser(user).subscribe(
        (newUser) => {
          this.store.dispatch(createUser({ user: newUser }));
          alert('User created successfully!');
          // this.loadUsers();
        },
        (error) => {
          console.error('Error creating user:', error);
          alert('Failed to create user.');
        }
      );
    }
    this.closeForm();
  }
  
  closeForm():void{
this.showForm=false
  }

  //NORMAL DELETE CALL FOR THE API DATA 
  // deleteUser(id: number | undefined): void {
  //   if (id === undefined) {
  //     alert('User ID is undefined. Cannot delete.');
  //     return;
  //   }
  
  
  //   this.userService.deleteUser(id).subscribe(() => {
  //     alert('User deleted successfully');
  //     this.loadUsers(); // Reload the user list after deletion
  //   });
  // }
  deleteUser(id: number | undefined): void {
    if (id === undefined) {
      alert('User ID is undefined. Cannot be deleted!');
      return;
    }
  
    //  confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
  
    if (isConfirmed) {
      this.userService.deleteUser(id).subscribe(() => {
        this.store.dispatch(deleteUser({ id }));
        alert('User Deleted Successfully!');
        this.loadUsers();
      });
    }
  }
  

 
  


  
}
