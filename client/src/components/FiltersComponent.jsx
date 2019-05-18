import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';


export class FiltersComponent extends Component {
  static propTypes = {
    filters: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  checked = {};

  onInputChange = (e) => {
    const { name, checked } = e.target;
    const { onChange } = this.props;
    const result = [];
    this.checked[name] = checked;

    Object.entries(this.checked).forEach(([name, isChecked]) => {
      if (isChecked) result.push(name);
    });

    onChange(result);
  };

  render() {
    const { filters } = this.props;

    return (
      <Fragment>
        {
          filters.map((f) => (
            <div className="form-check form-check-inline" key={f}>
              <span className="badge badge-info p-2">
                <input type="checkbox" className="form-check-input" id={f} name={f} onChange={this.onInputChange}/>
                <label className="form-check-label" htmlFor={f}>{f}</label>
              </span>
            </div>
          ))
        }
      </Fragment>
    )
  }
}
