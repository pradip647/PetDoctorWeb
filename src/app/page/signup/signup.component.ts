import { Component } from '@angular/core';
import {Router} from '@angular/router';


import * as firebase from 'firebase';


@Component({
    moduleId: module.id,
	selector: 'signup',
	templateUrl: 'signup.component.html',
	styleUrls: ['./signup.component.css'],

})

export class SignupComponent {
	public name:string;
	public email:any;
	public password:string;
	public confirmpassword:string;

	ref:any;

	constructor(private router: Router) { 
		this.ref = firebase.database().ref('users');
	}

	registration(){
	if(this.name == undefined || this.name == "" || this.email == undefined || this.email=="" || this.password == undefined || this.password == "" || this.confirmpassword ==undefined ||
		 this.confirmpassword == ""){
			alert("Please Enter All Details Properly....");
		 }else{
			  if(this.password == this.confirmpassword){
					firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then((newUser)=>{
						firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((authenticatedUser) => {
											/*authenticatedUser.sendEmailVerification().then(function() {
												alert("Verification Email Sent to your email.. please verify your email...");
											}, function(error) {});*/

											this.ref.child(authenticatedUser.uid).update({
												name:this.name,
												email:this.email,
												type:"doctor"
												
											})
										});
					}).catch((error)=>{
						console.log(error);
						if(error.message =="The email address is badly formatted."){
							alert("Email is not valid... please Enter Valid email"); 
						}
						else if ( error.message == "The email address is already in use by another account."){
							alert("Email Already Exist. Please Enter another email.."); 
						}
					})
		 		}
				 else{
					 alert("Password don\'t match");
				 }
		   }
		 }
	}


	

