import {Injectable} from '@angular/core';
import {Model, ModelFactory} from '@angular-extensions/model';
import {TestStatus} from '../models/security-test/test-status';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestStatusService {

  private BASE_URL = 'https://localhost:8443/api/v1';
  private PROJECTS_URL = `${this.BASE_URL}/projects/`;

  private model: Model<TestStatus[]>;
  testStatus$: Observable<TestStatus[]>;

  constructor(private modelFactory: ModelFactory<TestStatus[]>,
              private http: HttpClient) {
    this.model = this.modelFactory.create([]);
    this.testStatus$ = this.model.data$;
  }

  getAllTestStatusOfProject(projectId: string): Observable<TestStatus[]> {
    return this.http.get<TestStatus[]>(this.PROJECTS_URL + projectId + '/status');
  }

  getTestStatusesById(testId: string): Promise<TestStatus[]> {
    return new Promise(resolve => {
      this.http.get<TestStatus[]>(this.PROJECTS_URL + localStorage.getItem('activeProjectId') + '/status/' + testId).subscribe(
        (testStatuses) => {
          testStatuses = this.sortTestStatuses(testStatuses);
          this.model.set(testStatuses);
          return resolve(testStatuses);
        }
      );
    });
  }

  getTestStatusesByIdAsObservable(testId: string): Observable<TestStatus[]> {
    return this.http.get<TestStatus[]>(this.PROJECTS_URL + localStorage.getItem('activeProjectId') + '/status/' + testId);
  }

  sortTestStatuses(testStatuses: TestStatus[]): TestStatus[] {
    return testStatuses.sort((left, right): number => {
      const l = Date.parse(left.created.replace(' - ', ' '));
      const r = Date.parse(right.created.replace(' - ', ' '));
      if (l < r) {
        return 1;
      }
      if (l > r) {
        return -1;
      }
      return 0;
    });
  }

  addTestStatus(testStatus: TestStatus): Promise<boolean> {
    return new Promise(resolve => {
      this.http.post<TestStatus>(this.PROJECTS_URL + localStorage.getItem('activeProjectId') + '/status/' + testStatus.testId, testStatus).subscribe(
        (res) => {
          console.log(res);
          return resolve(true);
        }
      );
    });
  }

  removeTestStatus(testStatusId: string): Promise<boolean> {
    const testStatuses = this.model.get();
    return new Promise(resolve => {
      this.http.delete(this.PROJECTS_URL + localStorage.getItem('activeProjectId') + '/status/' + testStatusId, {observe: 'response'}).subscribe(
        (res) => {
          if (res.status === 200) {
            testStatuses.splice(testStatuses.findIndex(i => i.id === testStatusId), 1);
            this.model.set(testStatuses);
          }
          return resolve(true);
        }
      );
    });
  }

}
