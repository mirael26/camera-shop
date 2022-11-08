import { fireEvent, screen } from '@testing-library/react';
import { AppUrl, CameraType, Category } from '../../../consts';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import TypeFilter from './type-filter';

describe('TypeFilter component', () => {
  test('renders unchecked checkboxes after init', () => {
    renderWithReduxAndRouter(<TypeFilter/>);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(4);
    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());
  });

  test('checks checkboxes correctly from params', () => {
    renderWithReduxAndRouter(<TypeFilter/>, { route: `${AppUrl.Catalog}?type=${CameraType.Digital}&type=${CameraType.Film}&type=${CameraType.Instant}&type=${CameraType.Collectible}`});

    const digitalCheckbox = screen.getAllByRole('checkbox')[0];
    const filmCheckbox = screen.getAllByRole('checkbox')[1];
    const instantCheckbox = screen.getAllByRole('checkbox')[2];
    const collectibleCheckbox = screen.getAllByRole('checkbox')[3];
    expect(digitalCheckbox).toBeChecked();
    expect(filmCheckbox).toBeChecked();
    expect(instantCheckbox).toBeChecked();
    expect(collectibleCheckbox).toBeChecked();
  });

  test('checks checkboxes correctly after click', () => {
    renderWithReduxAndRouter(<TypeFilter/>, { route: AppUrl.Catalog });

    const digitalCheckbox = screen.getAllByRole('checkbox')[0];
    expect(digitalCheckbox).not.toBeChecked();

    fireEvent.click(digitalCheckbox);
    expect(digitalCheckbox).toBeChecked();
  });

  test('disables "film" and "instant" type if only "videocamera" category is selected', () => {
    renderWithReduxAndRouter(<TypeFilter/>, { route: `${AppUrl.Catalog}?category=${Category.VideoCamera}` });

    const filmCheckbox = screen.getAllByRole('checkbox')[1];
    const instantCheckbox = screen.getAllByRole('checkbox')[2];
    expect(filmCheckbox).toBeDisabled();
    expect(instantCheckbox).toBeDisabled();
  });
});
