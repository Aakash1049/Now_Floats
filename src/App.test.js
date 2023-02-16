import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './components/Home';
import { BrowserRouter } from 'react-router-dom';


test('Favorite locations are displayed correctly on Home screen', () => {
  const favorites = ['New York', 'London', 'Paris'];
  localStorage.setItem('favorites', JSON.stringify(favorites));
  render(
    <BrowserRouter>
  <Home />
    </BrowserRouter>
  );
  favorites.forEach((favorite) => {
    expect(screen.getByText(favorite)).toBeInTheDocument();
  });
});
