import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';  // Import provideHttpClient
import { provideStore } from '@ngrx/store';
import { userReducer } from './app/store/reducers/user.reducer';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(),provideStore({user: userReducer})]  // Add HttpClient provider and register the user Reducer
})
.catch(err => console.error(err));
