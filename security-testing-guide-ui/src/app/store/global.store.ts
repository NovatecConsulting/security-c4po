import {Store} from './store';
import {Injectable} from '@angular/core';
import {ShareState} from '../services/share-state';
import {Category} from '../models/security-test/category.enum';

@Injectable()
export class GlobalStore extends Store<ShareState> {

  constructor() {
    super(new ShareState());
    this.setTesterLogo('cyan');
    this.setTesterName('NovaTester');
    this.setCustomerLogo('e_corp');
    this.setCustomerName('E Corp');
    this.setPermissions({read: true, comment: false});
    this.setIncludeCheckedOnly(true);
    this.setSelectedCategory(Category.INFO);
    console.log('GLOBAL STORE STATE: ', this.state);
  }

  setTesterLogo(color: string): void {
    this.setState({
      ...this.state,
      selectedTesterLogo: color
    });
  }

  setTesterName(name: string): void {
    this.setState({
      ...this.state,
      testerName: name
    });
  }

  setCustomerLogo(name: string): void {
    this.setState({
      ...this.state,
      selectedCustomerLogo: name
    });
  }

  setCustomerName(name: string): void {
    this.setState({
      ...this.state,
      customerName: name
    });
  }

  setProjectName(name: string): void {
    this.setState({
      ...this.state,
      projectName: name
    });
  }

  setPermissions(permissions: {read: boolean, comment: boolean}): void {
    this.setState({
      ...this.state,
      customerPermissions: permissions
    });
  }

  setIncludeCheckedOnly(includeCheckedOnly: boolean): void {
    this.setState({
      ...this.state,
      includeCheckedOnly: includeCheckedOnly
    });
  }

  setSelectedCategory(category: Category): void {
    // console.log('GLOBAL STORE CATEGORY: ', Category[category]);
    this.setState({
      ...this.state,
      selectedCategory: category
    });
  }

  /*addVote (candidate: {name: string, votes: number}): void {
    this.setState({
      ...this.state,
      candidates: this.state.candidates.map(c => {
        if (c === candidate) {
          return {...c, votes: c.votes + 1};
        }
        return c;
      })
    });
  }

  addCandidate (name: string): void {
    this.setState({
      ...this.state,
      candidates: [...this.state.candidates, {name: name, votes: 0}]
    });
  }*/

}
