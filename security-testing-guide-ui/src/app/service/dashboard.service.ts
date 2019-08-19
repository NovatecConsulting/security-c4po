import {Injectable} from '@angular/core';
import {Model, ModelFactory} from '@angular-extensions/model';
import {Observable} from 'rxjs';
import {Project} from '../model/project';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private BASE_URL = 'https://localhost:8443/api/v1';
  private PROJECTS_URL = `${this.BASE_URL}/projects/`;

  private model: Model<Project[]>;
  project$: Observable<Project[]>;

  constructor(private modelFactory: ModelFactory<Project[]>,
              private http: HttpClient,
              private router: Router) {
    this.model = this.modelFactory.create([]);
    this.project$ = this.model.data$;
  }

  getAllProjects(): Promise<boolean> {
    return new Promise(resolve => {
      this.http.get<Project[]>(this.PROJECTS_URL).subscribe(
        (projects) => {
          // console.log(projects);
          this.model.set(projects);
          resolve(true);
        },
        (error) => {
          resolve(false);
        });
    });
  }

  addProject(project: Project) {
    const projects = this.model.get();
    this.http.post<Project>(this.PROJECTS_URL, project).subscribe(
      (res) => {
        projects.push(res);
        this.model.set(projects);
      }
    );
  }

  deleteProject(id: string) {
    const projects = this.model.get();
    this.http.delete(this.PROJECTS_URL + id, {observe: 'response'}).subscribe(
      (res) => {
        if (res.status === 200) {
          projects.splice(projects.findIndex(finding => finding.id === id), 1);
          this.model.set(projects);
          this.router.navigate(['/dashboard']);
        }
      }
    );
  }

  clearLoadedProjects() {
    this.model.set([]);
  }

}
