import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { LoadTodosComponent } from './components/load-todos/load-todos.component';
import { ManagementComponent } from './pages/management/management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddDepartureComponent } from './components/add-departure/add-departure.component';
import { EditCustomerModalComponent } from './components/edit-customer-modal/edit-customer-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NotFoundComponent,
    NavUserComponent,
    LoadTodosComponent,
    ManagementComponent,
    RegistrationFormComponent,
    AddDepartureComponent,
    EditCustomerModalComponent,
    
  ],
  imports: [
    CommonModule ,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
