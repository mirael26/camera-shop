import { screen } from '@testing-library/react';
import { productsMock } from '../../test/mocks';
import axios from 'axios';
import Catalog from './catalog';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';

jest.mock('axios');
type TAxiosMocked = jest.Mocked<typeof axios>;

describe('Catalog', () => {
  afterEach(() => {
      jest.clearAllMocks();
  })

  test('Render correctly', () => {
    (axios as TAxiosMocked).get.mockResolvedValue({ data: null });
    const catalog = renderWithReduxAndRouter(<Catalog/>);
    expect(catalog).toMatchSnapshot();
  });

  test('Render correct products count', async() => {
    (axios as TAxiosMocked).get.mockResolvedValue({ data: productsMock });
    renderWithReduxAndRouter(<Catalog/>);
    const cards = await screen.findAllByTestId('product-card');
    expect(cards).toHaveLength(3);
    expect(axios.get).toBeCalledTimes(1);
  });

  test('Don\'t render if no products', async() => {
    (axios as TAxiosMocked).get.mockResolvedValue({ data: [] });
    renderWithReduxAndRouter(<Catalog/>);
    const card = await screen.queryByTestId('product-card');
    expect(card).not.toBeInTheDocument();
  });
});
