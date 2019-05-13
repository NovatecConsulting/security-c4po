import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityTest } from '../model/security-test/security-test';
import { Project } from '../component/project/project';
import { TestStatus } from '../component/test/test-status/test-status';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'https://localhost:8443/api/v1';
  private TESTS_URL = `${this.BASE_URL}/tests`;
  private PROJECTS_URL = `${this.BASE_URL}/projects`;

  constructor(private http: HttpClient) { }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(this.PROJECTS_URL + '/' + id);
  }

  getAllByCategory(category: string): Observable<SecurityTest[]> {
    return this.http.get<SecurityTest[]>(this.TESTS_URL,
      {
        params: {
          category: category
        }
      });
  }

  getAllResultsForProject(projectId: string): Observable<TestStatus[]> {
    return this.http.get<TestStatus[]>(this.PROJECTS_URL + '/' + projectId + '/status');
  }

  getTestByTestNumber(testNumber: string): Observable<SecurityTest> {
    return this.http.get<SecurityTest>(this.TESTS_URL + '/' + testNumber);
  }

  updateTest(item: SecurityTest): Observable<any> {
    return this.http.patch<any>(this.TESTS_URL + '/' + item.id, item, { observe: 'response' });
  }

}
