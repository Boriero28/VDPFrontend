import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { FontService } from 'src/app/services/font.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-departure',
  templateUrl: './add-departure.component.html',
  styleUrls: ['./add-departure.component.css']
})
export class AddDepartureComponent implements OnInit {
  updateDepartureForm: FormGroup;
  emailError: string | null = null;

  constructor(private fb: FormBuilder, private dataservice: DataService, private _snackBar: MatSnackBar,private fontSrv: FontService) {
    this.updateDepartureForm = this.fb.group({
      email:new FormControl("", [Validators.required,Validators.email]), 
      departureTime: new FormControl(this.getCurrentTime(), [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  formatErrorMessage(errorMessage:string){
    const parts = errorMessage.split(',');
    const formattedMessage = parts.join(',\n'); 
    return formattedMessage;
  }

  updateDepartureTime(): void {
    this.emailError=null;

    if (this.updateDepartureForm.valid) {
      const { email, departureTime } = this.updateDepartureForm.value;
      this.dataservice.updateCustomerDepartureTime(email, departureTime)
      .subscribe(
        (res) => {
          if (res) {
            this._snackBar.open("User " + res.firstName + " updated successfully", "OK", {
              duration: 3000,
            });
          } else {
            this._snackBar.open("No customer found with the provided email for today", "OK", {
              duration: 3000,
            });
          }
        },
        (err) => {
          this._snackBar.open(this.fontSrv.capitalize(this.formatErrorMessage(err.error.message)), "OK");
        }
      );
    }
    else{
      this.emailError = this.updateDepartureForm.get('email')?.hasError('required') ? '*' : null;
    }
  }

  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
