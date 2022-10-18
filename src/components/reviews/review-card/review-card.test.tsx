import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { reviewsMock } from '../../../test/mocks';
import ReviewCard from './review-card';

const mock = reviewsMock[0];

describe('ReviewCard', () => {
  test('Render correctly', () => {
    const reviews = renderWithReduxAndRouter(<ReviewCard review={mock}/>);
    expect(reviews).toMatchSnapshot();
  });

  test('Display review data correctly', () => {
    renderWithReduxAndRouter(<ReviewCard review={reviewsMock[0]}/>);
    
    expect(screen.getByText(/Оценка/i)).toHaveTextContent((mock.rating).toString());
    expect(screen.getByTestId('review-advantage')).toHaveTextContent(mock.advantage);
    expect(screen.getByTestId('review-disadvantage')).toHaveTextContent(mock.disadvantage);
    expect(screen.getByTestId('review-review')).toHaveTextContent(mock.review);
    expect(screen.getByTestId('review-date')).toHaveTextContent(/17 октября/i);
  });
});
