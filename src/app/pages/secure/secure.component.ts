import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksDTO } from 'src/app/models/books-dto';
import { Pagination } from 'src/app/models/pagination.model';
import { BooksService } from 'src/app/services/books.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BookModalComponent } from 'src/app/components/book-modal/book-modal.component';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss'],
})
export class SecureComponent implements OnInit {
  message = '';
  isLoadingResults = false;
  user: User;

  books: BooksDTO;

  pagination = new Pagination();

  constructor(
    private authService: AuthService,
    private router: Router,
    private booksService: BooksService,
    public modal: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getLoggedUser();
    this.listBooks(this.pagination);
  }

  onPageChange(event) {
    this.pagination.page = event.pageIndex + 1;
    this.listBooks(this.pagination);
  }

  openModal(book: Book) {
    console.log(book);
    const modalRef = this.modal.open(BookModalComponent, {
      data: book,
      panelClass: 'my-dialog',
    });

    modalRef.afterClosed().subscribe(result => {
      console.log(`Modal result: ${result}`);
    });
  }

  listBooks(pagination: Pagination) {
    this.booksService
      .getBooks(pagination.page, pagination.amount, pagination.category)
      .subscribe(
        (res) => {
          console.log('res----', res);
          this.books = res;
        },
        (err) => {
          console.error('error---', err);
        }
      );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then((_) => console.log('Logout'));
  }
}
