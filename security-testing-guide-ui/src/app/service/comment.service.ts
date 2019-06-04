import {Injectable} from '@angular/core';
import {Model, ModelFactory} from '@angular-extensions/model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SharedService} from './shared.service';
import {Comment} from '../model/security-test/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private BASE_URL = 'https://localhost:8443/api/v1';
  private PROJECTS_URL = `${this.BASE_URL}/projects`;

  private model: Model<Comment[]>;

  comments$: Observable<Comment[]>;

  constructor(private modelFactory: ModelFactory<Comment[]>,
              private http: HttpClient,
              private sharedService: SharedService) {
    this.model = this.modelFactory.create([]);
    this.comments$ = this.model.data$;
  }

  getAllCommentsForTest(projectId: string, testId: string): Promise<boolean> {
    return new Promise(resolve => {
      // const mockComments = this.generateMockComments(projectId, testId);
      const mockComments = [];
      setTimeout(() => {
        this.model.set(mockComments);
        resolve(true);
      }, mockComments.length * 250);
    });
  }

  generateMockComments(projectId: string, testId: string): Comment[] {
    const mockComments: Comment[] = [];
    const numberOfCommentsGenerated = Math.floor(Math.random() * 10) + 1;
    console.log('creating ', numberOfCommentsGenerated, ' comments ...');
    for (let i = 0; i < numberOfCommentsGenerated; i++) {
      const comment = new Comment();
      comment.id = projectId + '-' + testId + '-' + i;
      mockComments.push(comment);
    }
    return mockComments;
  }

}
