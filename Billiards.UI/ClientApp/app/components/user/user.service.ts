import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { IUser } from './user.model';
import { ConfigurationService } from '../common/configuration.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'})
}

@Injectable()
export class UserService{
    currentUser: IUser;
    baseUrl: string;

    constructor(private http: HttpClient, private config: ConfigurationService){
        this.baseUrl = config.baseUrl;
    }

    getUsers() : Observable<IUser[]> {
        return this.http.get(this.baseUrl + 'User/GetUsers').catch(this.handleError);
    }

    getUser(id: number){
        return this.http.get(this.baseUrl + 'User/GetUser?id=' + id).catch(this.handleError);
    }

    addUser(user: any){
        let body = JSON.stringify(user);
        return this.http.post(this.baseUrl + 'User/SaveUser', body, httpOptions).catch(this.handleError);
    }

    deleteUser(user: any){
        let body = JSON.stringify(user);
        return this.http.post(this.baseUrl + 'User/DeleteUser', body, httpOptions).catch(this.handleError);
    }

    getUnlinkedAccounts() {
        return this.http.get(this.baseUrl + 'User/GetUnlinkedAccounts').catch(this.handleError);
    }

    saveLinkedAccount(linkedAccount : any) {
        return this.http.post(this.baseUrl + 'User/SyncAccounts', linkedAccount, httpOptions).catch(this.handleError);
    }

    private handleError(error:any){
        console.log('HTTP ERROR: ' + error);
        return Observable.throw(error.statusText);
    }
}