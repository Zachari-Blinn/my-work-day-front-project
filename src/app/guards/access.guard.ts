import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AccessGuard {
  public constructor(private storageService: StorageService) {}
  
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const requiresLogin = route.data['requiresLogin'] || false;
    if (requiresLogin) {
      const isLoggedIn = this.storageService.isLoggedIn();
      if (!isLoggedIn) {
        return false;
      }
    }
    return true;
  }
}