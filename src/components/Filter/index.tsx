import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "reactstrap";

import {
  withAuthenticationRequired,
  Auth0ContextInterface,
  withAuth0,
} from "@auth0/auth0-react";
import authConfig from "../../auth_config.json";
import Loading from "../Loading";
import FilterList from "./FilterList";
import IUserFilter from "../../interfaces/IUserFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterOptions from "./FilterOptions";
import IFilterOption from "../../interfaces/IFilterOption";

interface FilterProps {
  auth0: Auth0ContextInterface;
}

interface ISynopsisColumn {
      colType: string;
      sample: string[];
      sampleHeader: string;
}

interface ISynopsis {
  columns?: ISynopsisColumn[],
  length?: number;
}

interface ICache {
  synopsis?: ISynopsis[] | null;
}

const FilterComponent: React.FC<FilterProps> = ({ auth0 }) => {
  const [userFilters, setUserFilters] = useState<IUserFilter[]>([]);
  const [optionsList, setOptionsList] = useState<IFilterOption[]>([]);
  const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const [cache, setCache] = useState<ICache>({});
  const [synopsis, setSynopsis] = useState<ISynopsis>({});

  const getSynopsis = async () => {

    const url = `${authConfig.apiBase}/synopsis`;
    const getAccessTokenSilently = await auth0.getAccessTokenSilently();

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAccessTokenSilently}`
      }
    });

    if (!response.ok) {
      console.log('error has occurred')
      const error = `An error has occurred: ${response.status}`;
      setErrorDetails(error)
      return;
    }
  
    const { data } = await response.json();

    setSynopsis(data)
    setCache({ ...cache, synopsis: data });
    // this.setState({ currentUser: data, loading: false });
  }

  useEffect(()=>{
    const newOptionsList:IFilterOption[]  = [];
    synopsis?.columns?.forEach(({sample, sampleHeader}) => {
      newOptionsList.push({sample, sampleHeader})
    })
    setOptionsList(newOptionsList)

  }, [synopsis])

  useEffect(() => {
    if (showSummary) {
      setTimeout(() => {
        setShowSummary(false);
      }, 2000);
    }
  }, [showSummary]);

  useEffect(() => {
    if (!cache.synopsis || cache.synopsis.length === 0) {
      (async () => {
        try {
          await getSynopsis();
          // setSynopsis(response.data.data.columns);
        } catch (error) {
          alert("Gateway timed out. Please try again.");
        }
      })();
    } else {
      setSynopsis(cache.synopsis);
    }
  }, []);

  return (
    <Container
      className="mb-5"
      onClick={() => {
        showFilterOptions && setShowFilterOptions(false);
      }}
    >
      {showSummary && (
        <Alert color="primary">
          <div>
            <h1>Filters</h1>
            <div className="">
              {userFilters.map(({ name, type, scoreType }) => (
                <div className="filters-summary">
                  <span>{name}</span>
                  <span>{type}</span>
                  <span>{scoreType}</span>
                </div>
              ))}
              <span></span>
            </div>
          </div>
        </Alert>
      )}
      {errorDetails!==null && (
        <Alert color="error">
          <div>
            <h1>Error</h1>
            <span>{errorDetails}</span>
          </div>
        </Alert>
      )}
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={8} className="filter-container">
          Filter - {JSON.stringify(userFilters)}
          <FilterList
            userFilters={userFilters}
            setUserFilters={setUserFilters}
          />
          <div className="add-filter-parent">
            <div className="d-flex add-filter-container">
              <div className="add-filter-icon-container">
                <FontAwesomeIcon icon={"plus"} />
              </div>
              <span
                className="ml-2"
                onClick={() => {
                  setShowFilterOptions(true);
                }}
              >
                Add Filter
              </span>
            </div>
            {showFilterOptions && (
              <FilterOptions
                optionsList={optionsList}
                setUserFilters={setUserFilters}
              />
            )}
          </div>
          <div>
            <button
              onClick={() => {
                setShowSummary(true);
              }}
            >
              Save Filters
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default withAuthenticationRequired(withAuth0(FilterComponent));
