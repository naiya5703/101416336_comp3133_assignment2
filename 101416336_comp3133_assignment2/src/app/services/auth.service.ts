import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apollo: Apollo) {}

  signup(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation Signup($username: String!, $email: String!, $password: String!) {
          signup(username: $username, email: $email, password: $password) {
            token
          }
        }
      `,
      variables: { username, email, password }
    }).pipe(map((res: any) => res.data.signup.token));
  }

  login(username: string, password: string) {
    return this.apollo.watchQuery({
      query: gql`
        query Login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            token
          }
        }
      `,
      variables: { username, password }
    }).valueChanges.pipe(map((res: any) => res.data.login.token));
  }
}