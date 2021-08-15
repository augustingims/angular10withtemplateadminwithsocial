import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import {createRequestOption, IAuthority} from '../../shared';

@Injectable({ providedIn: 'root' })
export class AuthorityService {
  public resourceUrl = SERVER_API_URL + 'api/authorities';

  constructor(private http: HttpClient) {}

  create(authority: IAuthority): Observable<HttpResponse<IAuthority>> {
    return this.http.post<IAuthority>(this.resourceUrl, authority, { observe: 'response' });
  }

  update(authority: IAuthority): Observable<HttpResponse<IAuthority>> {
    return this.http.put<IAuthority>(this.resourceUrl, authority, { observe: 'response' });
  }

  find(id: string): Observable<HttpResponse<IAuthority>> {
    return this.http.get<IAuthority>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<IAuthority[]>> {
    const options = createRequestOption(req);
    return this.http.get<IAuthority[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
