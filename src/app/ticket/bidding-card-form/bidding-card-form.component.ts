import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { TicketModel } from 'src/app/shared/ticket-model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { bidMinimumValidator } from './bidding-card-form.validators';

@Component({
  selector: 'app-bidding-card-form',
  templateUrl: './bidding-card-form.component.html',
  styleUrls: ['./bidding-card-form.component.scss']
})
export class BiddingCardFormComponent implements OnInit {
  @Input() ticket:TicketModel;
  @Output() bidWithBidStepEventEmitter = new EventEmitter<void>(); 
  displayBidStep = true;
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder
  ){  }

  ngOnInit(): void{
    //fill up the form with group method (the parameter is an object) of the service 
    this.form = this.fb.group(
      {
        //bid: null
        //bid: [null,Validators.required]
        bid: [null,Validators.compose([
          Validators.required,
          bidMinimumValidator(this.ticket.currentBid + this.ticket.bidStep)
        ])]
      }
    );

    /*this.form.get('bid').valueChanges.subscribe(
      val => console.log('Bid change: ', val)
    );*/
    //Bid change: 2

    /*this.form.valueChanges.subscribe(
      val => console.log('Form change => ', val)
    );*/
    //Form change => {bid: 2}
  }

  testMethod(){
    this.form.addControl('bid2', new FormControl());
  }

  onBidWithBidStepClickEvent() { 
    this.bidWithBidStepEventEmitter.emit(); 
  }
  
  displayBidWithStep($event: Event){
    $event.preventDefault();

    this.displayBidStep = false;
  }

  onSubmit(){
    this.submitted = true;
    //alert("Licitáltak");
    //alert(this.form.value);
    //alert(this.form.valid);
  }
}
