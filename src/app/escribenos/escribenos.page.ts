import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';



@Component({
  selector: 'app-escribenos',
  templateUrl: './escribenos.page.html',
  styleUrls: ['./escribenos.page.scss'],
})
export class EscribenosPage implements OnInit {

  email = "alvarocabezasdev@gmail.com";

  constructor(public emailComposer: EmailComposer
            ) { }

  ngOnInit() {
  }
  
  enviarEmail(){
   
   let email = {
     to: this.email,
     subject: 'Ayuda!!',
     isHtml: true
   };
   
   // Send a text message using default options
   this.emailComposer.open(email);
  }


}
