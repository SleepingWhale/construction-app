import React, { PureComponent } from 'react';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroll-component';


const controller = new AbortController();

export class InfinityLoadingContainer extends PureComponent {
  state = {
    data: [],
    page: 0,
    pages: null,
    hits: 0,
    hasMore: true,
    error: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    controller.abort();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchInput, selectedFilters, apiUrl } = this.props;
    const { searchInput: prevSearchInput, selectedFilters: prevSelectedFilters, apiUrl: prevApiUrl } = prevProps;

    if (
      searchInput !== prevSearchInput
      || selectedFilters !== prevSelectedFilters
      || apiUrl !== prevApiUrl
    ) this.fetchData();
  }

  fetchData = async (nextPage = 0) => {
    const { searchInput, selectedFilters, apiUrl } = this.props;
    const { data: currentData } = this.state;
    const queryParams = queryString.stringify({
      search: searchInput,
      filters: selectedFilters,
      count: 10,
      page: nextPage,
    }, { arrayFormat: 'bracket'});

    try {
      const response = await fetch(
        `/${apiUrl}?${queryParams}`,
        { signal: controller.signal },
      );

      if (response.ok) {
        const {
          hits,
          page,
          pages,
          data,
        } = await response.json();

        this.setState({
          data: page > 0 ? [...currentData, ...data] : data,
          hits,
          page,
          pages,
          hasMore: page + 1 < pages,
        });
      } else {
        this.setState({ error: response.statusText })
      }
    }
    catch(err) {
      this.setState({error: err})
    }
  };

  fetchMoreData = () => {
    const { page } = this.state;

    this.fetchData(page + 1);
  };

  render() {
    const { data, hits, hasMore, error } = this.state;
    const { children } = this.props;

    if (error) return <div>{`Something went wrong. ${error}`}</div>;

    return (
      <InfiniteScroll
        dataLength={data.length}
        next={this.fetchMoreData}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
      >
        {children({ data, hits })}
      </InfiniteScroll>
    )
  }
}
