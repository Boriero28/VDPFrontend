import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/api/employee'; 

  constructor(private http: HttpClient) { }

  loadEmployees(): Observable<any[]> {
    const url = `${this.apiUrl}/load`;
    return this.http.get<any[]>(url);
  }

}
