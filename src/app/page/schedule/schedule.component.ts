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
a:any
b:any;
appointment_userId:any;  		//new added
d_uid:any;
petname:any;
additionalcomments:any;
petsname:any;
petlist:any;
constructor(private router: Router, public zone:NgZone,public route: ActivatedRoute){
this.treatmentslist=[];
	
	this.petuserid=this.route.snapshot.params['petuserid'] ;
	//new added
	this.appointment_userId = this.route.snapshot.params['appointment_userId'];
	this.petname = this.route.snapshot.params['petname'];

	this.d_uid = this.route.snapshot.params['d_uid'];
	this.purposeofvisit = this.route.snapshot.params['acomments'];
	
	//end
	this.petid=this.route.snapshot.params['petid'] ;
	if(this.status!="" || this.status!= undefined){
     this.status=this.route.snapshot.params['status'] ; 
	}
	
	
	
    this.appointments=[];
	this.reff = firebase.database().ref('Appointment/');
	firebase.auth().onAuthStateChanged((user) => {
		if(user){
			this.userId = user.uid;
			let ref = firebase.database().ref('/users/' + this.userId);
			ref.on('value', (snapshot:any) => {      
				if(snapshot.val()){
					this.zone.run(()=>{
						this.doctorname = snapshot.val().name;
					})
					
				}
				});
			this.loadData();
		}
		else{
			this.router.navigate(['/login']);
		}
	});	

}


petde:any;
loadData(){
	this.treatmentslist=[];
	var ref = firebase.database().ref('/users/' + this.appointment_userId + '/pets/');
	ref.on('value',(snapshot:any)=>{
		if(snapshot.val()){
			this.treatmentslist=[];
			let petsDetails = snapshot.val();
			for(let i=0; i<petsDetails.length; i++){
				if(petsDetails[i].name == this.petname){
					this.petde = petsDetails[i].treatment;
					for(let key in this.petde){
						this.zone.run(()=>{
							this.petde[key].uid=key;
							this.treatmentslist.push(this.petde[key]);
						})

					}
				}
			}
		}
	})
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
				doctor_id:this.userId,
				doctor_name:this.doctorname,
				appointment_userId:this.appointment_userId,
			}
			let petDatafordoctor = {
				pet_treatment_date:this.date,
				visitreason:this.purposeofvisit,
				pet_problem:this.sickness,
				pet_treatment:this.treatment,
			//	pet_id:this.petid,
				//pet_user:this.petuserid
				appointment_userId:this.appointment_userId,
				petname:this.petname,
				mypetId:this.d_uid
				
			}
			let status="done";

			firebase.database().ref('/users/' + this.userId+ '/treatment').push(petDatafordoctor);
		//add sm========================
			let fRef = firebase.database().ref('/users/' + this.userId+ '/myAppointment/'+ this.d_uid);
			fRef.update({
			status:"done"
			});
		//end===========================
			let pRef = firebase.database().ref('pets');
			pRef.once('value',(snapData:any)=>{
				if(snapData.val()){
					let alldata = snapData.val();
					for(let i=0; i<alldata.length; i++){
						if(alldata[i].name == this.petname && alldata[i].userId == this.appointment_userId){
							firebase.database().ref('pets/' + i + '/treatment/').push(petData)
							break;
						}
					}
				}
			})

			let uRef = firebase.database().ref('users/' + this.appointment_userId + '/pets/');
			uRef.once('value',(snapU:any)=>{
				if(snapU.val()){
					let sData = snapU.val();
					for(let j=0; j<sData.length; j++){
						if(sData[j].name == this.petname){
							firebase.database().ref('users/' + this.appointment_userId + '/pets/' + j + '/treatment/').push(petData)
						}
					}
				}
			})


	//	firebase.database().ref('pets/' + this.petuserid+ '/' + this.petid +'/pastconsultancy/').push(petData);

	//	firebase.database().ref('/users/' + this.userId+ '/treatment').push(petDatafordoctor);

	//	let fRef = firebase.database().ref('appointment/' + this.petuserid);
	//	fRef.update({
	//			status:status
	//		});

		alert("Treatment Details added Successfully");
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
