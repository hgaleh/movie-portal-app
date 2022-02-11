import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule),
    data: { animation: 'DashboardPage' }
  },
  {
    path: 'favorite',
    loadChildren: () => import('./favorite/favorite.module').then(x => x.FavoriteModule),
    data: { animation: 'FavoritePage' }
  },
  {
    path: 'later',
    loadChildren: () => import('./later/later.module').then(x => x.LaterModule),
    data: { animation: 'LaterPage' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
