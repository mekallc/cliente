import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {path: 'home', loadChildren: () => import('./pages/solicitud/solicitud.module').then( m => m.SolicitudCategoriesModule) },
  {path: 'waiting', loadChildren: () => import('./pages/waiting/waiting.module').then( m => m.WaitingModule) },

];

export const categoriesRoute = RouterModule.forChild(routes);
