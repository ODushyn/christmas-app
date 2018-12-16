import { Component } from '@angular/core';
import { greetings } from './greetings-config.const';
import { EmbedVideoService } from 'ngx-embed-video/dist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  passcode: string;
  greeting: string;
  bodyText: string;
  iframe_html: string;
  error = false;
  authorized = false;
  notChristYet = false;


  constructor(private embedVideoService: EmbedVideoService) {

  }

  passcodeSubmit() {
    const config = greetings[this.passcode];
    if (config) {
      this.authorized = true;
      if (this.isChristmasAlready() || this.passcode === 'core-renewal') {
        this.greeting = config.name;
        this.iframe_html = this.embedVideoService.embed(config.video,
          {query: {portrait: 0, color: '333'}, attr: {width: 760, height: 415}}
        );
      } else {
        this.notChristYet = true;
        if (config.lang === 'en') {
          this.greeting = 'Hello, ' + config.name;
          this.bodyText = 'We would like to wish you Merry Christmas here. ' +
            'However, Christmas has not come yet. Be patient and come back on December 25th! :)';
        } else {
          this.greeting = 'Привіт, ' + config.name;
          this.bodyText = 'Ми хочемо привітати тут з Різдвом та Новий Роком! ' +
            'Але Різдво, ще не настало... Трошки терпіння і чекаємо назад 25 грудня! :)';
        }
      }
    } else {
      this.error = true;
    }
  }

  isChristmasAlready(): boolean {
    const date = new Date();
    return date.getFullYear() > 2018 || (date.getDate() > 24 && date.getMonth() === 11 && date.getFullYear() === 2018);
  }

  onMainPage() {
    this.authorized = false;
    this.notChristYet = false;
    this.error = false;
  }
}
