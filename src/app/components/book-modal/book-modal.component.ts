import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
})

export class BookModalComponent {

  constructor(
    public modalRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('data---', data);
  }

  onNoClick(): void {
    this.modalRef.close();
  }

  onClick() {
    this.modalRef.close(true);
  }
}

