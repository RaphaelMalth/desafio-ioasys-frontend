import { Book } from './book.model';

export class BooksDTO {
  data: Array<Book>;
  page: number;
  totalItems: number;
  totalPages: number;
}
