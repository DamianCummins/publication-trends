import React, { createContext, useReducer } from 'react';
import { Loading } from 'carbon-components-react';
import SearchForm from '../../components/SearchForm';
import ChartCard from '../../components/ChartCard';
import BarChart from '../../components/BarChart';
import reducer, { defaultState } from '../../reducers';

const AppContext = createContext(null);
const TrendsPage = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <SearchForm dispatch={dispatch} />
      <ChartCard title="Trends per Year">
        {state.isLoading && <Loading withOverlay={false} />}
        {state.trendData && state.trendData.length > 0
            && <BarChart data={state.trendData} size={[500, 800]} />}
      </ChartCard>
    </AppContext.Provider>
  );
};

export { AppContext, TrendsPage };
