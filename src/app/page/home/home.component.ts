import { Component,NgZone} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';


@Component({
    moduleId: module.id,
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls: ['./home.component.css'],
	
})

export class HomeComponent {
userId:any;
allSchedule:any;
reff:any;
appointments:any;
doctorname:any;
data:any;
status:any;
treatmentstatus:boolean;
constructor(private router: Router, public zone:NgZone){
	console.log("home working...")
	this.appointments=[];
	this.reff = firebase.database().ref('appointment/');

	firebase.auth().onAuthStateChanged((user) => {
		if(user){
			this.userId = user.uid;
			console.log(this.userId);
			this.loadData();
		}
	});	
        	
}


loadData(){
	let ref = firebase.database().ref('/users/' + this.userId);
	 ref.on('value', (snapshot:any) => {      
		if(snapshot.val()){
			this.doctorname=snapshot.val().name;
			this.status=snapshot.val().status;
			
		   if(snapshot.val().myAppointment){
				this.allSchedule = snapshot.val().myAppointment;
				this.reff.once('value', (snap1:any) => {
				   if(snap1.val()){
					   let appointmentlist=snap1.val();
					   this.appointments=[];
					   for(let key in appointmentlist){
						   appointmentlist[key].uid=key;
						   appointmentlist[key].species="dog";			   
						   for(let i=0 ; i<=this.allSchedule.length;i++){
								if(this.allSchedule[i] == key){
									this.zone.run(()=>{
									   this.appointments.push(appointmentlist[key]);
									})
								}
						   }
					   }
					  console.log(this.appointments); 
				   }

				});
		   }
		}
	 });

  }

teatment(index){
	let x =this.appointments[index];
	console.log(x.status);
	if(x.status){
		this.router.navigate(['/schedule',{petuserid:x.uid,petid:x.petid,status:x.status}]);
	}
	else{
	this.router.navigate(['/schedule',{petuserid:x.uid,petid:x.petid}]);
	}

}

logout(){
 firebase.auth().signOut();
}

}