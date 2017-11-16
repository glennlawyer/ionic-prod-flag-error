import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { NgxChartsModule } from "@swimlane/ngx-charts/";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
		NgxChartsModule
  ],
	exports:[
		LoginPage
	]
})
export class LoginPageModule {}
