import { createReducer,on } from "@ngrx/store";
import { createUser,editUser,deleteUser } from "../actions/user.action";
import { UserState,initialState } from "./user.state";
import { User } from "../models/user.model";

export const userReducer = createReducer(
    initialState,
    on(createUser, (state, { user }) => ({
      ...state,
      users: [...state.users, user], //Add new user to the users array
    })),

    on(editUser, (state, { id, user }) => ({
      ...state,
      users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
    })), // To update the user by targeting the user by its id field

    on(deleteUser, (state, { id }) => ({
      ...state,
      users: state.users.filter((u) => u.id !== id),
    })), // Delete user by id 

  

  ); 