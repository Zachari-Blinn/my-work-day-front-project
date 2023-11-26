import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AccessGuard {
  public constructor(private storageService: StorageService, private router: Router) {}
  
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const requiresLogin = route.data['requiresLogin'] || false;
    if (requiresLogin) {
      const isLoggedIn = this.storageService.isLoggedIn();
      if (!isLoggedIn) {
        console.log('AccessGuard: canActivate: user is not logged in');
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true;
  }
}