import { Component} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';


@Component({
    moduleId: module.id,
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls: ['./home.component.css'],
	
})

export class HomeComponent {
login:any;
public fireAuth: any;
myappo:any;
appo:any;

constructor(private router: Router){
	this.appo=[];
	if(localStorage.getItem("success")!="true"){this.router.navigate(['./login']);}
		
	var users = firebase.auth().currentUser.uid;
	var ref = firebase.database().ref('/users/' + users);
	 ref.on('value', (snapshot:any) => {        
		if(snapshot.val()){
			this.myappo=snapshot.val().myAppointment
			console.log(this.myappo);
			var reff = firebase.database().ref('Appointment/');
			reff.on('value', (snapshot:any) => {        
				if(snapshot.val()){
				let appointmentlist=snapshot.val();
				for (var key in appointmentlist) 
				{ 
					appointmentlist[key].uid=key;
					
					for(var i=0 ; i<=this.myappo.length;i++){
						if(this.myappo[i]==appointmentlist[key].uid){
							this.appo.push(appointmentlist[key]);
						}
					}
					
				}
				console.log(this.appo);
				}
			});
			
		}
	});

	

        
	
}

logout(){
	this.fireAuth = firebase.auth();
  var ref= firebase.database().ref('users');
      this.fireAuth.signOut();
	  this.router.navigate(['./login']);
	  localStorage.removeItem("success");
}

}