import {Injectable} from '@angular/core';
import {Category} from '../models/security-test/category.enum';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  public selectedTesterLogo: string;
  public testerName: string;
  public selectedCustomerLogo: string;
  public projectName: string;
  public customerName: string;

  public projectId: string;

  public checked = 0;
  private total = 90;
  public canComment = false;

  public selectedCategory: Category;

  constructor() {
    this.selectedCategory = Category.INFO;
  }

  get getSelectedTesterLogo(): string {
    return this.selectedTesterLogo;
  }

  get getTesterName(): string {
    return this.testerName;
  }

  get getSelectedCustomerLogo(): string {
    return this.selectedCustomerLogo;
  }

  get getCustomerName(): string {
    return this.customerName;
  }

  get getProjectName(): string {
    return this.projectName;
  }

  get getChecked(): number {
    return this.checked;
  }

  get getTotal(): number {
    return this.total;
  }

  get getCanComment(): boolean {
    return this.canComment;
  }

  // get getSelectedCategory(): string {
  //   return this.selectedCategory.toString();
  // }

}
