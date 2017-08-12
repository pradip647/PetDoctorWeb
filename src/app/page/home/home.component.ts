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

category:any='';
anything:any;

docRef:any;
docTime:any;

  constructor(private router: Router, public zone:NgZone,public route: ActivatedRoute,private popup:Popup){
      //console.log("home working...")
      this.appointments=[];
      this.reff = firebase.database().ref('appointment/');
      this.docRef = firebase.database().ref('doctor_schedule');

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
        this.docRef.once('value',(snapdata:any)=>{
            if(snapdata.val()){
                this.docTime = snapdata.val();
            }
        })



      this.filterItem=[
                        {id:"1",name: "Date"},
                        {id:'2',name: "Client Name"},
                        {id:'3',name: "Pet Name"},
                        {id:'4',name: "Species"},
                        {id:'5',name: "Problem"}
                      ] 
            
  }

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
              this.zone.run(()=>{
                  this.allSchedule[key].uid = key;
                  this.appointments.push(this.allSchedule[key]);
              })

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

date:any;
  dateby() {
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

  catchindex:any;
  nextFollowup(index){
    this.catchindex = index;
    this.nextfollowupdate = this.appointments[index].date;
    // console.log(index);
    // console.log(this.appointments[index]);
      this.openpopup();
  }


  logout(){
    firebase.auth().signOut();
  }

  //next follow up  work
 //change value
  nextfollowupdate:any;
  changeValue(){
    console.log(this.nextfollowupdate);
    this.changeOption();
  }

  selectedTime:any;
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

  //modal submit new time date
  adduserDetails(){

    if(this.nextfollowupdate == undefined || this.nextfollowupdate==null || this.nextfollowupdate=="" ||
       this.selectedTime == undefined || this.selectedTime == "" || this.selectedTime==null || this.selectedTime == "Select"){

            if(this.nextfollowupdate == undefined || this.nextfollowupdate==null || this.nextfollowupdate==""){
                alert("Please Select Date");
            }else if(this.selectedTime == undefined || this.selectedTime == "" || this.selectedTime==null || this.selectedTime == "Select"){
                alert("Please Select Time");
            }
    }else{


      console.log(this.appointments[this.catchindex]);
      var selectData = this.appointments[this.catchindex];
      //user side modify date time
      var auserRef = firebase.database().ref('users/' + selectData.appointment_userId + '/appointments/');
      auserRef.once('value',(snap1:any)=>{
          if(snap1.val()){
            var appo = snap1.val();
            for(let i=0; i<appo.length;i++){
              if(appo[i].doctor_id == selectData.doctor_id && appo[i].name == selectData.name &&
                 appo[i].date == selectData.date && appo[i].time == selectData.time){
                    firebase.database().ref('users/' + selectData.appointment_userId + '/appointments/' + i + '/date/').set(this.nextfollowupdate);
                    firebase.database().ref('users/' + selectData.appointment_userId + '/appointments/' + i + '/time/').set(this.selectedTime);
              }
            }
          } 
      })
        //doctor side modification date time
        this.zone.run(()=>{
            firebase.database().ref('users/' + this.userId + '/myAppointment/' + selectData.uid + '/date/').set(this.nextfollowupdate);
            firebase.database().ref('users/' + this.userId + '/myAppointment/' + selectData.uid + '/time/').set(this.selectedTime);
        })
        //doctor booking date and time
        var d_ref = firebase.database().ref('users/' + this.userId + '/booking_times/');
        d_ref.once('value',(snap2:any)=>{
          if(snap2.val()){
            var tData = snap2.val();
            for (let key in tData){
              if(tData[key].date == selectData.date && tData[key].time == selectData.time){
                firebase.database().ref('users/' + this.userId + '/booking_times/' + key + '/date/').set(this.nextfollowupdate);
                firebase.database().ref('users/' + this.userId + '/booking_times/' + key + '/time/').set(this.selectedTime);
              }
            }
          }
        })

        //pet's modification date and time
        var p_ref = firebase.database().ref('pets/');
        p_ref.once('value',(snap3:any)=>{
          if(snap3.val()){
            console.log(snap3.val())
            let petdetails = snap3.val();
            for(let j=0; j<petdetails.length; j++){
              if(petdetails[j].name == selectData.name && petdetails[j].userId == selectData.appointment_userId){

                  var p_reff = firebase.database().ref('pets/' + j + '/appointment/');
                  p_reff.once('value',(snap4:any)=>{
                    if(snap4.val()){
                      let allAppo = snap4.val();
                      for(var key in allAppo){
                        console.log("enter here")
                        allAppo[key].uid = key;
                        if(allAppo[key].doctor_id == selectData.doctor_id && allAppo[key].date == selectData.date && allAppo[key].time == selectData.time){
                          console.log("enter here again")
                           firebase.database().ref('pets/' + j + '/appointment/'+ key + '/date/').set(this.nextfollowupdate);
                          firebase.database().ref('pets/' + j + '/appointment/'+ key + '/time/').set(this.selectedTime);
                          break;
                        // console.log("succes id is : " + key);
                        }
                      }
                    }
                  })
                  break;
              }
            }
          }
        })


    }
      this.popup5.hide();
    //console.log(this.appointments[this.catchindex]);
  }


}