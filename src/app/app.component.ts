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
              var useId = firebase.auth().currentUser.uid;
                      var ref = firebase.database().ref('/users/' + useId)
                      ref.on('value', (snapshot:any) => {      
                      if(snapshot.val()){
                              console.log(snapshot.val());
                              if(snapshot.val().type == "user"){
                                alert("You are not a Doctor");
                                firebase.auth().signOut();       
                              }
                              else{
                                this.router.navigate(['/home']);
                              }
                      }
                      })
            }else{
               this.router.navigate(['/login']);
            }
         });     
  }
}

  