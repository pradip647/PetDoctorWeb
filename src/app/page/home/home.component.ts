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
filterItem:any;
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
      console.log(this.category); //Here I want the changed value
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
		if(snapshot.val()){
      this.zone.run(()=>{
        this.doctorname=snapshot.val().name;
        this.status=snapshot.val().status;
      })

			
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