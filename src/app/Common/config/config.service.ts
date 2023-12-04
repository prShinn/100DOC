import { Injectable } from '@angular/core';
import { Config } from './config.type';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _config: Config = new Config();
  constructor() {}

  public get config(): Config {
    return this._config;
  }

  public set config(v: Config) {
    this._config = v;
  }
}
