import React from 'react';
import { shallow } from 'enzyme';
import { FetchContainer } from './FetchContainer';


const url = '/test';
const children = jest.fn();
const mockSuccessResponse = { test: 'test'};
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise, ok: true });
jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

const signal = jest.fn();
const abort = jest.fn();
function AbortController() {
  this.signal = signal;
  this.abort = abort;
}
jest.spyOn(global, 'AbortController').mockImplementation((AbortController));


describe('FetchContainer', () => {
  const component = shallow(<FetchContainer url={url}>{children}</FetchContainer>);

  it('fetches data from server and put to state', done => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(url, { signal });

    process.nextTick(() => {
      expect(component.state()).toEqual({
        data: mockSuccessResponse,
        error: null,
      });

      global.fetch.mockClear();
      done();
    });
  });

  it('passes data to children', () => {
    expect(children).toHaveBeenCalledWith(mockSuccessResponse);
  });

  it('cancel fetch on unmount', () => {
    component.unmount();
    expect(abort).toHaveBeenCalledTimes(1);
  });
});
