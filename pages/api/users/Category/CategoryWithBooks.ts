export interface Book {
  id: number;
  title: string;
  description: string;
  image_url: string;
  release_year: number;
  price: string;
  total_page: number;
  thickness: string;
  created_at: Date;
  updated_at: Date;
  category_id: number;
}


export interface Category {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface CategoryWithBooks extends Category {
  books: Book[];
}
