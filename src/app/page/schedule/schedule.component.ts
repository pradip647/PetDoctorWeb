import { Component,NgZone } from '@angular/core';
import {Router} from '@angular/router';

import * as firebase from 'firebase';

@Component({
    moduleId: module.id,
	selector: 'schedule',
	templateUrl: 'schedule.component.html',
	styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent {
/*login:any;
public fireAuth: any;
myappo:any;
appo:any;
*/

userId:any;
allSchedule:any;
reff:any;
appointments:any;



constructor(private router: Router, public zone:NgZone){
	this.appointments=[];
	this.reff = firebase.database().ref('Appointment/');

	firebase.auth().onAuthStateChanged((user) => {
		if(user){
			this.userId = user.uid;
			console.log(this.userId);
			this.loadData();
		}
	});	

/*	this.appo=[];
	//if(localStorage.getItem("success")!="true"){this.router.navigate(['./login']);}
	firebase.auth().onAuthStateChanged((user) => {
	if(user){
		this.userId = user.uid;
	}
	});		
	//var users = firebase.auth().currentUser.uid;
	var ref = firebase.database().ref('/users/' + this.userId);
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
*/
}


  //loadData
  loadData(){
	let ref = firebase.database().ref('/users/' + this.userId);
	 ref.on('value', (snapshot:any) => {      
		if(snapshot.val()){
		   if(snapshot.val().myAppointment){
				this.allSchedule = snapshot.val().myAppointment;	//user appointment lists
				this.reff.once('value', (snap1:any) => {
				   if(snap1.val()){
					   let appointmentlist=snap1.val();	    //all appointments from appointment
					   this.appointments=[];
					   for(let key in appointmentlist){
						   appointmentlist[key].uid=key;
						   for(let i=0 ; i<=this.allSchedule.length;i++){
								if(this.allSchedule[i] == key){
									this.zone.run(()=>{
									   this.appointments.push(appointmentlist[key]);
									})
								}
						   }
					   }
					 //  console.log(this.appointments);
				   }

				});
		   }
		}
	 });

  }

clickme(i){
	alert(i);
}



logout(){
//	this.fireAuth = firebase.auth();
 // var ref= firebase.database().ref('users');
    //  this.fireAuth.signOut();
	  firebase.auth().signOut();
	 // this.router.navigate(['./login']);
	//  localStorage.removeItem("success");
}



}
