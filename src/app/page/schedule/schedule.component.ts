import { Component,NgZone } from '@angular/core';
import {Router,ActivatedRoute, Params, Data} from '@angular/router';

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
doctorname:any;
gdata:any;
date:any;
purposeofvisit:any;
sickness:any;
treatment:any;
petuserid:any;
petid:any;
treatmentlist:any;
treatmentslist:any;
status:any;
button:any;
constructor(private router: Router, public zone:NgZone,public route: ActivatedRoute){
	this.petuserid=this.route.snapshot.params['petuserid'] ;
	this.petid=this.route.snapshot.params['petid'] ;
	if(this.status!="" || this.status!= undefined){
     this.status=this.route.snapshot.params['status'] ; 
	}
	
	
    this.appointments=[];
	this.reff = firebase.database().ref('Appointment/');
	firebase.auth().onAuthStateChanged((user) => {
		if(user){
			this.userId = user.uid;
			console.log(this.userId);
			this.loadData();
		}
	});	

}

  loadData(){
	  this.treatmentslist=[];
	let ref = firebase.database().ref('/users/' + this.userId);
	 ref.on('value', (snapshot:any) => {      
		if(snapshot.val()){
			this.doctorname=snapshot.val().name;
			this.treatmentslist=[];
			this.doctorname=snapshot.val().Name;
			this.treatmentlist=snapshot.val().treatment;
			for(let key in this.treatmentlist){
			  this.treatmentlist[key].uid=key;
			  this.treatmentslist.push(this.treatmentlist[key]);
			}
			console.log(this.treatmentslist);	
		}
	 });

  }

clickme(i){
	alert(i);
}

addTreatment(){
	let petData = {
		pet_treatment_date:this.date,
		visitreason:this.purposeofvisit,
		pet_problem:this.sickness,
		pet_treatment:this.treatment,
		doctor_id:this.userId
	}
	let petDatafordoctor = {
		pet_treatment_date:this.date,
		visitreason:this.purposeofvisit,
		pet_problem:this.sickness,
		pet_treatment:this.treatment,
		pet_id:this.petid,
		pet_user:this.petuserid
	}
	let status="done";
firebase.database().ref('pets/' + this.petuserid+ '/' + this.petid +'/pastconsultancy/').push(petData);

firebase.database().ref('/users/' + this.userId+ '/treatment').push(petDatafordoctor);

let fRef = firebase.database().ref('appointment/' + this.petuserid);
fRef.update({
        status:status
     });
alert("Treatment added Successfully");
this.button ="false";
this.date="";
this.purposeofvisit="";
this.sickness="";
this.treatment="";

}




logout(){
 firebase.auth().signOut();
}



}
