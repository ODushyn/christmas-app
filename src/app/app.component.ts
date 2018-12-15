import { Component, OnInit } from '@angular/core';
import { greetings } from './greetings-config.const';
import { EmbedVideoService } from 'ngx-embed-video/dist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  passcode = 'core-renewal';
  name: string;
  iframe_html: string;
  authorized = false;


  constructor(private embedVideoService: EmbedVideoService) {

  }


  passcodeSubmit() {
    const config = greetings[this.passcode];
    if (config) {
      this.authorized = true;
      this.name = config.name;
      this.iframe_html = this.embedVideoService.embed(config.video,
        {query: {portrait: 0, color: '333'}, attr: {width: 760, height: 415}}
      );
    }
  }
}
