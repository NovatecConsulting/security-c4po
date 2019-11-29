import {Category} from '../models/security-test/category.enum';

export class ShareState {
  selectedTesterLogo: string;
  testerName: string;

  selectedCategory: Category;

  selectedCustomerLogo: string;
  customerName: string;

  projectName: string;

  customerPermissions: {
    read: boolean,
    comment: boolean
  };

  includeCheckedOnly: boolean;

  /*candidates: {
    name: string,
    votes: number
  }[] = [];*/
}
