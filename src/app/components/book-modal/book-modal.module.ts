import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookModalComponent } from './book-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, FlexLayoutModule],
  entryComponents: [BookModalComponent],
  declarations: [BookModalComponent],
  exports: [BookModalComponent],
})
export class BookModalModule {}
