import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { Customer } from 'src/app/interfaces/customer';
import { EmployeeService } from 'src/app/services/employee.service';
import { employee } from 'src/app/interfaces/employee';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  employees: employee[] = [];
  selectedReferencePersons: string[] = [];
  registrationForm: FormGroup;

  nomeTitolareError: string | null = null;
  cognomeTitolareError: string | null = null;
  aziendaError: string | null = null;
  emailError: string | null = null;
  dataError: string | null = null;
  oraArrivoError: string | null = null;
  motivoError: string | null = null;
  personaRiferimentoError: string | null = null;
  privacyError: string | null = null;

  @Output() registrationEmit = new EventEmitter<Customer>();
  @Input() registrationErrors: any | null = null;
 
  constructor(private _snackBar: MatSnackBar,
              private dataService: DataService,
              private employeeService: EmployeeService,
              private fb: FormBuilder,
              private route: Router) {
    this.registrationForm = this.fb.group({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      company: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      date: new FormControl(this.getCurrentDate(), [Validators.required]),
      arrivalTime: new FormControl(this.getCurrentTime(), [Validators.required]),
      referencePersons: new FormControl("", [Validators.required]),
      reason: new FormControl("", [Validators.required]),
      notes: new FormControl(""),
      privacy: new FormControl(false, [Validators.requiredTrue])
    });
  }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee(){
    this.employeeService.loadEmployees().subscribe(
      (data)=>{
        this.employees=data;
      },
      (error)=>{
        console.error(error);
      }
    )
  }

  sendEmail(){
    if(this.registrationForm.value.referencePersons.valid){
      this.dataService.sendEmail(this.registrationForm.value.referencePersons!).subscribe()
    }
  }

  emitRegistration(){
    // Rimuovi eventuali errori precedenti
    this.clearErrors();

    if (this.registrationForm.valid) {
      let registrationPayload: Customer = {
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        company: this.registrationForm.value.company,
        email:this.registrationForm.value.email,
        date: this.registrationForm.value.date,
        arrivalTime: this.registrationForm.value.arrivalTime,
        departureTime: this.registrationForm.value.departureTime,
        referencePersons: this.registrationForm.value.referencePersons,
        reason: this.registrationForm.value.reason,
        notes: this.registrationForm.value.notes
      };
      this.registrationEmit.emit(registrationPayload);
      this.registrationForm.reset();
    } else {
      this.setValidationErrors();
    }
  }

  onReferencePersonsChange(event: MatSelectChange) {
    this.selectedReferencePersons = event.value;
  }

  // Funzione per ottenere la data corrente nel formato "YYYY-MM-DD"
  getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Mese inizia da 0
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Funzione per ottenere l'ora corrente nel formato "HH:mm"
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Rimuovi eventuali errori di validazione precedenti
  clearErrors(): void {
    this.nomeTitolareError = null;
    this.cognomeTitolareError = null;
    this.aziendaError = null;
    this.emailError = null;
    this.dataError = null;
    this.oraArrivoError = null;
    this.personaRiferimentoError = null;
    this.motivoError = null;
    this.privacyError = null;
  }

  // Imposta gli errori di validazione sui campi del form
  setValidationErrors(): void {
    this.nomeTitolareError = this.registrationForm.get('firstName')?.hasError('required') ? '*' : null;
    this.cognomeTitolareError = this.registrationForm.get('lastName')?.hasError('required') ? '*' : null;
    this.aziendaError = this.registrationForm.get('company')?.hasError('required') ? '*' : null;
    this.emailError = this.registrationForm.get('email')?.hasError('required') ? '*' : null;
    this.dataError = this.registrationForm.get('date')?.hasError('required') ? '*' : null;
    this.oraArrivoError = this.registrationForm.get('arrivalTime')?.hasError('required') ? '*' : null;
    this.personaRiferimentoError = this.registrationForm.get('referencePersons')?.hasError('required') ? '*' : null;
    this.motivoError = this.registrationForm.get('reason')?.hasError('required') ? '*' : null;
    this.privacyError = this.registrationForm.get('privacy')?.hasError('requiredTrue') ? 'Devi accettare la privacy' : null;
  }

  send(){
    this.dataService.sendEmail(this.registrationForm.value.referencePersons).subscribe(
      res=>{
       this._snackBar.open("Email sent successfully", "Ok",  {
          duration: 3000,
        })
      },
      err=>{
       this._snackBar.open(err.error.message, "Ok",  {
          duration: 3000,
        })
      }
      
      )
    }
}









