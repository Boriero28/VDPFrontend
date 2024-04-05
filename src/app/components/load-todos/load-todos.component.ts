import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { Customer } from 'src/app/interfaces/customer';
import { EmployeeService } from 'src/app/services/employee.service';
import { employee } from 'src/app/interfaces/employee';
import { EditCustomerModalComponent } from '../edit-customer-modal/edit-customer-modal.component';

@Component({
  selector: 'app-load-todos',
  templateUrl: './load-todos.component.html',
  styleUrls: ['./load-todos.component.css']
})

export class LoadTodosComponent implements OnInit{
  employees: employee[] = [];
  customers: Customer[] = [];

  filterModalRef: NgbModalRef | undefined;
  filters: any = {};

  @ViewChild('filterModal', { static: false }) filterModal?: TemplateRef<any>;

  constructor(private employeeService: EmployeeService, private dataservice: DataService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadCustomer();
    this.getEmployee();
  }

  loadCustomer(): void {
    this.dataservice.loadCustomers().subscribe(
      (data) => {
        this.customers = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openFilterModal(): void {
    this.filterModalRef = this.modalService.open(this.filterModal, { centered: true, size: 'lg' });
  }

  applyFilters(filters:any) {
    // Verifica se i campi del filtro non contengono solo spazi vuoti
    if (Object.values(filters).some((value: any) => (value as string).trim() !== '')) {
      this.dataservice.filterCustomers(filters).subscribe(
        (data) => {
          this.customers = data;
          this.filterModalRef?.close();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.loadCustomer();
      this.filterModalRef?.close(); 
    }
  }

  clearFilters(): void {
    this.filters = {
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      date: '',
      referencePersons: ''
  };
    if (this.filterModalRef) {
      this.filterModalRef.close();
    }
    
    this.loadCustomer();
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

  openEditModal(customer: Customer): void {
    const modalRef = this.modalService.open(EditCustomerModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.customer = customer; 
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadCustomer(); 
      }
    }, (reason) => {
      console.log('Modal closed with reason: ', reason);
       this.loadCustomer();
    });
  }


}
