export const defaultState = {
  trendData: [],
  isLoading: false,
};

export default function formReducer(state, action) {
  switch (action.type) {
    case 'setTrendData': {
      return {
        ...state,
        trendData: action.trendData,
      };
    }
    case 'setIsLoading': {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
