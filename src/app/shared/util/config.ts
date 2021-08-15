import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModuleConfig {
  i18nEnabled ? = false;
  defaultI18nLang ? = 'en';
  noi18nMessage ? = 'translation-not-found';
  alertAsToast ? = false;
  alertTimeout ? = 5000;
  classBadgeTrue ? = 'badge badge-success';
  classBadgeFalse ? = 'badge badge-danger';
  classTrue ? = 'fa fa-lg fa-check text-success';
  classFalse ? = 'fa fa-lg fa-times text-danger';
}
