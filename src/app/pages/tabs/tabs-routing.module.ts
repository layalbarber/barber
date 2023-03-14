import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'appointment',
        children: [
          {
            path: '',
            loadChildren: () => import('../appointment-list/appointment-list.module').then(m => m.AppointmentListPageModule)
          },
          {
            path: 'single-appointment',
            loadChildren: () => import('../../pages/single-appointment/single-appointment.module').then(m => m.SingleAppointmentPageModule)
          }
        ]
      },
      {
        path: 'nearby',
        children: [
          {
            path: '',
            loadChildren: () => import('../nearby/nearby.module').then(m => m.NearbyPageModule)
          },
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../../home/home.module').then(m => m.HomePageModule),
          },
          {
            path: 'search',
            loadChildren: () => import('../../pages/searchresult/searchresult.module').then(m => m.SearchresultPageModule)
          },
          {
            path: 'setlocatio',
            loadChildren: () => import('../setlocatio/setlocatio.module').then(m => m.SetlocatioPageModule)
          },
          {
            path: 'tops',
            loadChildren: () => import('../../pages/top-services/top-services.module').then(m => m.TopServicesPageModule)
          },
          {
            path: 'salonprofile',
            loadChildren: () => import('../../pages/salon-profile/salon-profile.module').then(m => m.SalonProfilePageModule)
          },
          {
            path: 'service',
            loadChildren: () => import('../../pages/top-services/top-services.module').then(m => m.TopServicesPageModule)
          },
          {
            path: 'offers',
            loadChildren: () => import('../../pages/offers/offers.module').then(m => m.OffersPageModule)
          },
          {
            path: 'terms',
            loadChildren: () => import('../../pages/terms/terms.module').then(m => m.TermsPageModule)
          },
          {
            path: 'privacy',
            loadChildren: () => import('../../pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
          },
          {
            path: 'about',
            loadChildren: () => import('../../pages/about/about.module').then(m => m.AboutPageModule)
          },
          {
            path: 'web',
            loadChildren: () => import('../../pages/web-show/web-show.module').then(m => m.WebShowPageModule)
          },
          {
            path: 'makepayment',
            loadChildren: () => import('../../pages/make-payment/make-payment.module').then(m => m.MakePaymentPageModule)
          },
          {
            path: 'salon-profile',
            loadChildren: () => import('../../pages/salon-profile/salon-profile.module').then(m => m.SalonProfilePageModule)
          },
          {
            path: 'select-time-slot',
            loadChildren: () => import('../../pages/select-time-slot/select-time-slot.module').then(m => m.SelectTimeSlotPageModule)
          },

        ]
      },
      {
        path: 'notification',
        children: [
          {
            path: '',
            loadChildren: () => import('../notification/notification.module').then(m => m.NotificationPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: 'edit',
            loadChildren: () => import('../edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
