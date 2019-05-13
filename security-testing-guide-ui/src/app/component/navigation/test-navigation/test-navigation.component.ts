import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {GlobalStore} from '../../../store/global.store';

@Component({
  selector: 'app-test-navigation',
  templateUrl: './test-navigation.component.html',
  styleUrls: ['./test-navigation.component.scss']
})
export class TestNavigationComponent implements OnInit {

  title: string;

  constructor(private location: Location,
              private store: GlobalStore) { }

  ngOnInit() {
    this.title = localStorage.getItem('testTitle');
  }

  navigateBack() {
    localStorage.removeItem('testTitle');
    this.store.setProjectName('');
    this.location.back();
  }

}
