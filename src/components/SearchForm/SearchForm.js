import React, { useState } from 'react';
import {
  Button,
  Form,
  TextInput,
  Select,
  SelectItem,

} from 'carbon-components-react';
import EUtilsClient from '../../api/clients/eutils-client';
import * as actions from '../../actions';

const SearchForm = (props) => {
  const { dispatch } = props;
  const [searchTerm, setSearchTerm] = useState();
  const [dateRange, setDateRange] = useState();

  const eUtilsClient = new EUtilsClient();

  const getYearsFromDateRange = (range) => {
    switch (range) {
      case '5-years':
        return [2020, 2019, 2018, 2017, 2016];
      case '10-years':
        return [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011];
      default:
        return [2020, 2019, 2018, 2017, 2016];
    }
  };

  const fetchTrendData = async (event) => {
    if (searchTerm) {
      dispatch(actions.setIsLoading(true));
      const years = getYearsFromDateRange(dateRange);
      console.log(`Fetching Trend data for years ${years}`);
      try {
        event.preventDefault();

        // fetch years, staggered to avoid rate limits
        const trendData = await Promise.all(years.map(async (year, index) => {
          await new Promise((res) => setTimeout(res, 600 * (index + 1)));
          const data = await eUtilsClient.queryESearch('pubmed', `${searchTerm}+AND+${year}`, 365, 'pdat', 100000, 'Count');
          return Promise.resolve({ year, count: Number(data.esearchresult.count) });
        }));

        dispatch(actions.setTrendData(trendData.sort((a, b) => a.year - b.year)));
      } catch (err) {
        console.log(err);
      }
      dispatch(actions.setIsLoading(false));
    }
  };

  return (
    <Form className="search-form">
      <TextInput
        id="trend-search"
        labelText="Search Term"
        placeholder="Search"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <Select
        id="date-range-select"
        className="date-range-select"
        labelText="Date Range"
        onChange={(event) => setDateRange(event.target.value)}
      >
        <SelectItem value="5-years" text="Past 5 years" />
        <SelectItem value="10-years" text="2010 - present" />
      </Select>
      <Button
        type="submit"
        className="trend-search-button"
        onClick={(event) => fetchTrendData(event)}
      >
        Submit
      </Button>
    </Form>
  );
};

export default SearchForm;
