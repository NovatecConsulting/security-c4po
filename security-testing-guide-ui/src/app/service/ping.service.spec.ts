import { TestBed } from '@angular/core/testing';

import { PingService } from './ping.service';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('PingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule, MatSnackBarModule ],
    providers: [ PingService ]
  }));

  it('should be created', () => {
    const service: PingService = TestBed.get(PingService);
    expect(service).toBeTruthy();
  });
});
