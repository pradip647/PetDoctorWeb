import { Component,NgZone,ViewChild} from '@angular/core';
import {Router,ActivatedRoute, Params, Data} from '@angular/router';
import * as firebase from 'firebase';
import {Popup} from 'ng2-opd-popup';

@Component({
    moduleId: module.id,
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls: ['./home.component.css'],
	
})

export class HomeComponent {
@ViewChild('popup5') popup5: Popup; 
userId:any;
allSchedule:any;
reff:any;
appointments:any;
doctorname:any;
data:any;
status:any;
treatmentstatus:boolean;
filterItem:any;
loginstatus:any;
type:any;
constructor(private router: Router, public zone:NgZone,public route: ActivatedRoute,private popup:Popup){
	//console.log("home working...")
	this.appointments=[];
	this.reff = firebase.database().ref('appointment/');

	firebase.auth().onAuthStateChanged((user) => {
		if(user){
			this.userId = user.uid;
			//console.log(this.userId);
			this.loadData();
    }
    else{
      this.router.navigate(['/login']);
    }
	});	

	this.filterItem=[
    {
     id:"1",
     name: "Date"
    },
    {
     id:'2',
     name: "Client Name"
    },
	{
     id:'3',
     name: "Pet Name"
    },
    {
     id:'4',
     name: "Species"
    },
    {
     id:'5',
     name: "Problem"
    }
   ] 
        	
}
category:any='';
anything:any;
 onItemChange(){
     // console.log(this.category); //Here I want the changed value
  if(this.category=='1'){
  document.getElementById("con").style.display='block';
  document.getElementById("cit").style.display='none';
  document.getElementById("age").style.display='none';
  document.getElementById("ser").style.display='none';
  document.getElementById("pet").style.display='none'; 
  }

  else if(this.category=='2'){
  document.getElementById("con").style.display='none';
  document.getElementById("cit").style.display='block';
  document.getElementById("age").style.display='none';
  document.getElementById("ser").style.display='none';
  document.getElementById("pet").style.display='none'; 
}
 else if(this.category=='3'){
  document.getElementById("con").style.display='none';
  document.getElementById("cit").style.display='none';
  document.getElementById("age").style.display='none';
  document.getElementById("ser").style.display='none';
  document.getElementById("pet").style.display='block';
  }

  else if(this.category=='4'){

  document.getElementById("con").style.display='none';
  document.getElementById("cit").style.display='none';
  document.getElementById("age").style.display='block';
  document.getElementById("ser").style.display='none';
  document.getElementById("pet").style.display='none'; 
  }

  else if(this.category=='5'){

  document.getElementById("con").style.display='none';
  document.getElementById("cit").style.display='none';
  document.getElementById("age").style.display='none';
  document.getElementById("ser").style.display='block';
  document.getElementById("pet").style.display='none'; 
 }
  
  }

loadData(){
	let ref = firebase.database().ref('/users/' + this.userId);
	 ref.on('value', (snapshot:any) => { 
       this.appointments = [];   
		if(snapshot.val()){
      this.zone.run(()=>{
        this.doctorname=snapshot.val().name;
        this.type=snapshot.val().type;
        //this.status=snapshot.val().status;
        
      })

      if(snapshot.val().myAppointment){
        this.allSchedule= snapshot.val().myAppointment;
        for(let key in this.allSchedule){
          this.allSchedule[key].uid = key;
          this.appointments.push(this.allSchedule[key]);
        }
        // console.log(this.appointments)
      }

  /*
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
    */

		}
	 });

  }
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


teatment(index){
	let x =this.appointments[index];
  console.log(x);
//appointment_userId
  //name
  //uid
	if(x.status){
   // this.router.navigate(['/schedule',{petuserid:x.uid,petid:x.petid,status:x.status}]);
    this.router.navigate(['/schedule',{status:x.status, appointment_userId:x.appointment_userId,petname:x.name, d_uid:x.uid ,acomments:x.additionalComments}]);
	}
	else{
  //this.router.navigate(['/schedule',{petuserid:x.uid,petid:x.petid}]);
  this.router.navigate(['/schedule',{appointment_userId:x.appointment_userId,petname:x.name, d_uid:x.uid ,acomments:x.additionalComments}]);
  //localStorage.setItem("additionalcomments",x.additionalComments);
	}

}

nextFollowup(index){
this.openpopup();
}


logout(){
 firebase.auth().signOut();
}
date:any;

dateby() {
  // Declare variables 
 
  var input, filter, table, tr, td, i;
  input = document.getElementById("con");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

clName(){
	var input, filter, table, tr, td, i;
  input = document.getElementById("cit");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }

}

petName(){
	var input, filter, table, tr, td, i;
  input = document.getElementById("pet");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}
species(){
	var input, filter, table, tr, td, i;
  input = document.getElementById("age");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[4];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }

}

problem(){
	var input, filter, table, tr, td, i;
  input = document.getElementById("ser");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[5];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }

}

}