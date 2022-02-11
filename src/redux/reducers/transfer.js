import {ACTION_STRING} from 'src/redux/actions/actionsString';
const initialState = {
  dataTransfer: null,
};

const transferReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case ACTION_STRING.dataTransfer:
      const data = action.payload;
      return {
        ...data,
      };
    default:
      return prevState;
  }
};

export default transferReducer;
