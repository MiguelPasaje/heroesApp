import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, Route, MaybeAsync, Router, UrlSegment, RouterStateSnapshot } from '@angular/router';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.checkAuthStatus();
  }

  private checkAuthStatus(): MaybeAsync<GuardResult> {
    return this.authService.checkAutentication().pipe(
      tap(isAuthenticated => console.log('isAuthenticated',isAuthenticated)),
      tap(isAutenticated =>{
        console.log('isAuthenticated',isAutenticated)
        if (isAutenticated) this.router.navigate(['./'])
      }),
      map(isAuthenticated => !isAuthenticated)
    )
  }

}
