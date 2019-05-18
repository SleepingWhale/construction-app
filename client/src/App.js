import React, { Component } from 'react';
import { FiltersComponent, CompaniesTableComponent } from  './components';
import { InfinityLoadingContainer } from  './containers';

const FILTERS_STUB = ["Excavation", "Plumbing", "Electrical"];


class App extends Component {
  state = {
    searchInput: '',
    selectedFilters: [],
  };

  onInputChange = (e) => {
    const { value } = e.target;

    this.setState({
      searchInput: value,
    });
  };

  onFiltersChange = (selectedFilters) => {
    this.setState({
      selectedFilters,
    });
  };

  render() {
    const { searchInput, selectedFilters } = this.state;

    return (
      <div className="container py-3">
        <div className="form-group">
          <label htmlFor="searchInput">Search for company</label>
          <input
            type="text"
            className="form-control rounded-0"
            id="searchInput"
            placeholder="Start typing..."
            onChange={this.onInputChange}
            value={searchInput}
            autoComplete="off"
            maxLength={200}
          />
        </div>
        <div className="form-group">
          <FiltersComponent filters={FILTERS_STUB} onChange={this.onFiltersChange} />
        </div>
        <InfinityLoadingContainer
          searchInput={searchInput}
          selectedFilters={selectedFilters}
          apiUrl='companies'
        >
          {({ data }) => (<CompaniesTableComponent companies={data} />)}
        </InfinityLoadingContainer>
      </div>
    );
  }
}

export default App;
