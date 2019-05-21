import React, { Component } from 'react';
import { FiltersComponent, CompaniesTableComponent } from  '../components';
import { InfinityLoadingContainer } from  '../containers';


export class CompanyList extends Component {
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

  clearInput = () => {
    this.setState({
      searchInput: '',
    });
  };

  onFiltersChange = (selectedFilters) => {
    this.setState({
      selectedFilters,
    });
  };

  render() {
    const { searchInput, selectedFilters } = this.state;
    const { filters } = this.props;

    return (
      <div className="container py-3">
        <div className="form-group">
          <label htmlFor="searchInput">Search for company</label>
          <div className="input-group">
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
            <div className="input-group-append">
              <button className="input-group-text rounded-0" onClick={this.clearInput}>&times;</button>
            </div>
          </div>
        </div>
        {
          filters && filters.length && (
            <div className="form-group">
              <FiltersComponent filters={filters} onChange={this.onFiltersChange} />
            </div>
          )
        }
        <InfinityLoadingContainer
          searchInput={searchInput}
          selectedFilters={selectedFilters}
          apiUrl='companies'
        >
          {({ data, hits }) => (<CompaniesTableComponent companies={data} hits={hits} />)}
        </InfinityLoadingContainer>
      </div>
    );
  }
}
