import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken = new BehaviorSubject<string | null>(null);
  token$ = this.authToken.asObservable();

  constructor(
    private http: HttpClient,
    private _api: ApiService,
    private _router: Router
  ) {
    this.authToken.next(localStorage.getItem('authToken'));
    this.startTokenCheck();
  }
  login(loginForm: any): Observable<any> {
    return this.http.post<any>(this._api.login(), loginForm);
  }
  signInWithHUNEID(): Observable<any> {
    // Throw error, if the user is already logged in
    if (this.isAuthenticated()) {
      return throwError('User is already logged in.');
    }
    this.http.get(this._api.loginWithID()).subscribe((res: any) => {
      console.log('res login: ', res);
      let redirectURL: string = res?.url;
      window.location.href = redirectURL;
    });
    return new Observable();
  }
  setAuthToken(token: string): void {
    this.authToken.next(token);
    // Bạn có thể lưu token vào localStorage hoặc sessionStorage nếu cần
    localStorage.setItem('authToken', token);
  }
  checkTokenExpiration() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const expirationDate = this.getTokenExpirationDate(token);
      const isTokenExpired = expirationDate && expirationDate < new Date();
      if (isTokenExpired) {
        // Xử lý khi token hết hạn, ví dụ: đăng xuất
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  private getTokenExpirationDate(token: string): Date | null {
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  logout() {
    // Xóa token và cập nhật trạng thái đăng nhập
    localStorage.removeItem('authToken');
    this.authToken.next(null);

    this._router.navigate(['login']);
    // Các công việc khác khi đăng xuất
  }
  private startTokenCheck() {
    setInterval(() => {
      this.checkTokenExpiration();
    }, 60000);
  }

  isAuthenticated(): boolean {
    // Kiểm tra xác thực và trả về true nếu đã đăng nhập, ngược lại là false
    if (localStorage.getItem('authToken')) {
      return true;
    }
    return false;
  }
}
