import { fireEvent, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { Modal } from '../consts';
import { createReduxStore } from '../store/store';
import { useAppDispatch } from './use-app-dispatch';
import { useModalClose } from './use-modal-close';

jest.mock('./use-app-dispatch', () => ({ useAppDispatch: jest.fn() }));
let spyDispatch: () => any;

describe('useModalClose', () => {
  beforeEach(() => {
    spyDispatch = jest.fn();
    jest.mocked(useAppDispatch).mockImplementation(() => spyDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks()
  });

  test('handles escape-keydown event correctly', async () => {

    const cleanCallback = jest.fn();
    const store = createReduxStore();
    const wrapper = ({ children }: {children: JSX.Element | null}) => (<Provider store={store}>{children}</Provider>);
    const view = renderHook(() => useModalClose({ modalName: Modal.AddToCart, cleanCallback: cleanCallback}), { wrapper });

    expect(cleanCallback).toHaveBeenCalledTimes(0);
    
    await userEvent.keyboard('{Shift}');
    expect(cleanCallback).toHaveBeenCalledTimes(0);
    expect(spyDispatch).toHaveBeenCalledTimes(0);

    await userEvent.keyboard('{Escape}');
    expect(cleanCallback).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledTimes(1);
  });

  test('handles back event correctly', () => {

    const cleanCallback = jest.fn();
    const store = createReduxStore();
    const wrapper = ({ children }: {children: JSX.Element | null}) => (<Provider store={store}>{children}</Provider>);
    const view = renderHook(() => useModalClose({ modalName: Modal.AddToCart, cleanCallback: cleanCallback}), { wrapper });

    expect(cleanCallback).toHaveBeenCalledTimes(0);

    fireEvent.popState(window);
    expect(cleanCallback).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledTimes(1);

    view.unmount();
  });

  test('unmounts correctly', async () => {
    const cleanCallback = jest.fn();
    const store = createReduxStore();
    const wrapper = ({ children }: {children: JSX.Element | null}) => (<Provider store={store}>{children}</Provider>);
    const view = renderHook(() => useModalClose({ modalName: Modal.AddToCart, cleanCallback: cleanCallback}), { wrapper });

    await userEvent.keyboard('{Escape}');
    expect(cleanCallback).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledTimes(1);

    jest.spyOn(document, 'removeEventListener');
    jest.spyOn(window, 'removeEventListener');
    view.unmount();
    expect(document.removeEventListener).toHaveBeenCalledTimes(1);
    expect(window.removeEventListener).toHaveBeenCalledTimes(1);

    await userEvent.keyboard('{Escape}');
    expect(cleanCallback).toHaveBeenCalledTimes(1);
    expect(spyDispatch).toHaveBeenCalledTimes(1);
  });
});
