import { fireEvent, screen } from '@testing-library/react';
import { AppUrl } from '../../../consts';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import Sorts from './sorts';

describe('Sorts', () => {
  test('renders unchecked checkboxes after init', () => {
    renderWithReduxAndRouter(<Sorts/>, { route: AppUrl.Catalog});

    const radioInputs = screen.getAllByRole('radio');
    expect(radioInputs).toHaveLength(4);
    radioInputs.forEach((input) => expect(input).not.toBeChecked());
  });

  test('checks checkboxes correctly from params', () => {
    renderWithReduxAndRouter(<Sorts/>, { route: `${AppUrl.Catalog}?sort=price&order=desc`});

    expect(screen.getByLabelText(/по цене/i)).toBeChecked();
    expect(screen.getByLabelText(/по популярности/i)).not.toBeChecked();
    expect(screen.getByLabelText(/по возрастанию/i)).not.toBeChecked();
    expect(screen.getByLabelText(/по убыванию/i)).toBeChecked();
  });

  test('checks default sort-type correctly', () => {
    renderWithReduxAndRouter(<Sorts/>, { route: `${AppUrl.Catalog}?sort=price`});

    expect(screen.getByLabelText(/по цене/i)).toBeChecked();
    expect(screen.getByLabelText(/по возрастанию/i)).toBeChecked();
  });

  test('checks default sort-order correctly', () => {
    renderWithReduxAndRouter(<Sorts/>, { route: `${AppUrl.Catalog}?order=desc`});

    expect(screen.getByLabelText(/по цене/i)).toBeChecked();
    expect(screen.getByLabelText(/по убыванию/i)).toBeChecked();
  });

  test('checks checkboxes correctly after click', () => {
    renderWithReduxAndRouter(<Sorts/>, { route: `${AppUrl.Catalog}?sort=rating`});

    const priceSortInput = screen.getByLabelText(/по цене/i);
    const raitingSortInput = screen.getByLabelText(/по популярности/i);
    expect(priceSortInput).not.toBeChecked();
    expect(raitingSortInput).toBeChecked();

    fireEvent.click(priceSortInput);
    expect(priceSortInput).toBeChecked();
    expect(raitingSortInput).not.toBeChecked();
  });
});
