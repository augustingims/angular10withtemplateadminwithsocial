import { Injectable } from '@angular/core';
import {ModuleConfig} from '../util/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  CONFIG_OPTIONS: ModuleConfig;

  constructor(moduleConfig?: ModuleConfig) {
    this.CONFIG_OPTIONS = {
      ...new ModuleConfig(),
      ...moduleConfig
    };
  }

  getConfig(): ModuleConfig {
    return this.CONFIG_OPTIONS;
  }
}
