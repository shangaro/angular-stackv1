import { Component } from '@angular/core';
import { FrameworkConfigService, IFrameworkConfigSettings } from '../services/FrameworkConfig';
import {library} from "@fortawesome/fontawesome-svg-core";
import { faTwitter, faFacebook, faLinkedin, faGooglePlus } from '@fortawesome/free-brands-svg-icons';
library.add(faTwitter,faFacebook,faLinkedin,faGooglePlus);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private frameworkConfigService:FrameworkConfigService){
    let config:IFrameworkConfigSettings={
      socialIcons:[
        {imageFile:faFacebook,alt:'Facebook',link:"https://www.facebook.com"},
        {imageFile:faTwitter,alt:'Twitter',link:"https://www.twitter.com"},
        {imageFile:faGooglePlus, alt:'Google',link:'https://www.google.com'},
        {imageFile:faLinkedin,alt:'Linkedin',link:'https://www.linkedin.com'}
      ],
      showLanguageSelector:false,
      showUserControls:true,
      showStatusBarBreakpoint:800
    };
    frameworkConfigService.configure(config);
  }
}
