import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from "@angular/forms/";
import { App } from "ionic-angular/components/app/app";
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	single: any[] = [ { "name": "Germany", "value": 8940000 }, 
		{ "name": "USA", "value": 5000000 }];

	view: any[] = [700, 400];

	showXAxis = true;
	showYAxis = true;
	gradient = true;
	showLegend = true;
	showXAxisLabel = true;
	xAxisLabel = 'Country';
	showYAxisLabel = true;
	yAxisLabel = 'Population';

	colorScheme = {
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
	};

	user: any
	userLoggedIn: boolean = false;
	showEmailToggle: boolean = false;
	emailLoginErrorToggle: boolean = false;

	loginForm: FormGroup;
	rootPage: string = 'LoginPage'

	constructor(public navCtrl: NavController, public navParams: NavParams,
		private afAuth: AngularFireAuth,
		private app: App,
		private alertCtrl: AlertController,
		public  formBuilder: FormBuilder,
		// private loadingCtrl: LoadingController,
		// private platform: Platform,
	) {
		afAuth.authState.subscribe(user => {
			if (!user) {
				this.user = {status: "logged out"};        
				return;
			}
			this.user = user;      
			this.userLoggedIn = true
		});

		this.loginForm = formBuilder.group({
			// email: ['dr.g.lawyer@gmail.com', Validators.compose([Validators.required,
			email: ['', Validators.compose([Validators.required,
				Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])], 
			password: ['', Validators.compose([Validators.minLength(6), 
				Validators.required])]
		});

		// log out if navigating to this page with navParam logout:true
		if(navParams.get("logout") ) this.signOut()
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
  }

  signInWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then( res => console.log(res))
			.then( () => this.app.getRootNav().setRoot(this.rootPage) )
  }

	public GoogleLogin() {
		this.afAuth.auth
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then( res => console.log(res))
			.then( () => this.app.getRootNav().setRoot(this.rootPage) )
	}


	public toggleEmailLogin() {
		this.showEmailToggle = true;
	}

	public emailLogin(){
		this.afAuth.auth.signInWithEmailAndPassword(
			this.loginForm.value.email, this.loginForm.value.password)
      .then( res => console.log(res))
			.then( () => this.showEmailToggle = false)
			.then( () => this.app.getRootNav().setRoot(this.rootPage) )
			.catch((error) => {
				// TODO! check error code before showing the display
				// if(error.code === "auth/wrong-password") {
				this.emailLoginErrorToggle = true
				// this.app.getRootNav().setRoot(this.rootPage)
			});
	}

	// public resetPassword(): firebase.Promise<any> {
	public resetPassword() {
		return this.afAuth.auth.sendPasswordResetEmail(this.loginForm.value.email)
		.then( user  => {
			let alert = this.alertCtrl.create({
				message: "We just sent a reset link to " + this.loginForm.value.email,
				buttons: [ { text: "Ok", role: 'cancel' } ]
			});
			alert.present();
		}, (error) => {
			var errorMessage: string = error.message;
			let errorAlert = this.alertCtrl.create({
				message: errorMessage,
				buttons: [ { text: "Ok", role: 'cancel' } ]
			});
			errorAlert.present();
		});
	}

	// public createAccount(): firebase.Promise<any> {
	public createAccount() {
		if(this.loginForm.valid){
			return this.afAuth.auth.createUserWithEmailAndPassword(
				this.loginForm.value.email, this.loginForm.value.password)
				.then( res  => console.log( res ))
				.then( () => this.app.getRootNav().setRoot(this.rootPage) )
				.catch((error) => {
					var errorMessage: string = error.message;
					let errorAlert = this.alertCtrl.create({
						message: errorMessage,
						buttons: [ { text: "Ok", role: 'cancel' } ]
					});
					errorAlert.present();
				});
		} else {
			console.warn( this.loginForm.value )
		}
	}


  signOut() {
		console.log( "Signing out." )
		// unsubscribe from all subscriptions
    this.afAuth.auth.signOut();
		this.app.getRootNav().setRoot('LoginPage')
  }

}
