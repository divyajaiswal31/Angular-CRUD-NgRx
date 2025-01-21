
import { User } from '../models/user.model';

export interface UserState {
  users: User[]; // List of users
  selectedUser: User | null; // For editing or viewing details
  loading: boolean; // API loading status
  error: string | null; // Error handling
  searchTerm : string
}

export const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
 searchTerm : ''
};


