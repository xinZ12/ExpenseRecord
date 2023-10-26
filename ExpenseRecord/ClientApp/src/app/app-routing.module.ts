import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';





const routes: Routes = [
  {path:'', component: HomepageComponent},
  {path: 'create-item', component: ItemsComponent},
  {path: 'todo-detail/:id', component: TodoDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
