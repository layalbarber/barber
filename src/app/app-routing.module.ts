import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule),
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/forgot/forgot.module').then(m => m.ForgotPageModule),
  },
  {
    path: 'verify',
    loadChildren: () => import('./pages/verify/verify.module').then(m => m.VerifyPageModule),
  },
  {
    path: 'passwordchanged',
    loadChildren: () => import('./pages/passwordchanged/passwordchanged.module').then(m => m.PasswordchangedPageModule),
  },
  {
    path: 'searchresult',
    loadChildren: () => import('./pages/searchresult/searchresult.module').then(m => m.SearchresultPageModule),
  },
  {
    path: 'top-services',
    loadChildren: () => import('./pages/top-services/top-services.module').then(m => m.TopServicesPageModule),
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationPageModule),
  },
  {
    path: 'offers',
    loadChildren: () => import('./pages/offers/offers.module').then(m => m.OffersPageModule),
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then(m => m.TermsPageModule),
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule),
  },
  {
    path: 'setlocatio',
    loadChildren: () => import('./pages/setlocatio/setlocatio.module').then(m => m.SetlocatioPageModule),
  },
  {
    path: 'confirmlocation',
    loadChildren: () => import('./pages/confirmlocation/confirmlocation.module').then(m => m.ConfirmlocationPageModule),
  },
  {
    path: 'nearby',
    loadChildren: () => import('./pages/nearby/nearby.module').then(m => m.NearbyPageModule),
  },
  {
    path: 'salon-profile',
    loadChildren: () => import('./pages/salon-profile/salon-profile.module').then(m => m.SalonProfilePageModule),
  },
  {
    path: 'web-show',
    loadChildren: () => import('./pages/web-show/web-show.module').then(m => m.WebShowPageModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule),
  },
  {
    path: 'make-payment',
    loadChildren: () => import('./pages/make-payment/make-payment.module').then(m => m.MakePaymentPageModule),
  },
  {
    path: 'appointment-list',
    loadChildren: () => import('./pages/appointment-list/appointment-list.module').then(m => m.AppointmentListPageModule),
  },
  {
    path: 'no-appointment',
    loadChildren: () => import('./pages/no-appointment/no-appointment.module').then(m => m.NoAppointmentPageModule),
  },
  {
    path: 'add-address',
    loadChildren: () => import('./pages/add-address/add-address.module').then(m => m.AddAddressPageModule),
  },
  {
    path: 'singlecouponpage',
    loadChildren: () => import('./pages/singlecouponpage/singlecouponpage.module').then(m => m.SinglecouponpagePageModule),
  },
  {
    path: 'emailverify',
    loadChildren: () => import('./pages/emailverify/emailverify.module').then(m => m.EmailverifyPageModule),
  },
  {
    path: 'all-salons',
    loadChildren: () => import('./pages/all-salons/all-salons.module').then(m => m.AllSalonsPageModule),
  },
  {
    path: 'select-time-slot',
    loadChildren: () => import('./pages/select-time-slot/select-time-slot.module').then(m => m.SelectTimeSlotPageModule),
  },
  {
    path: 'language',
    loadChildren: () => import('./modals/language/language.module').then(m => m.LanguagePageModule),
  },
  {
    path: 'select-address',
    loadChildren: () => import('./pages/select-address/select-address.module').then(m => m.SelectAddressPageModule)
  },
  {
    path: 'single-appointment',
    loadChildren: () => import('./pages/single-appointment/single-appointment.module').then(m => m.SingleAppointmentPageModule)
  },
  {
    path: 'edit-address',
    loadChildren: () => import('./pages/edit-address/edit-address.module').then(m => m.EditAddressPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
