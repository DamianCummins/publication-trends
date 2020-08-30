export const defaultState = {
  trendData: [],
};

export default function formReducer(state, action) {
  switch (action.type) {
    case 'setTrendData': {
      return {
        ...state,
        trendData: action.trendData,
      };
    }
  }
}
