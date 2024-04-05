import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  formdata:any;

  private apiUrl = 'http://localhost:3000/api/customer';

  constructor(private http: HttpClient) {}

  //stampa customers

  loadCustomers(): Observable<Customer[]> {
    const url = `${this.apiUrl}/all`;
    return this.http.get<Customer[]>(url);
  }

  //filtri customers

  filterCustomers(filters: any): Observable<Customer[]> {
    let url = `${this.apiUrl}/filter`;

    if (filters) {
      let params = new HttpParams();
      for (let key in filters) {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      }
      url += '?' + params.toString();
    }

    return this.http.get<Customer[]>(url);
  }

  //aggiunta customers

  addCustomer(newCustomer: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<Customer>(url, newCustomer)
    .pipe(
      catchError(error => {
        throw error;
      })
    );
  }
  
  //modifica customers

  updateCustomer(customer: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/update/${customer._id}`; // Assicurati che il campo _id sia presente nel tuo oggetto cliente
    return this.http.put<Customer>(url, customer).pipe(
      catchError(error=>{
        throw error;
        })
    );
  }

  //elimina customer

  deleteCustomer(customer: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/delete/${customer._id}`; // Assicurati che il campo _id sia presente nel tuo oggetto cliente
    return this.http.delete<Customer>(url).pipe(
      catchError(error=>{
        throw error;
        })
    );
  }
  
  //settaggio ora uscita

  updateCustomerDepartureTime(email: string, departureTime: string): Observable<Customer> {
    const url = `${this.apiUrl}/departure`;
    return this.http.put<Customer>(url, { email, departureTime })
    .pipe(
      catchError(error => {
        throw error;
      })
    );
    
  }

  //invio email

  sendEmail(email:string){
    const url = `${this.apiUrl}/send`;
    return this.http.post(url,{email:email})
  }
}