// pages/BookDetailPage.tsx
import React from 'react';
import MyComponent from '../components/Mycomponents';

const BookDetailPage: React.FC = () => {
  const bookTitle = 'Sample Book Title';
  const bookDescription = 'This is a sample book description.';

  return (
    <div>
      <h1>Book Detail Page</h1>
      <MyComponent bookTitle={bookTitle} bookDescription={bookDescription} />
    </div>
  );
};

export default BookDetailPage;
