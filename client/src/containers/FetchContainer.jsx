import { PureComponent } from 'react';
import PropTypes from "prop-types";


export class FetchContainer extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
  };

  abortController = new AbortController();

  state = {
    data: null,
    error: null,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props;
    if (url && url !== prevProps.url) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  async fetchData() {
    const { url } = this.props;

    try {
      const response = await fetch(url, { signal: this.abortController.signal });
      if (response.ok) {
        const data = await response.json();
        this.setState({ data });
      }
    } catch(err) {
      if (err.name === 'AbortError') return;
      this.setState({error: err})
    }
  }


  render() {
    const { error, data } = this.state;
    const { children } = this.props;

    if(data && !error) return children(data);

    return children(null);
  }
}
