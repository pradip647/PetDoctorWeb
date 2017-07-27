import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as firebase from'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(private router: Router){
         firebase.auth().onAuthStateChanged((user) => {
            if(user){
              this.router.navigate(['/home']);
            }else{
               this.router.navigate(['/login']);
            }
         });     
  }
}



