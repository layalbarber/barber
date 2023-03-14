import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SavelocationPageModule } from './modals/savelocation/savelocation.module';
import { AddReviewPageModule } from './modals/add-review/add-review.module';
import { PaymentModalPageModule } from './modals/payment-modal/payment-modal.module';
import { CancelBookingPageModule } from './modals/cancel-booking/cancel-booking.module';
import { SocialiconPageModule } from './modals/socialicon/socialicon.module';
import { SortbyPageModule } from './modals/sortby/sortby.module';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/Camera/ngx';
import { CouponPageModule } from './modals/coupon/coupon.module';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { Stripe } from '@ionic-native/stripe/ngx';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxProgressiveImgLoaderModule } from "ngx-progressive-img-loader";
import { SignInWithApple } from '@ionic-native/sign-in-with-apple/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SavelocationPageModule,
    AddReviewPageModule,
    PaymentModalPageModule,
    CancelBookingPageModule,
    SocialiconPageModule,
    SortbyPageModule,
    HttpClientModule,
    CouponPageModule,
    NgSelectModule,
    IonicStorageModule.forRoot(),
    GooglePlaceModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgxProgressiveImgLoaderModule
  ],
  
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
    CallNumber,
    Camera,
    AndroidPermissions,
    Geolocation,
    LocationAccuracy,
    OneSignal,
    AuthGuardService,
    AuthenticationService,
    Stripe,
    PhotoViewer,
    InAppBrowser,
    Network,
    Diagnostic,
    SocialSharing,
    SignInWithApple,
    GooglePlus,
    Facebook,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}