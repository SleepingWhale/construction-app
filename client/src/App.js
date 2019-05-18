import React from 'react';
import { CompanyList } from  './views';
import { FetchContainer } from  './containers';


export const App = () => {
  return (
    <FetchContainer url="/companies/filters">
      {(data) => (<CompanyList filters={data} />)}
    </FetchContainer>
  );
};
