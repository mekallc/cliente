import { Routes, RouterModule } from '@angular/router';

const app: Routes = [
  {
    path: 'soporte',
    loadChildren: () => import('./pages/soporte/soporte.module')
      .then( m => m.SoporteChatPageModule)
  },
  {
    path: 'room',
    loadChildren: () => import('./pages/rooms/rooms.module')
      .then( m => m.RoomsChatPageModule)
  }
];

export const chatRoute = RouterModule.forChild(app);
