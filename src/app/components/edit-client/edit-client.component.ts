import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnEdit: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingsService:SettingsService
  ) { }


  ngOnInit(): void {

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;

    //Get if from URL
    this.id = this.route.snapshot.params['id'];
    //Get Client
    this.clientService.getClient(this.id).subscribe(
      client => {
        this.client = client;
      });
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {

    if (!valid) {
      this.flashMessage.show('Error in form', { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      value.id = this.id;
      this.clientService.updateClient(value);
      this.flashMessage.show('Client updated successfully', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/client/' + this.id]);
    }

  }

}