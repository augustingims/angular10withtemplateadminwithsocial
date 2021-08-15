import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Audit, createRequestOption, Pagination} from '../../shared';
import {SERVER_API_URL} from '../../app.constants';


export interface AuditsQuery extends Pagination {
  fromDate: string;
  toDate: string;
}

@Injectable({ providedIn: 'root' })
export class AuditsService {
  constructor(private http: HttpClient) {}

  query(req: AuditsQuery): Observable<HttpResponse<Audit[]>> {
    const params: HttpParams = createRequestOption(req);

    const requestURL = SERVER_API_URL + 'management/audits';

    return this.http.get<Audit[]>(requestURL, {
      params,
      observe: 'response',
    });
  }
}
