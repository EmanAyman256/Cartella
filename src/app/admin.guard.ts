import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from './models/Token.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAccess implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean|UrlTree>
  | Promise<boolean>
  | boolean |UrlTree
  {

    return this.authService.user.pipe(take(1),map(user=>{
        if(!user)
        {
            this.router.createUrlTree(['/login'])
        }
        const token = localStorage.getItem('userToken');
        if(token)
        {
            const decodedToken:CustomJwtPayload=jwtDecode(token)
            const TokenID=decodedToken?.id
            if(TokenID==="66ddc1ef1edf433558a01258")
            {
                return true;

            }
            else{
                return this.router.createUrlTree(['/signup']);

            }
        }
        return this.router.createUrlTree(['/login']);

                
    }));
    
  }
}