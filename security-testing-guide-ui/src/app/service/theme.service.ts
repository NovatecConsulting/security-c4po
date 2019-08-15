import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  private _reduceMotion = new Subject<boolean>();
  isReduceMotion = this._reduceMotion.asObservable();

  setDarkTheme(isDarkTheme: boolean): void {
    console.log('Dark Theme:', isDarkTheme);
    this._darkTheme.next(isDarkTheme);
  }

  setReduceMotion(isReduceMotion: boolean): void {
    this._reduceMotion.next(isReduceMotion);
  }
}
