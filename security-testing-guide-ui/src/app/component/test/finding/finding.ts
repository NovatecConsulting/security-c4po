import {Severity} from '../../../model/severity.enum';

export class Finding {
  id: string;
  testId: string;
  title: string;
  severity: Severity;
  description: string;
  reproduction: string;
  impact: string;
  mitigation: string;
  affectedUrls: string;
}
