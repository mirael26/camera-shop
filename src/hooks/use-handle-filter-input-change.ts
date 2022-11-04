import { ChangeEvent } from 'react';
import { Param } from '../consts';
import { deleteOneParam } from '../utils';

const DEFAULT_PAGE = '1';

export const useHandleFilterInputChange = (filter: string, params: URLSearchParams, setParams: (params: URLSearchParams) => void) => {
  const handleFilterInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.target.checked;
    const name = evt.target.name;

    if (isChecked) {
      params.append(filter, name);
      params.set(Param.Page, DEFAULT_PAGE); // "обнуляем" страницу
      setParams(params);
    } else {
      const newParams = deleteOneParam(filter, name, params);
      newParams.set(Param.Page, DEFAULT_PAGE); // "обнуляем" страницу
      setParams(newParams);
    }
  };

  return handleFilterInputChange;
};
