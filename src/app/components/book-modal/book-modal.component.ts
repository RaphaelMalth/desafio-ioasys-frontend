import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
})

export class BookModalComponent {

  constructor(
    public modalRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book) {
  }

  onNoClick(): void {
    this.modalRef.close();
  }

  onClick() {
    this.modalRef.close(true);
  }
}

