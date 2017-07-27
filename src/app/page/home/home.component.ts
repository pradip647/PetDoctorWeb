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
userId:any;

constructor(private router: Router){
	console.log("home working...")
/*	this.appo=[];
	//if(localStorage.getItem("success")!="true"){this.router.navigate(['./login']);}
	firebase.auth().onAuthStateChanged((user) => {
		if(user){
			this.userId = user.uid;
		}
	});	

	//var users = firebase.auth().currentUser.uid;
	var ref = firebase.database().ref('/users/' + this.userId);
	ref.on('value', (snapshot:any)=>{        
		if(snapshot.val()){
			this.myappo=snapshot.val().myAppointment
			console.log(this.myappo);
			var reff = firebase.database().ref('Appointment/');
			reff.on('value', (snapshot:any) => {        
				if(snapshot.val()){
					let appointmentlist=snapshot.val();
					for (var key in appointmentlist){ 
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

	
*/
        
	
}


goAppointment(){
	this.router.navigate(['./schedule'])
}

logout(){
      this.fireAuth.signOut();
}

}