import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  public resourceUrl = SERVER_API_URL + 'api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}`);
  }
}
