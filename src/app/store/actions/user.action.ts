import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

//Creating the actions for the crud


export const createUser = createAction(
    '[User] Create User',
    props<{ user: User }>() 
    //props are used to define the additional metadata to performing the actions 
  );

  export const editUser = createAction(
    '[User] Edit User',
    props<{ id: number; user: Partial<User> }>() // ID and partial user details to update
  );
  
  // Delete a user action
  export const deleteUser = createAction(
    '[User] Delete User',
    props<{ id: number }>() // Payload for the user ID to delete
  );


  