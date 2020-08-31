import React, { createContext, useReducer } from 'react';
import { Loading } from 'carbon-components-react';
import SearchForm from '../../components/SearchForm';
import ChartCard from '../../components/ChartCard';
import BarChart from '../../components/BarChart';
import reducer, { defaultState } from '../../reducers';
import styles from './TrendsPage.scss';

const AppContext = createContext(null);
const TrendsPage = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="container">
        <h2>Visualise Disease Publication Trends</h2>

        <div className="titleCaption">
          <p>
            Use this tool to visualise year-by-year trends of the
            appearance of disease terms in research publications.
          </p>
          <p>
            {'Data sourced from '}
            <a href="http://www.ncbi.nlm.nih.gov/books/NBK25499/#chapter4">NCBI</a>
            .
          </p>
        </div>
        <SearchForm dispatch={dispatch} />
        <ChartCard title="Trends per Year">
          {state.isLoading && <Loading withOverlay={false} />}
          {state.trendData && state.trendData.length > 0
              && <BarChart data={state.trendData} />}
        </ChartCard>
      </div>
    </AppContext.Provider>
  );
};

export { AppContext, TrendsPage };
