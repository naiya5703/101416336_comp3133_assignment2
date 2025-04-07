import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe(
        (data: any) => {
          this.employee = data;
          this.loading = false;
        },
        (error: any) => {
          console.error('Error fetching employee details:', error);
          this.errorMessage = 'Error fetching employee details';
          this.loading = false;
        }
      );
    } else {
      this.errorMessage = 'No employee ID provided';
      this.loading = false;
    }
  }
}
