import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apollo: Apollo) { }

  // Fetch all employees
  getEmployees() {
    const GET_EMPLOYEES_QUERY = gql`
      query {
        getAllEmployees {
          _id
          first_name
          last_name
          email
          designation
          department
          salary
          date_of_joining
          employee_photo
        }
      }
    `;
    return this.apollo.watchQuery({
      query: GET_EMPLOYEES_QUERY
    }).valueChanges.pipe(map((result: any) => result.data.getAllEmployees));
  }

  // Fetch one employee by ID
  getEmployeeById(id: string) {
    const GET_EMPLOYEE_QUERY = gql`
      query($id: ID!) {
        searchEmployeeById(id: $id) {
          _id
          first_name
          last_name
          email
          gender
          designation
          department
          salary
          date_of_joining
          employee_photo
        }
      }
    `;
    return this.apollo.watchQuery({
      query: GET_EMPLOYEE_QUERY,
      variables: { id }
    }).valueChanges.pipe(map((result: any) => result.data.searchEmployeeById));
  }

  // Add a new employee
  addEmployee(employee: any) {
    const ADD_EMPLOYEE_MUTATION = gql`
      mutation(
        $first_name: String!,
        $last_name: String!,
        $email: String!,
        $gender: String!,
        $designation: String!,
        $salary: Float!,
        $date_of_joining: String!,
        $department: String!,
        $employee_photo: String
      ) {
        addEmployee(
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          gender: $gender,
          designation: $designation,
          salary: $salary,
          date_of_joining: $date_of_joining,
          department: $department,
          employee_photo: $employee_photo
        ) {
          _id
          first_name
          last_name
        }
      }
    `;
    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE_MUTATION,
      variables: employee
    }).pipe(map((result: any) => result.data.addEmployee));
  }

  // Update an existing employee
  updateEmployee(id: string, employee: any) {
    const UPDATE_EMPLOYEE_MUTATION = gql`
      mutation(
        $id: ID!,
        $first_name: String,
        $last_name: String,
        $email: String,
        $designation: String,
        $salary: Float,
        $department: String
      ) {
        updateEmployee(
          id: $id,
          first_name: $first_name,
          last_name: $last_name,
          email: $email,
          designation: $designation,
          salary: $salary,
          department: $department
        ) {
          _id
          first_name
          last_name
        }
      }
    `;
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE_MUTATION,
      variables: { id, ...employee }
    }).pipe(map((result: any) => result.data.updateEmployee));
  }

  // Delete an employee
  deleteEmployee(id: string) {
    const DELETE_EMPLOYEE_MUTATION = gql`
      mutation($id: ID!) {
        deleteEmployee(id: $id)
      }
    `;
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE_MUTATION,
      variables: { id }
    }).pipe(map((result: any) => result.data.deleteEmployee));
  }

  // Search employees by designation and/or department
  searchEmployees(filter: { designation?: string; department?: string; }) {
    const SEARCH_EMPLOYEES_QUERY = gql`
      query($designation: String, $department: String) {
        searchEmployeeByDesignation(designation: $designation, department: $department) {
          _id
          first_name
          last_name
          email
          designation
          department
        }
      }
    `;
    return this.apollo.watchQuery({
      query: SEARCH_EMPLOYEES_QUERY,
      variables: filter
    }).valueChanges.pipe(map((result: any) => result.data.searchEmployeeByDesignation));
  }
}
