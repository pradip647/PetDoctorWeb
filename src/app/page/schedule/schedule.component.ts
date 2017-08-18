import { Component,NgZone,ViewChild } from '@angular/core';
import {Router,ActivatedRoute, Params, Data} from '@angular/router';

import * as firebase from 'firebase';

import {Popup} from 'ng2-opd-popup';

@Component({
    moduleId: module.id,
	selector: 'schedule',
	templateUrl: 'schedule.component.html',
	styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent {
@ViewChild('popup5') popup5: Popup; 	
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
docRef:any;
docTime:string;
time:any;
kuid:any;
phoneno:any;
prefdoctor:any;
selectpet:any;
username:any;
constructor(private router: Router, public zone:NgZone,public route: ActivatedRoute,private popup:Popup){
this.treatmentslist=[];
	
	
	//console.log(localStorage.getItem("time"));
	//new added
	this.additionalcomments = this.route.snapshot.params['acomments'] ;
	this.appointment_userId = this.route.snapshot.params['appointment_userId'];
	this.date = this.route.snapshot.params['tdate'] ;
	this.d_uid = this.route.snapshot.params['d_uid'];
	this.petname = this.route.snapshot.params['petname'];
	this.phoneno = this.route.snapshot.params['phoneno'];
	this.prefdoctor = this.route.snapshot.params['prefferdoctor'];
	this.selectpet = this.route.snapshot.params['selectpet'];
	this.time = this.route.snapshot.params['time'] ;
    this.username = this.route.snapshot.params['username'] ;

    this.petuserid=this.route.snapshot.params['petuserid'] ;
	this.kuid = this.route.snapshot.params['uid'];

	this.purposeofvisit = this.route.snapshot.params['acomments'];
	
	//end
	this.petid=this.route.snapshot.params['petid'] ;
	if(this.status!="" || this.status!= undefined){
     this.status=this.route.snapshot.params['status'] ; 
	}
	
	
    this.appointments=[];
	this.reff = firebase.database().ref('Appointment/');
	this.docRef = firebase.database().ref('doctor_schedule');
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

	
	this.docRef.once('value',(snapdata:any)=>{
            if(snapdata.val()){
                this.docTime = snapdata.val();
            }
        })

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
			
			if(this.date == "" || this.purposeofvisit == ""||this.sickness == ""||this.treatment == "" || this.date == undefined || this.purposeofvisit == undefined ||this.sickness == undefined ||this.treatment == undefined){
               alert("All Fields are Mandatory");
			}else{
			firebase.database().ref('/users/' + this.userId+ '/treatment').push(petDatafordoctor);

			let fRef = firebase.database().ref('/users/' + this.userId+ '/myAppointment/'+ this.kuid);
			fRef.update({
			status:"done"
			});

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
       
		alert("Treatment Details added Successfully");
		this.button ="false";
		this.date="";
		this.purposeofvisit="";
		this.sickness="";
		this.treatment="";
		this.router.navigate(['/home']);
			}

}

logout(){
 firebase.auth().signOut();
}

 nextfollowupdate:any;
 //date:any;
 selectedTime:any;


 openpopup(){
      this.popup5.options = {
          cancleBtnClass: "btn", 
          confirmBtnClass: "btn btn-primary btn-mbe-attack",
          color: "#2768d1",
          header: "Choose Next follow up date",
          widthProsentage:30,
          animation: "fadeInDown",
          confirmBtnContent: "Set it"}
      this.popup5.show(this.popup5.options);
    }

catchindex:any;

 changeValue(){
    console.log(this.nextfollowupdate);
    this.changeOption();
  }

  nextFollowup(){
 
    this.nextfollowupdate =this.date;

      this.openpopup();
  }


   changeOption(){
      console.log(this.selectedTime);
      console.log(this.nextfollowupdate);
      if(this.nextfollowupdate == undefined || this.nextfollowupdate==null || this.nextfollowupdate==""){
          alert("Please Select Follow up Date First.");
      }else if(this.selectedTime == undefined || this.selectedTime == "" || this.selectedTime==null || this.selectedTime == "Select"){
          alert("Please Select Follow up Time.");
      }else{
        let dRef = firebase.database().ref('users/' + this.userId + "/booking_times/");
            dRef.once('value',(snapshot:any)=>{
              if(snapshot.val()){
                  let allBookingTime = snapshot.val();
                  let found=false
                  for( let key in allBookingTime){
                    if(allBookingTime[key].date == this.nextfollowupdate && allBookingTime[key].time == this.selectedTime){
                        found=true;
                        break;
                    }
                  }

                  if(found){
                    alert("Your Booking Schedule Already Booked on this time. Please Select Another Time or Date");
                    this.selectedTime = "Select";
                  }else{
                    //alert("not book. free")
                  }
              }
            })
      }
  }
  details:any;
  adduserDetails(){

    if(this.nextfollowupdate == undefined || this.nextfollowupdate==null || this.nextfollowupdate=="" ||
       this.selectedTime == undefined || this.selectedTime == "" || this.selectedTime==null || this.selectedTime == "Select"){

            if(this.nextfollowupdate == undefined || this.nextfollowupdate==null || this.nextfollowupdate==""){
                alert("Please Select Date");
            }else if(this.selectedTime == undefined || this.selectedTime == "" || this.selectedTime==null || this.selectedTime == "Select"){
                alert("Please Select Time");
            }
    }else{
		this.details =[];
let newappointment = {
				additionalComments:this.additionalcomments,
				appointment_userId:this.appointment_userId,
				date:this.nextfollowupdate,
				doctor_id:this.d_uid,
				name:this.petname,
				phoneNo:this.phoneno,
				prefferDoctor:this.prefdoctor,
				selectPet:this.selectpet,
				time:this.selectedTime,
				username:this.username,
			}

let petapp = {
				additionalComments:this.additionalcomments,			
				date:this.nextfollowupdate,
				doctor_id:this.d_uid,
				prefferDoctor:this.prefdoctor,
		        time:this.selectedTime,	
			}

     //apointment to pet user
		var uRef = firebase.database().ref('users/' + this.appointment_userId);
        uRef.once('value',(appolist)=>{
          if(appolist.val()){
            if(appolist.val().appointments){
              var allAppolist = appolist.val().appointments;
              firebase.database().ref('users/' + this.appointment_userId + '/appointments/' + allAppolist.length).set(newappointment);
            }else{
                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/appointments/0/').set(newappointment);
            }
          }
        })


		//doctor side 
		
       this.zone.run(()=>{
          
		firebase.database().ref('users/' + this.userId + '/myAppointment').push(newappointment);
		})
        //doctor booking date and time
	   var d_ref = firebase.database().ref('users/' + this.userId + '/booking_times/');
	   let bookingtime ={ date:this.nextfollowupdate,
						  time:this.selectedTime
						}
        d_ref.once('value',(snap2:any)=>{
          if(snap2.val()){

             firebase.database().ref('users/' + this.userId + '/booking_times' ).push(bookingtime);

          }
        })

        //pet's modification date and time
       var p_ref = firebase.database().ref('pets/');
        p_ref.once('value',(snap3:any)=>{
          if(snap3.val()){
            console.log(snap3.val())
            let petdetails = snap3.val();
            for(let j=0; j<petdetails.length; j++){
              if(petdetails[j].name == this.petname && petdetails[j].userId == this.appointment_userId){

                  var p_reff = firebase.database().ref('pets/' + j + '/appointment/');
                  p_reff.once('value',(snap4:any)=>{
                    if(snap4.val()){
					  firebase.database().ref('pets/' + j + '/appointment').push(petapp);
                    }
				  })
				var p_ref = firebase.database().ref('appointment/');
				p_ref.once('value',(snap2:any)=>{
				if(snap2.val()){

				firebase.database().ref('appointment/').push(newappointment);

				}
				})

                  break;
              }
            }
          }
        })

		this.popup5.hide();
		
    }
     
    
  }

}
