import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule, MatPaginatorIntl } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BookCardComponent } from "src/app/components/book-card/book-card.component";
import { BookModalModule } from "src/app/components/book-modal/book-modal.module";
import { CustomMatPaginatorIntl } from "src/app/helpers/custom-paginator-intl.service";
import { LandingRoutingModule } from "./landing-routing.module";
import { LandingComponent } from "./landing.component";

@NgModule({
  declarations: [LandingComponent, BookCardComponent],
  imports: [
    LandingRoutingModule,
    CommonModule,
    HttpClientModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    BookModalModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }
  ]
})
export class LandingModule {}
