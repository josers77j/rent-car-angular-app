import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings-layout-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './settings-layout-page.component.html',
})
export class SettingsLayoutPageComponent { }
