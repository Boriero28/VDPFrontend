import { Component } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FontService } from 'src/app/services/font.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  { 
  constructor(private dataService:DataService,private route:Router, private _snackBar: MatSnackBar,private fontSrv: FontService){}

  formatErrorMessage(errorMessage:string){
    const parts = errorMessage.split(',');
    const formattedMessage = parts.join(',\n'); 
    return formattedMessage;
  }

  doRegistration(registrationData:Customer){
   
    this.dataService.addCustomer(registrationData).subscribe(
      (res) => {
        this._snackBar.open("User "+ res.firstName +" in successfully", "OK",  {
            duration: 3000,
          });

        this.route.navigateByUrl("/home")
      },
      (err) => {
        this._snackBar.open(this.fontSrv.capitalize(this.formatErrorMessage(err.error.message)), "OK");
        }
    );

    
      
    }
}


