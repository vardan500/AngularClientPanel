import { Component, OnInit } from '@angular/core';
import { Settings } from "../../models/Settings";
import { SettingsService } from "../../services/settings.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

settings:Settings;

  constructor(
    private settingsService: SettingsService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit(){

      this.settingsService.changeSettings(this.settings);

    // show message
    this.flashMessage.show('Settings saved', { cssClass:'alert-success', timeout:4000});
  }

}
