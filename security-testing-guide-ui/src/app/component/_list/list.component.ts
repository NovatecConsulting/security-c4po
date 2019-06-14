import { Component, OnInit, ViewChild} from '@angular/core';
import { SecurityTest } from '../../model/security-test/security-test';
import { ApiService } from '../../service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotesDialogComponent } from '../dialog/notes-dialog/notes-dialog.component';
import { InfoDialogComponent } from '../dialog/info-dialog/info-dialog.component';
import { SharedService } from '../../service/shared.service';

// @Component({
//   selector: 'app-list',
//   templateUrl: './list.component.html',
//   styleUrls: ['./list.component.css']
// })
export class ListComponent implements OnInit {

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

  categoryMapKeys: string[];
  dataSourceMap: Map<string, MatTableDataSource<SecurityTest>>;
  displayedColumns = ['id', 'title',]; // 'checked', 'notes', 'info'];

  @ViewChild(MatSort) sort: MatSort;

  data_AUTHN = null;
  dataSource_AUTHN = new MatTableDataSource();

  constructor(private apiService: ApiService,
              private sharedService: SharedService,
              private notesDialog: MatDialog,
              private infoDialog: MatDialog) { }

  ngOnInit() {
    this.apiService.getAllByCategory('AUTHN').subscribe(
      (data) => {
        this.data_AUTHN = data;
        this.dataSource_AUTHN.data = this.data_AUTHN;
      }
    );
    this.dataSource_AUTHN.sort = this.sort;

    this.categoryMapKeys = Array.from(this.categoryMap.keys());
    this.dataSourceMap = this.createDataSourceMap(this.categoryMapKeys);

    console.log(this.dataSourceMap);

    /* TODO: sorting is done server side (until MatTableSource can be sorted) */
    /*this.dataSourceMap.forEach(e => {
      console.log('----------------------');
      this.tempDataSource = e;
      console.log('Before sorting ...', this.tempDataSource);
      this.tempDataSource.sortingDataAccessor = (item, property) => {
        console.log(item);
        console.log(property);
        switch (property) {
          case 'testNumber': return item.testNumber;
          default: return item[property];
        }
      };
      this.tempDataSource.sort = this.sort;
      console.log('After sorting.', this.tempDataSource);
    });*/
  }

  createDataSourceMap(categories: string[]) {
    return new Map(categories.map(v => [v, this.getDataSource(v)] as [string, MatTableDataSource<SecurityTest>]));
  }

  countUnchecked(category: string) {
    return this.dataSourceMap.get(category).data.length - this.countChecked(category);
  }

  countChecked(category: string) {
    // console.log('countChecked(\'' + category + '\')');
    // return this.dataSourceMap.get(category).data.filter(v => v.checked).length;
    return 9000;
  }

  countAllChecked() {
    let checked = 0;
    this.categoryMapKeys.forEach(v => {
      checked += this.countChecked(v);
    });
    this.sharedService.checked = checked;
  }

  getDataSource(category: string) {
    console.log('getDataSource(\'' + category + '\')');
    const matTableDataSource = new MatTableDataSource<SecurityTest>();
    this.apiService.getAllByCategory(category).subscribe(
      (data) => {
        matTableDataSource.data = data;
      }
    );
    return matTableDataSource;
  }

  editNotes(testNumber: string) {
    const dialogRef = this.notesDialog.open(NotesDialogComponent, {
      width: '40%',
      height: '60%',
      data: {
        testNumber: testNumber
      },
      panelClass: 'custom'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('Notes closed unchanged.');
      } else {
        console.log('Notes have changed.', result);
        console.log(result);

        const category = testNumber.substring(4, testNumber.indexOf('-', 4));

        const data = this.dataSourceMap.get(category).data;
        const index = data.map((v) => v['testNumber']).indexOf(testNumber);
        data.splice(index, 1);
        data.splice(index, 0, result);
        this.dataSourceMap.get(category).data = data;
      }
    });
  }

  checkTest(item: SecurityTest) {
    this.apiService.updateTest(item).subscribe(
      (response) => {
        if (response.status === 200) {
          console.log('Checked statusMap updated.');
        } else {
          console.log(response);
        }
      }
    );
    this.countAllChecked();
  }

  showInfo(testNumber: string) {
    this.infoDialog.open(InfoDialogComponent, {
      width: '40%',
      height: '60%',
      data: {
        testNumber: testNumber
      }
    });
  }

}
