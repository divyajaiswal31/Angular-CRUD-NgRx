import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { User } from '../../store/models/user.model';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() user: User = {
    first_name: '', last_name: '', email: '', avatar: '',
    id: 0
  };
  @Input() isEdit: boolean = false; // To differentiate between Add and Edit
  @Output() formSubmit = new EventEmitter<User>();
  @Output() cancelAction = new EventEmitter<void>();

  submitForm(): void {
    if (this.user.first_name && this.user.last_name && this.user.email) {
      this.formSubmit.emit(this.user);
    } else {
      alert('All fields are required.');
    }
  }

  cancel(): void {
    this.cancelAction.emit();
  }

} 
