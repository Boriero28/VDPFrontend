import { Component, Input,OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Customer } from 'src/app/interfaces/customer';
import { employee } from 'src/app/interfaces/employee';


@Component({
  selector: 'app-edit-customer-modal',
  templateUrl: './edit-customer-modal.component.html',
  styleUrls: ['./edit-customer-modal.component.css']
})
export class EditCustomerModalComponent implements OnInit{
  employees: employee[] = [];


  @Input() customer!: Customer; 

  constructor(public activeModal: NgbActiveModal, private dataService: DataService,private employeeService: EmployeeService) {}

  ngOnInit(): void {
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

  updateCustomer(): void {
    this.dataService.updateCustomer(this.customer).subscribe(
      (data) => {
        this.activeModal.close('success'); 
      },
      (error) => {
        console.error(error);

      }
    );
  }

  deleteCustomer(): void {
    this.dataService.deleteCustomer(this.customer).subscribe(
      (data) => {
        this.activeModal.close('success'); 
      },
      (error) => {
        console.error(error);

      }
    );
  }
}
