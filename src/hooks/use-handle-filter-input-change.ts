import { ChangeEvent } from 'react';
import { deleteOneParam } from '../utils';

export const useHandleFilterInputChange = (filter: string, params: URLSearchParams, setParams: (params: URLSearchParams) => void) => {
  const handleFilterInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.target.checked;
    const name = evt.target.name;

    if (isChecked) {
      params.append(filter, name);
      setParams(params);
    } else {
      const newParams = deleteOneParam(filter, name, params);
      setParams(newParams);
    }
  };

  return handleFilterInputChange;
};
