import { fireEvent, screen } from '@testing-library/react';
import { AppUrl, Level } from '../../../consts';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import LevelFilter from './level-filter';

describe('LevelFilter component', () => {
  test('renders unchecked checkboxes after init', () => {
    renderWithReduxAndRouter(<LevelFilter/>);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());
  });

  test('checks checkboxes correctly from params', () => {
    renderWithReduxAndRouter(<LevelFilter/>, { route: `${AppUrl.Catalog}?level=${Level.Beginner}&level=${Level.Amateur}&level=${Level.Professional}`});

    const beginnerCheckbox = screen.getAllByRole('checkbox')[0];
    const amateurCheckbox = screen.getAllByRole('checkbox')[1];
    const professionalCheckbox = screen.getAllByRole('checkbox')[2];
    expect(beginnerCheckbox).toBeChecked();
    expect(amateurCheckbox).toBeChecked();
    expect(professionalCheckbox).toBeChecked();
  });

  test('checks checkboxes correctly after click', () => {
    renderWithReduxAndRouter(<LevelFilter/>, { route: AppUrl.Catalog });

    const beginnerCheckbox = screen.getAllByRole('checkbox')[0];
    expect(beginnerCheckbox).not.toBeChecked();

    fireEvent.click(beginnerCheckbox);
    expect(beginnerCheckbox).toBeChecked();
  });
});
