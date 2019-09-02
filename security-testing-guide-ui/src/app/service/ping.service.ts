import { Injectable } from '@angular/core';
import {interval, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {sample} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  backendUrl = 'https://localhost:8443/api/v1/projects';
  isBackendReachable: Observable<boolean>;

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) {
    console.log('Starting backend ping service ...');

  const observable = new Observable((observer) => {
    interval(2000).subscribe(() => {
      this.http.get(this.backendUrl, {observe: 'response'}).subscribe((response) => {
        observer.next(response.status);
      }, () => {
        observer.next('unreachable');
      });
    });
  });

  observable.pipe(sample(interval(10000))).subscribe((val) => {
    console.log('Backend status:', val);
    snackBar.open('Backend ' + val, 'DISMISS', {
      duration: 5000
    });
    this.isBackendReachable = val === 'unreachable' ? of(false) : of(true);
  });

  }
}
