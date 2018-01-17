import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BilliardsService } from './billiards.service';
import { IUser } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: './create-match.component.html',
    styles: [`
        em {float: right; color: #E05C65; padding-left: 10px; }
    `]
})

export class CreateMatchComponent implements OnInit{
    Date: string;
    users: IUser[] = [];
    User1Id: number = 0;
    hasUser1IdError: boolean = false;
    User2Id: number = 0;
    hasUser2IdError: boolean = false;

    constructor(private billiardsService: BilliardsService,
        private userService: UserService,
        private router: Router){
    }

    ngOnInit(){
        this.userService.getUsers().subscribe(
            data => {
                this.users = data
            }, 
            error => {
                console.log('ERROR: Error getting users')
            }
        );
    }

    validateUser1(value: number) {
        if (value > 0)
            this.hasUser1IdError = false;
        else
            this.hasUser1IdError = true;
    }

    validateUser2(value: number) {
        if (value > 0)
            this.hasUser2IdError = false;
        else
            this.hasUser2IdError = true;
    }

    isFormInvalid() {
        return this.User1Id == 0 || this.User2Id == 0;
    }

    saveMatch(formValues: any){
        this.billiardsService.addMatch(formValues).subscribe(
            data => {
                this.router.navigate(['/matches', data.MatchId])
            }
        );
    }
}