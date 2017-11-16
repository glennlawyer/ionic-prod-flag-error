import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';

const ROOT = 'LoginPage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 @ViewChild(Nav) nav: Nav;
  rootPage: any; // This is set by the authenticator

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
                // public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public afAuth: AngularFireAuth,
        ) {
    this.initializeApp();

		// used to set the sidebar menu
		// in app.html
    this.pages = [
      { title: 'Log in', component: 'LoginPage' },
    ];

		const authObserver = afAuth.authState.subscribe( user => {
			if (user) {
				this.rootPage = ROOT;
				authObserver.unsubscribe();
			} else {
				this.rootPage = 'LoginPage';
				authObserver.unsubscribe();
			}
		});
	}

	initializeApp() {
		this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.statusBar.styleDefault();
			this.splashScreen.hide();
			// TODO cheap hack
			// the setTimeout shouldn't be needed
			// a blog post said it would prevent the white screen on
			// Android, but the post looked like V1 code.
			// setTimeout(() => {
			// 	this.splashScreen.hide()
			// }, 100)
		});
	}


	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		const authObserver = this.afAuth.authState.subscribe( user => {
			if (user) {
				this.nav.setRoot(page.component);
				authObserver.unsubscribe();
			} else {
				this.nav.setRoot('LoginPage');
			}
		})
	}
}
