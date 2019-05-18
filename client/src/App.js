import React, { Component } from 'react';
import queryString from 'query-string';
import './App.css';
import { FiltersComponent } from  './components';

const FILTERS_STUB = ["Excavation", "Plumbing", "Electrical"];
const controller = new AbortController();

class App extends Component {
  state = {
    companies: [],
    isLoading: false,
    searchInput: '',
    selectedFilters: [],
  };

  componentDidMount() {
    this.getData({});
  }

  componentWillUnmount() {
    controller.abort();
  }

  getData = ({
    searchInput = this.state.searchInput,
    selectedFilters = this.state.selectedFilters
  }) => {
    const queryParams = queryString.stringify({
      search: searchInput,
      filters: selectedFilters,
    }, { arrayFormat: 'bracket'});

    fetch(`/companies?${queryParams}`, {
      signal: controller.signal
    })
      .then((resp) => resp.json())
      .then((data) => {
        const { companies } = data;
        this.setState({ companies });
      })
      .catch(function(ex) {
      if (ex.name === 'AbortError') {
        console.log('request aborted')
      }
    })
  };

  onInputChange = (e) => {
    const { value } = e.target;

    this.setState({
      searchInput: value,
    });

    this.getData({ searchInput: value });
  };

  onFiltersChange = (selectedFilters) => {
    this.setState({
      selectedFilters,
    });

    this.getData({ selectedFilters });
  };

  render() {
    const { companies, searchInput } = this.state;

    return (
      <div className="container py-3">
        <form>
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
          <FiltersComponent filters={FILTERS_STUB} onChange={this.onFiltersChange}/>
          <table className="table">
            <thead>
            <tr>
              <th scope="col"/>
              <th scope="col">Company name</th>
              <th scope="col">City</th>
              <th scope="col">Specialty</th>
            </tr>
            </thead>
            <tbody>
            {
              companies.map(({
                id, picture, companyName, city, specialty,
              }) => (
                <tr key={id}>
                  <th scope="row">
                    <img src={picture} alt={companyName} />
                  </th>
                  <td>{companyName}</td>
                  <td>{city}</td>
                  <td>
                    {
                      specialty.map((s, i) => (<div key={i}>{s}</div>))
                    }
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default App;
