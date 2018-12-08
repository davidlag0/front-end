import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { LayoutService } from '../services/layout.service';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  @ViewChild('drawer') toggleSidenav: MatSidenav;

  constructor(private authService: AuthService,
              public layoutService: LayoutService) {

    this.layoutService.toggleSidenav.subscribe(() => {
      this.toggleSidenav.toggle();
    });
  }

  public toggleSidenavCmd() {
    this.layoutService.toggleSidenav.emit();
  }


  // Could be useful to make the app responsive.
/*
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
  */
}
