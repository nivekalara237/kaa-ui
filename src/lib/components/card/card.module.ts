import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardTitleComponent} from './title/title.component';
import {CardBodyComponent} from './body/body.component';
import {ShellComponent} from './shell/shell.component';
import {CardFooterComponent} from './footer/footer.component';
import {CardSubTitleComponent} from './sub-title/sub-title.component';
import {CardLinkComponent} from './link/link.component';


@NgModule({
  declarations: [
    CardTitleComponent,
    CardBodyComponent,
    ShellComponent,
    CardFooterComponent,
    CardSubTitleComponent,
    CardLinkComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardTitleComponent,
    CardBodyComponent,
    ShellComponent,
    CardFooterComponent,
    CardSubTitleComponent,
    CardLinkComponent
  ]
})
export class CardModule {
}
