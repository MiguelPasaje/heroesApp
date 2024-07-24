import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  GuardResult,
  MaybeAsync,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {
  constructor(private authService: AuthService, private router:Router) {}

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    // console.log('canMatch');
    // console.log(route, segments);

    return this.checkAuthStatus();
    // return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    // console.log('canActivate');
    // console.log(route, state);

    return this.checkAuthStatus();
    // return true;
  }

  private checkAuthStatus(): MaybeAsync<GuardResult> {
    return this.authService.checkAutentication().pipe(
      tap(isAuthenticated => console.log('isAuthenticated',isAuthenticated)),
      tap(isAutenticated =>{
        console.log('isAuthenticated',isAutenticated)
        if (!isAutenticated) this.router.navigate(['./auth/login'])
      })
    )
  }
}
