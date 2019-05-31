import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'; 
import {AuthInterceptor} from './shared/auth-interceptor'; 
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AlertModule, CollapseModule} from 'ngx-bootstrap';
import {NavbarComponent} from './core/navbar/navbar.component';
import {JumbotronComponent} from './core/jumbotron/jumbotron.component';
import {EventcardComponent} from './event/eventcard/eventcard.component';
import {FooterComponent} from './core/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {EventService} from './shared/event.service';
import {UserService} from './shared/user.service';
import {TicketService} from './shared/ticket.service';
import {LoggedInGuard} from './shared/logged-in.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TicketDetailsCardComponent } from './ticket/ticket-details-card/ticket-details-card.component';
import { BiddingCardComponent } from './ticket/bidding-card/bidding-card.component';
import { MomentModule } from 'angular2-moment';
import 'moment/locale/hu';
import { BiddingCardFormComponent } from './ticket/bidding-card-form/bidding-card-form.component';
import { LoadingSpinnerComponent } from './core/loading-spinner/loading-spinner.component'; 
import { BidService } from './shared/bid.service';
import * as firebase from 'firebase';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    EventcardComponent,
    FooterComponent,
    ...AppRoutingModule.routableComponents,
    TicketDetailsCardComponent,
    BiddingCardComponent,
    BiddingCardFormComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    AppRoutingModule,
    AlertModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MomentModule,
    ReactiveFormsModule
  ],
  providers: [
    EventService, 
    UserService, 
    TicketService, 
    LoggedInGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    BidService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    firebase.initializeApp(environment.firebase);
  }
}
