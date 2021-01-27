import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl;
  }

  serverUrl: string = "";

  get(url): Promise<any> {
    const options = {};
    return this.http.get(this.serverUrl + url, options).toPromise();
  }

  post(url: string, body: any): Promise<any> {
    return this.http.post(this.serverUrl + url, body).toPromise();
  }
}
