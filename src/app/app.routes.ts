import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/modules/users/services/auth.guard';
const routes: Routes = [
  {
    path: 'pages', canActivate: [AuthGuard],
    loadChildren: () => import('src/app/pages/pages.module').then( m => m.PagesPageModule),
  },
  {
    path: 'user',
    loadChildren: () => import('src/app/modules/users/users.module').then( m => m.UsersModule),
  },
  {
    path: 'splash',
    loadChildren: () => import('@core/widgets/splash/splash.module').then( m => m.SplashModule),
  },
  { path: 'chat', loadChildren: () => import('@modules/chat/chat.module').then(m => m.ChatModule) },
  { path: 'search', loadChildren: () => import('@modules/factories/factories.module').then(m => m.FactoriesModule) },
  { path: '', redirectTo: '/pages/home', pathMatch: 'full' },
];

export const appRoute = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules });
