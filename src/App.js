import React from 'react';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import './App.css';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.REACT_APP_TYPESENSE_KEY, // Be sure to use the search-only-api-key
    nodes: [
      {
        host: 'alkes-api.trustmedis.id',
        port: '443',
        protocol: 'https',
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    queryBy: 'product_name,product_desc_id,published_date',
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

function App() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">alkes-api-public</a>
        </h1>
        <p className="header-subtitle">Demo</p>
      </header>

      <div className="container">
        <InstantSearch searchClient={searchClient} indexName="alkes">
          <div className="search-panel">
            <div className="search-panel__results">
              <SearchBox
                className="searchbox"
                translations={{
                  placeholder: '',
                }}
              />
              <Hits hitComponent={Hit} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
        <div style={{ textAlign: 'center' }}>
          <p>
            Made with ❤️ by&nbsp;
            <a href="https://trustmedis.com">trustmedis</a>
          </p>
          <p>
            <a
              href="https://github.com/trustmedis/alkes-api-public/blob/master/GUIDELINES.md"
              className="href"
            >
              Documentation
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function Hit(props) {
  const hit = props.hit;
  return (
    <div>
      <div>TITLE : {hit.product_name}</div>
      <div>DESC : {hit.product_desc_id}</div>
      <div>REGISTERED: {hit.expired_date}</div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
