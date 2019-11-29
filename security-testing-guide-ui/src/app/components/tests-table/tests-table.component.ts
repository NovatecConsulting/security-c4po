import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category} from '../../models/security-test/category.enum';
import {Finding} from '../../models/security-test/finding';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router';
import {SecurityTestService} from '../../services/security-test.service';
import {forkJoin, Observable, observable, Subscription} from 'rxjs';
import {FindingService} from '../../services/finding.service';
import {TestStatus} from '../../models/security-test/test-status';
import {TestStatusService} from '../../services/test-status.service';

@Component({
  selector: 'app-tests-table',
  templateUrl: './tests-table.component.html',
  styleUrls: ['./tests-table.component.scss']
})
export class TestsTableComponent implements OnInit, OnDestroy {

  isLoading = true;

  displayedColumns: string[] = ['id', 'title', 'status', 'findings'];

  subscription: Subscription;

  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private router: Router,
              private securityTestService: SecurityTestService,
              private findingService: FindingService,
              private testStatusService: TestStatusService) {
  }

  ngOnInit() {
    // this.securityTestService.getAllSecurityTestsByCategory(Category[localStorage.getItem('selectedCategory')]).then(securityTests => {
    //   console.log(securityTests);
    //   this.isLoading = false;
    //   this.dataSource.data = securityTests;
    // });

    this.subscription = this.securityTestService.securityTests$.subscribe(
      (securityTests) => {

        this.isLoading = true;

        const self = this;

        /*
        function promisesFunction(_securityTests): Promise<any> {
          const promises_array: Array<any> = [];
          for (const securityTest of _securityTests) {
            promises_array.push(new Promise(function (resolve, reject) {
              self.findingService.getAllFindingsForTestReturnData(localStorage.getItem('activeProjectId'), securityTest.id).then(findings => {
                console.log(findings);
              });
            }));
          }
          return Promise.all(promises_array);
        }

        promisesFunction(securityTests).then(x => {
            console.log('promisesFunction done!');
          }
        );
        */

        const findingsObservables: any = [];
        const testStatusesObservables: any = [];

        const promise = getFindingsAndStatuses(securityTests);
        promise.then((securityTestsWithFindings) => {
          // console.log('isLoading: ', this.isLoading);
          // this.isLoading = false;
          // console.log(securityTestsWithFindings);
          // self.dataSource.data = securityTestsWithFindings;
        });

        async function getFindingsAndStatuses(_securityTests): Promise<SecurityTestWithFindingsAndStatuses[]> {
          const securityTestsWithFindingsAndStatuses: SecurityTestWithFindingsAndStatuses[] = [];
          for (const securityTest of _securityTests) {
            const securityTestWithFindingsAndStatuses = securityTest as SecurityTestWithFindingsAndStatuses;
            findingsObservables.push(self.findingService.getAllFindingsForTestReturnDataAsObservable(localStorage.getItem('activeProjectId'), securityTest.id));
            testStatusesObservables.push(self.testStatusService.getTestStatusesByIdAsObservable(securityTest.id));

            /*
            self.findingService.getAllFindingsForTestReturnData(localStorage.getItem('activeProjectId'), securityTest.id).then(findings => {
              console.log('findings for', securityTest.id, findings);
              securityTestWithFindingsAndStatuses.findings = findings;
            });
            self.testStatusService.getTestStatusesById(securityTest.id).then(testStatuses => {
              console.log('testStatuses for', securityTest.id, testStatuses);
              securityTestWithFindingsAndStatuses.statuses = testStatuses;
            });
            */
            securityTestsWithFindingsAndStatuses.push(securityTestWithFindingsAndStatuses);
          }

          forkJoin(findingsObservables).subscribe(
            (data) => {
              const findings: Finding[][] = data as Finding[][];
              // console.log('findings', findings);
              securityTestsWithFindingsAndStatuses.forEach((item, index) => {
                item.findings = findings[index];
              });
            }
          );

          forkJoin(testStatusesObservables).subscribe(
            (data) => {
              const testStatuses: TestStatus[][] = data as TestStatus[][];
              // console.log('testStatuses', testStatuses);
              securityTestsWithFindingsAndStatuses.forEach((item, index) => {
                item.statuses = testStatuses[index];
              });
              self.dataSource.data = securityTestsWithFindingsAndStatuses;
              self.isLoading = false;
            }
          );

          // console.log('securityTestsWithFindingsAndStatuses', securityTestsWithFindingsAndStatuses);
          return securityTestsWithFindingsAndStatuses;
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  testClicked(test) {
    console.log('clicked: ', test);
    localStorage.setItem('testId', test.id);
    localStorage.setItem('testTitle', test.title);
    this.router.navigate(['/projects', localStorage.getItem('activeProjectId'), test.id]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

export class SecurityTestWithFindingsAndStatuses {
  id: string;
  category: Category;
  title: string;
  description: string;
  link: string;
  findings: Finding[];
  statuses: TestStatus[];
}
