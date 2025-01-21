import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';  


@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}
  // Get all users
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Create  new user 
  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // Update an existing user
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  // Delete  user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
