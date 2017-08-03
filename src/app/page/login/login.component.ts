import { Component } from '@angular/core';
import {Router} from '@angular/router';

import * as firebase from 'firebase';

@Component({
    moduleId: module.id,
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent {

	public email:string;
	public password:string;
	success:any;
	userId:any;

	constructor(private router: Router) {
		firebase.auth().onAuthStateChanged((user) => {
		if(user){
			this.userId = user.uid;
			console.log(this.userId);
  		}
		});	
	}
	
	goLogin(){
		if(this.email==undefined || this.password == undefined || this.email == "" || this.password == ""){
				alert("Email or Password can\'t be blank");

			}else{
			firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((authenticatedUser) => {
				console.log("success");
				
			//	this.success="true";
			//	localStorage.setItem("success",this.success)
			var useId = firebase.auth().currentUser.uid;
  			 var ref = firebase.database().ref('/users/' + useId)
				ref.on('value', (snapshot:any) => {      
				if(snapshot.val()){
				console.log(snapshot.val());
				if(snapshot.val().type == "user"){
				this.router.navigate(['/login']);
				firebase.auth().signOut();
				alert("Only doctor can login here");

				}
			else{
				this.router.navigate(['/home']);
			}

				}


				})
			}).catch((error)=>{
				console.log(error);
								
				alert("Email or Password is invalid"); 
								
			});
		}

	}
	
}
