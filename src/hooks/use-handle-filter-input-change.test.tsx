import { ChangeEvent } from 'react';
import { useHandleFilterInputChange } from './use-handle-filter-input-change';

const setParamsSpy = jest.fn();

describe('useHandleFilterInputChange hook', () => {
  test('works correctly with checked button', () => {
    const params = new URLSearchParams();
    const mockEvent = {
      target: {
        name: 'camera',
        checked: true,
      }
    } as ChangeEvent<HTMLInputElement>;

    const handler = useHandleFilterInputChange('category', params, setParamsSpy);
    handler(mockEvent);

    expect(params.toString()).toBe('category=camera&page=1');
    expect(setParamsSpy).toHaveBeenCalledWith(params);
  });

  
  test('works correctly with unchecked button', () => {
    const params = new URLSearchParams('?category=camera&category=video');
    const mockEvent = {
      target: {
        name: 'camera',
        checked: false,
      }
    } as ChangeEvent<HTMLInputElement>;

    const handler = useHandleFilterInputChange('category', params, setParamsSpy);
    handler(mockEvent);

    expect(params.toString()).toBe('category=video&page=1');
    expect(setParamsSpy).toHaveBeenCalledWith(params);
  });

  test('resets page correctly', () => {
    const params = new URLSearchParams('?category=camera&page=5');
    const mockEvent = {
      target: {
        name: 'camera',
        checked: false,
      }
    } as ChangeEvent<HTMLInputElement>;

    const handler = useHandleFilterInputChange('category', params, setParamsSpy);
    handler(mockEvent);

    expect(params.toString()).toBe('page=1');
    expect(setParamsSpy).toHaveBeenCalledWith(params);
  });
});
