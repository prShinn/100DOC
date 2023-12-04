import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _configService: ConfigService,
    private _http: HttpClient
  ) {}
  safe(endpoint: string) {
    let safe = endpoint;
    safe = safe.replaceAll('//', '/');
    if (safe.startsWith('/')) {
      safe = safe.substring(1);
    }
    return safe;
  }
  api(endpoint: string): string {
    return `${this._configService.config.API_URL}/${this.safe(endpoint)}`;
  }

  urlApi(endpoint: string): string {
    return this.api(`/api/${this.safe(endpoint)}`);
  }
  getEntity(url: string, successFunc?: any, errorFunc?: any) {
    this._http
      .get(url)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (res) => {
          if (successFunc) {
            successFunc(res);
          }
        },
        (err) => {
          if (errorFunc) {
            errorFunc(err);
          }
        }
      );
  }
  postEntity(url: string, paramBody?: any, successFunc?: any, errorFunc?: any) {
    this._http
      .post(url, paramBody)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (res) => {
          if (successFunc) {
            successFunc(res);
          }
        },
        (err) => {
          if (errorFunc) {
            errorFunc(err);
          }
        }
      );
  }
  putEntity(url: string, paramBody?: any, successFunc?: any, errorFunc?: any) {
    this._http
      .put(url, paramBody)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (res) => {
          if (successFunc) {
            successFunc(res);
          }
        },
        (err) => {
          if (errorFunc) {
            errorFunc(err);
          }
        }
      );
  }
  deleteEntity(url: string, successFunc?: any, errorFunc?: any) {
    this._http
      .delete(url)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (res) => {
          if (successFunc) {
            successFunc(res);
          }
        },
        (err) => {
          if (errorFunc) {
            errorFunc(err);
          }
        }
      );
  }
  login() {
    return this.urlApi(`OAuth/login`);
  }
  loginWithID() {
    return this.urlApi(
      `/OAuth/LoginWithID?returnUrl=http%3A%2F%2Flocalhost%3A8888%2Fdashboard`
    );
  }
  getCanBos() {
    return this.urlApi(`CanBos`);
  }
  getPhongBans() {
    return this.urlApi(`PhongBans`);
  }
  createPhongBans() {
    return this.urlApi(`PhongBans`);
  }
  updatePhongBans(id?: string) {
    return this.urlApi(`PhongBans/${id}`);
  }
}
