import {Role} from './role.enum';
import {UserClaims} from '@okta/okta-angular';

export interface User {
  claims: UserClaims;
  role: Role;
  token: string;
}
