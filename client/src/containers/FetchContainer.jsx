import { PureComponent } from 'react';
import PropTypes from "prop-types";


const controller = new AbortController();


export class FetchContainer extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
  };

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
    controller.abort();
  }

  async fetchData() {
    const { url } = this.props;

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (response.ok) {
        const data = await response.json();
        this.setState({ data });
      }
    } catch(err) {
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
