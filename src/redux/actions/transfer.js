import {ACTION_STRING} from './actionsString';
export const transferDetail = (data) => {
  return {
    type: ACTION_STRING.dataTransfer,
    payload: {data},
  };
};
