import {TestProgress} from './test-progress.enum';

export class TestStatus {
  id: string;
  testId: string;
  testProgress: TestProgress;
  created: string;


  constructor(testId: string, testProgress: TestProgress) {
    this.testId = testId;
    this.testProgress = testProgress;
  }
}
