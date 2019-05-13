import { Injectable } from '@angular/core';
import {Model, ModelFactory} from '@angular-extensions/model';
import {Project} from './project';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private BASE_URL = 'https://localhost:8443/api/v1';
  private PROJECTS_URL = `${this.BASE_URL}/projects/`;

  private model: Model<Project>;
  projectDetails$: Observable<Project>;

  constructor(private modelFactory: ModelFactory<Project>,
              private http: HttpClient) {
    this.model = this.modelFactory.create(new Project());
    this.projectDetails$ = this.model.data$;
  }

  getProjectDetailsById(id: string) {
    this.http.get<Project>(this.PROJECTS_URL + id).subscribe(
      (projectDetails) => {
        this.model.set(projectDetails);
      }
    );
  }

}
