import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'sign-in', loadChildren: './Sign-in/sign-in/sign-in.module#SignInPageModule' },
  { path: 'device-list', loadChildren: './device-list/device-list.module#DeviceListPageModule' },
  { path: 'device-info', loadChildren: './device-info/device-info.module#DeviceInfoPageModule' },
  { path: 'device-graph', loadChildren: './device-graph/device-graph.module#DeviceGraphPageModule' },
  { path: 'graph-parameter', loadChildren: './graph-parameter/graph-parameter.module#GraphParameterPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
