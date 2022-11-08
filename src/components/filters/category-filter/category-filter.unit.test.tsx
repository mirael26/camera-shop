import { fireEvent, screen } from '@testing-library/react';
import { AppUrl, Category } from '../../../consts';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import CategoryFilter from './category-filter';

describe('CagetoryFilter component', () => {
  test('renders unchecked checkboxes after init', () => {
    renderWithReduxAndRouter(<CategoryFilter/>);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);
    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());
  });

  test('checks checkboxes correctly from params', () => {
    renderWithReduxAndRouter(<CategoryFilter/>, { route: `${AppUrl.Catalog}?category=${Category.Camera}&category=${Category.VideoCamera}`});

    const cameraCheckbox = screen.getAllByRole('checkbox')[0];
    const videocameraCheckbox = screen.getAllByRole('checkbox')[1];
    expect(cameraCheckbox).toBeChecked();
    expect(videocameraCheckbox).toBeChecked();
  });

  test('checks checkboxes correctly after click', () => {
    renderWithReduxAndRouter(<CategoryFilter/>, { route: AppUrl.Catalog });

    const cameraCheckbox = screen.getAllByRole('checkbox')[0];
    expect(cameraCheckbox).not.toBeChecked();

    fireEvent.click(cameraCheckbox);
    expect(cameraCheckbox).toBeChecked();
  });
});
