import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../service/shared.service';
import {GlobalStore} from '../../../store/global.store';
import {Category} from '../../../model/security-test/category.enum';
import {SecurityTestService} from '../../../service/security-test.service';

@Component({
  selector: 'app-category-navigation',
  templateUrl: './category-navigation.component.html',
  styleUrls: ['./category-navigation.component.scss']
})
export class CategoryNavigationComponent implements OnInit {

  index: number;

  categoryMap = new Map([
    ['INFO', 'Information Gathering'],
    ['CONFIG', 'Configuration and Deployment Management Testing'],
    ['IDENT', 'Identity Management Testing'],
    ['AUTHN', 'Authentication Testing'],
    ['AUTHZ', 'Authorization Testing'],
    ['SESS', 'Session Management Testing'],
    ['INPVAL', 'Input Validation Testing'],
    ['ERR', 'Error Handling'],
    ['CRYPST', 'Cryptography'],
    ['BUSLOGIC', 'Business Logic Testing'],
    ['CLIENT', 'Client Side Testing']
  ]);

  categories: string[] = Array.from(this.categoryMap.keys());

  constructor(private sharedService: SharedService,
              private store: GlobalStore,
              private securityTestService: SecurityTestService) {
  }

  ngOnInit() {
    let selectedCategory: Category = Category[localStorage.getItem('selectedCategory')];

    if (typeof selectedCategory === 'undefined') {
      selectedCategory = Category.INFO;
    }

    console.log('localStorage[selectedCategory]: ', selectedCategory);
    this.index = Category[SecurityTestService.categoryToString(selectedCategory)];
    this.setCategory(selectedCategory);
  }

  setCategory(category: Category) {
    localStorage.setItem('selectedCategory', SecurityTestService.categoryToString(category));
    this.store.setSelectedCategory(category);
    // console.log('localStorage[selectedCategory]:', localStorage.getItem('selectedCategory'), '; store[selectedCategory]:', category);
    this.securityTestService.getAllSecurityTestsByCategory(category);
  }

  setIndex(index: number) {
    this.index = index;
  }

}
