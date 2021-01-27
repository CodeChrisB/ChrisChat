import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ChatTabComponent} from "../chat-tab/chat-tab/chat-tab.component";
const appRoutes: Routes = [
  {path: '', component: ChatTabComponent},
  {path: 'chatapp', component: ChatTabComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
