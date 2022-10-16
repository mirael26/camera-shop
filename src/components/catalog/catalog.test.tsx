import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRedux } from '../../test/helpers/renderWithRedux';
import { productsMock } from '../../test/mocks';
import axios from 'axios';
import Catalog from './catalog';

jest.mock('axios');
type TAxiosMocked = jest.Mocked<typeof axios>;

describe('Catalog', () => {
  afterEach(() => {
      jest.clearAllMocks();
  })

  test('Render correctly', () => {
    (axios as TAxiosMocked).get.mockResolvedValue({ data: null });
    const catalog = renderWithRedux(
      <MemoryRouter>
        <Catalog/>
      </MemoryRouter>);
    expect(catalog).toMatchSnapshot();
  });

  test('Render correct products count', async() => {
    (axios as TAxiosMocked).get.mockResolvedValue({ data: productsMock });
    renderWithRedux(
      <MemoryRouter>
        <Catalog/>
      </MemoryRouter>);
    const cards = await screen.findAllByTestId('product-card');
    expect(cards).toHaveLength(3);
    expect(axios.get).toBeCalledTimes(1);
  });

  test('Don\'t render if no products', async() => {
    (axios as TAxiosMocked).get.mockResolvedValue({ data: [] });
    renderWithRedux(
      <MemoryRouter>
        <Catalog/>
      </MemoryRouter>);
    const card = await screen.queryByTestId('product-card');
    expect(card).not.toBeInTheDocument();
  });
});
