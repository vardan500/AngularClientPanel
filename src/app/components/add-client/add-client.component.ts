import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from "../../services/client.service";

import { Client } from '../../models/Client';
import { Router } from '@angular/router';

import { Settings } from "../../models/Settings";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd: boolean = true;
  @ViewChild('clientForm') form: any;

  constructor(private flashMessage:FlashMessagesService, 
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
    ) { }

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {

    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      this.flashMessage.show('Please fill out form correctly', { cssClass:'alert-danger', timeout:4000});
    } else {
      //Add a new client
      this.clientService.newClient(value);

      // show message
      this.flashMessage.show('Client added successfully', { cssClass:'alert-success', timeout:4000});

      //redirect to dash
      this.router.navigate(['/']);
    }
  }

}
