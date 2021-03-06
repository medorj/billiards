import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';
import { BilliardsModule } from './components/billiards/billiards.module';
import { UserModule } from './components/user/user.module';
import { LoginModule } from './components/login/login.module';

import { AppComponent } from './components/app/app.component';
import { AboutComponent, HomeComponent } from './components/home/index';
import { Error404Component } from './components/errors/404.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import {
    // components
    NavMenuComponent,
    // services
    ConfigurationService,
    // route guards
    AuthenticationRouteActivator
} from './index';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        AboutComponent,
        Error404Component,
        StatisticsComponent
    ],
    imports: [
        SharedModule,
        BilliardsModule,
        UserModule,
        LoginModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '404', component: Error404Component },
            { path: 'home', component: HomeComponent },
            { path: 'home/about', component: AboutComponent },
            { path: 'stats', component: StatisticsComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [ConfigurationService, AuthenticationRouteActivator]
})
export class AppModuleShared {
}
