﻿import { Component } from '@angular/core';
import { IUser } from '../user/user.model';
import { UserService } from '../user/user.service';
import { BilliardsService } from '../billiards/billiards.service';
import { IGame } from '../billiards/match.model';

@Component({
    templateUrl: './statistics.component.html'
})

export class StatisticsComponent {
    player1Users: IUser[] = [];
    player1: number = 0;
    player2Users: IUser[] = [];
    player2: number = 0;
    compareData: any;
    enable: boolean = false;
    isLoading: boolean = false;
    isLoadingComparison: boolean = false;
    games: IGame[] = [];

    constructor(private userService: UserService, private billiardsService: BilliardsService) { }

    ngOnInit() {
        this.isLoading = true;
        this.userService.getUsers().subscribe(data => {
            this.player1Users = data;
            this.player2Users = data;
            this.isLoading = false;
        });
    }

    enableCompare(p1: number, p2: number) {
        this.enable = p1 > 0 && p2 > 0;
    }

    compare(p1: number, p2: number) {
        this.player1 = p1;
        this.player2 = p2;
        this.isLoadingComparison = true;
        this.billiardsService.getHeadToHead(p1, p2).subscribe(data => {
            this.compareData = data;
            this.isLoadingComparison = false;
        });
        this.billiardsService.getHeadToHeadGames(p1, p2).subscribe((data: IGame[]) => {
            this.games = data;
        });
    }
}