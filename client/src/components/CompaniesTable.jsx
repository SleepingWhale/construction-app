import React from 'react';

import PropTypes from 'prop-types';


export const CompaniesTable = ({ companies }) => {
  return (
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
  );
};

CompaniesTable.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.string,
      picture: PropTypes.string,
      companyName: PropTypes.string,
      city: PropTypes.string,
      specialty: PropTypes.arrayOf(PropTypes.string)
    }
  ))
};

CompaniesTable.defaultProps = {
  companies: [],
};
