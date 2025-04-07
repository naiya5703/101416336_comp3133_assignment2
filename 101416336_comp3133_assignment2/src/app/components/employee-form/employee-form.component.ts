import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: string;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.employeeId;

    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required]
    });

    if (this.isEditMode) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe(
        (emp: any) => this.employeeForm.patchValue(emp),
        error => console.error(error)
      );
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      // Optionally handle file upload if your backend supports it.
      if (this.isEditMode) {
        this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe(
          () => this.router.navigate(['/employees']),
          error => console.error(error)
        );
      } else {
        this.employeeService.addEmployee(employeeData).subscribe(
          () => this.router.navigate(['/employees']),
          error => console.error(error)
        );
      }
    }
  }
}
