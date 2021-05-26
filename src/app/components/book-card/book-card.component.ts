import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input() book: Book;
  @Output() cardClickEvent = new EventEmitter<Book>();

  constructor() { }

  ngOnInit(): void {
  }

  openModal(book: Book): void {
    this.cardClickEvent.emit(book);
  }

}
