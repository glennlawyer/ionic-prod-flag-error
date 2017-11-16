import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from "angularfire2/auth/auth.module";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from "angularfire2/firestore/firestore.module";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http/";
import { HttpClientJsonpModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { NgxChartsModule } from "@swimlane/ngx-charts/";


// import { Facebook } from "@ionic-native/facebook/";
import { SplashScreen } from '@ionic-native/splash-screen';
// import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { config } from '../environments/config';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(config.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireDatabaseModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		HttpClientJsonpModule,
	],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
		// StatusBar,
		// Facebook
  ]
})
export class AppModule {}
