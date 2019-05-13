import {Injectable} from '@angular/core';
import {Category} from '../model/security-test/category.enum';
import {Model, ModelFactory} from '@angular-extensions/model';
import {SecurityTest} from '../model/security-test/security-test';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const initialData: SecurityTest[] = [
  // {id: 'initId', title: 'initTitle', description: '', category: Category.INFO, link: ''}
];

@Injectable({
  providedIn: 'root'
})
export class SecurityTestService {

  private model: Model<SecurityTest[]>;
  securityTests$: Observable<SecurityTest[]>;

  constructor(private modelFactory: ModelFactory<SecurityTest[]>,
              private http: HttpClient) {
    this.model = modelFactory.create(initialData);
    this.securityTests$ = this.model.data$;
  }

  private BASE_URL = 'https://localhost:8443/api/v1';
  private SECURITY_TESTS_URL = this.BASE_URL + '/tests';

  public static categoryToString(category: Category) {
    let c: string;
    if (typeof category === 'number') {
      c = Category[category];
    } else {
      c = category;
    }
    return c;
  }

  getAllSecurityTestsByCategory(category: Category): Promise<SecurityTest[]> {
    const cat = SecurityTestService.categoryToString(category);
    return new Promise(resolve => {
        this.http.get<SecurityTest[]>(this.SECURITY_TESTS_URL, {params: {category: cat}}).subscribe(
          (securityTests) => {
            this.model.set(securityTests);
            return resolve(securityTests);
          },
          (error) => {
            console.log(error);
            return resolve([]);
          }
        );
      }
    );
  }

}
