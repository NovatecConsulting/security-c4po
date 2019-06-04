import {Severity} from './severity.enum';

export class Finding {
  id: string;
  testId: string;
  projectId: string;
  title: string;
  created: string;
  severity: Severity;
  description: string;
  reproduction: string;
  impact: string;
  mitigation: string;
  affectedUrls: string;
}
