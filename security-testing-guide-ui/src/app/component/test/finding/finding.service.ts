import {Injectable} from '@angular/core';
import {Model, ModelFactory} from '@angular-extensions/model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../../../service/shared.service';
import {Finding} from './finding';

@Injectable({
  providedIn: 'root'
})
export class FindingService {

  private BASE_URL = 'https://localhost:8443/api/v1';
  private PROJECTS_URL = `${this.BASE_URL}/projects`;

  private model: Model<Finding[]>;

  findings$: Observable<Finding[]>;

  constructor(private modelFactory: ModelFactory<Finding[]>,
              private http: HttpClient,
              private sharedService: SharedService) {
    this.model = this.modelFactory.create([]);
    this.findings$ = this.model.data$;
  }

  getAllFindingsForTest(projectId: string, testId: string): Promise<boolean> {
    return new Promise(resolve => {
        this.http.get<Finding[]>(this.PROJECTS_URL + '/' + projectId + '/findings/' + testId).subscribe(
          (findings) => {
            this.model.set(findings);
            resolve(true);
          },
          (error) => {
            resolve(false);
          }
        );
      }
    );
  }

  getAllFindingsForTestReturnData(projectId: string, testId: string): Promise<Finding[]> {
    return new Promise(resolve => {
      this.http.get<Finding[]>(this.PROJECTS_URL + '/' + projectId + '/findings/' + testId).subscribe(
        (findings) => {
          resolve(findings);
        },
        (error) => {
          resolve([]);
        }
      );
    });
  }

  getAllFindingsForTestReturnDataAsObservable(projectId: string, testId: string): Observable<Finding[]> {
      return this.http.get<Finding[]>(this.PROJECTS_URL + '/' + projectId + '/findings/' + testId);
  }

  addFinding(finding: Finding) {
    const findings = this.model.get();
    this.http.post<Finding>(this.PROJECTS_URL + '/' + this.sharedService.projectId + '/findings', finding).subscribe(
      (res) => {
        findings.push(res);
        this.model.set(findings);
      }
    );
  }

  removeFinding(projectId: string, id: string) {
    const findings = this.model.get();
    this.http.delete(this.PROJECTS_URL + '/' + projectId + '/findings/' + id, {observe: 'response'}).subscribe(
      (res) => {
        if (res.status === 204) {
          findings.splice(findings.findIndex(finding => finding.id === id), 1);
          this.model.set(findings);
        }
      }
    );
  }

}
