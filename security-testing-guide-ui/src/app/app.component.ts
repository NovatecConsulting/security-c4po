import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ThemeService} from './service/theme.service';

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isDarkTheme: Observable<boolean>;

  constructor(private themeService: ThemeService) {
    particlesJS.load('particles-js', 'assets/particles.json', null);
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    // this.isDarkTheme = of(true); // TODO: hard-coded (always dark)
  }

}
