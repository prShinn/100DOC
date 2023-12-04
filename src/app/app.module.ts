import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestPipeComponent } from './modules/test-pipe/test-pipe.component';
import {
  HttpClient,
  provideHttpClient,
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthInterceptor } from './Common/auth/auth.interceptor';
import { ConfigService } from './Common/config/config.service';
import { Config } from './Common/config/config.type';
function initializeFunction(
  httpClient: HttpClient,
  configService: ConfigService
): () => Observable<Config> {
  return () =>
    httpClient
      .get<Config>('/assets/json/config.json?v=' + new Date().getTime())
      .pipe(tap((config) => (configService.config = config)));
}
@NgModule({
  declarations: [AppComponent, TestPipeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFunction,
      deps: [HttpClient, ConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
