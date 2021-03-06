import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          { path: 'mensal', loadChildren: './mensal/mensal.module#MensalPageModule' },
          { path: 'geral', loadChildren: './geral/geral.module#GeralPageModule' },
          { path: 'ultimos', loadChildren: './ultimos/ultimos.module#UltimosPageModule' },
        ]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
