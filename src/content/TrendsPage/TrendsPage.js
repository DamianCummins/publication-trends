import React, { createContext, useReducer } from 'react';
import SearchForm from '../../components/SearchForm';
import ChartCard from '../../components/ChartCard';
import TimeSeriesChart from '../../components/TimeSeriesChart';
import BarChart from '../../components/BarChart';
import reducer, { defaultState } from '../../reducers';

const AppContext = createContext(null);
const TrendsPage = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <SearchForm dispatch={dispatch} />
      <ChartCard title="Trends per Year">
      {state.trendData
        && <BarChart data={state.trendData} size={[500, 500]} />}
      </ChartCard>
    </AppContext.Provider>
  );
};

export { AppContext, TrendsPage };
