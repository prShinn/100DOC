import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, timer, map, startWith, finalize, takeWhile } from 'rxjs';
import { ApiService } from 'src/app/Common/api/api.service';
import { AuthService } from 'src/app/Common/auth/auth.service';
const observable = new Observable(function subscribe(observer) {
  const id = setTimeout(() => {
    observer.next('Hello Rxjs');
    observer.complete();
  }, 1000);
});
const subscription = observable.subscribe({
  next: (value) => {
    console.log(value);
  },
  error: (error) => {
    console.log(error);
  },
  complete: () => {
    console.log('Done');
  },
});

setTimeout(() => {
  subscription.unsubscribe();
}, 500);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userIdChangeAfterFiveSeconds = 0;

  constructor(
    private _api: ApiService,
    private _http: HttpClient,
    private _router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.loopTime(1, 1000);
  }
  getDsCanBo() {
    this._api.getEntity(this._api.getCanBos(), (res: any) => {
      console.log('resCanbo: ', res);
    });
  }
  getDsPhong() {
    this._api.getEntity(this._api.getPhongBans(), (res: any) => {
      console.log('resPhongBans: ', res);
    });
  }

  time$: Observable<number> = timer(0, 1000).pipe(
    map((val) => {
      if (val > 0 && val % 60 == 0) {
        this.userIdChangeAfterFiveSeconds++;
      }
      return 0 + (val + 1);
    }), // vòng lặp
    startWith(5),
    finalize(() => {
      //khi đáp ứng điều kiện kết thúc

      this.userIdChangeAfterFiveSeconds = 0;
    }),
    takeWhile((val) => val >= 0) //điều kiện để kết thúc
  );
  ////////////////////////////////////////
  clearToken() {
    this.authService.logout();
  }
  loopTime(val: any, timeLoop: any) {
    let loop = setInterval(() => {
      val++;
      if (val >= 10) {
        clearInterval(loop);
      }
    }, timeLoop);
  }
}
