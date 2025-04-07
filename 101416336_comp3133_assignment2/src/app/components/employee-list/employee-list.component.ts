import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  searchDesignation = '';
  searchDepartment = '';

  constructor(private employeeService: EmployeeService, public router: Router) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(
      data => this.employees = data,
      error => console.error(error)
    );
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => this.loadEmployees(),
        error => console.error(error)
      );
    }
  }

  searchEmployees() {
    this.employeeService.searchEmployees({
      designation: this.searchDesignation,
      department: this.searchDepartment
    }).subscribe(
      data => this.employees = data,
      error => console.error(error)
    );
  }
}
 