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

	constructor(private router: Router) {
		
	 }
	
	goLogin(){
		if(this.email==undefined || this.password == undefined || this.email == "" || this.password == ""){
				alert("Email or Password can\'t be blank");

			}else{
			firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((authenticatedUser) => {
				console.log("success");
				//this.router.navigate(['/home']);
			//	this.success="true";
			//	localStorage.setItem("success",this.success)
			}).catch((error)=>{
				console.log(error);
								if(error.message =="The email address is badly formatted."){
									alert("Email is not valid... Please Enter Valid email"); 
								}
								else if ( error.message == "The password is invalid or the user does not have a password."){
									alert("Password is not valid... Please Enter Valid Password"); 
								}
			});
		}

	}
	
}
