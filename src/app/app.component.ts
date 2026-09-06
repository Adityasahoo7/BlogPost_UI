import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlogPost_UI';


   showNavbar = true;
  private hideOn = ['/login', '/register', '/'];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.showNavbar = !this.hideOn.includes(e.urlAfterRedirects.split('?')[0]);
      });
  }
}
