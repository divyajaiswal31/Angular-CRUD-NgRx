
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UserState } from "../reducers/user.state";


//feature selector for the slice of the state.
export const selectUserState = createFeatureSelector<UserState>('user');

//Selectors for the specific state properties.


export const selectAllUser = createSelector(
    selectUserState,(state) => state.users
);

export const selectLoading = createSelector(
    selectUserState,(state)=>state.loading
);

export const selectError = createSelector(
    selectUserState,(state)=>state.error
)

