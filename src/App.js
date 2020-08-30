import React, { createContext } from 'react';
import './App.scss';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import HeaderBar from './components/HeaderBar';
import TrendsPage from './content/TrendsPage';

const AppContext = createContext(null);

function App() {

  return (
    <>
      <HeaderBar />
      <Content>
        <TrendsPage />
      </Content>
    </>
  );
}

export default App;
