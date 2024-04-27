import React, { useCallback, useEffect, useState } from "react";
import "./index.css";
import Pagination from "./pagination.jsx";
import { DEFAULT_PER_PAGE } from "./constants.js";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";

let options = {
  url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
  method: "GET",
  params: { countryIds: "IN", namePrefix: "", limit: DEFAULT_PER_PAGE },
  headers: {
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    "x-rapidapi-key": "5ab394a9a2msh522061f229c3be2p119469jsn851c247ce7af",
  },
};

const Table = () => {
  const [countries, setCountries] = useState({
    data: [],
    metadata: {},
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [search, setSearch] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchCountriesData = useCallback(
    async (search = "") => {
      try {
        if (!perPage) return;
        setLoading(true);
        options = {
          ...options,
          params: {
            ...options.params,
            offset: currentPage,
            limit: perPage,
            namePrefix: search,
          },
        };
        let { data } = await axios.request(options);

        setCountries({ data: data?.data, metadata: data?.metadata });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [currentPage, perPage]
  );

  const onSearchValue = (value) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setSearch(value);
    const delay = setTimeout(() => {
      setCurrentPage(0);
      fetchCountriesData(value);
    }, 500);

    setTypingTimeout(delay);
  };

  useEffect(() => {
    fetchCountriesData();
  }, [fetchCountriesData]);

  return (
    <div className="table-container">
      <input
        className="search-box"
        value={search}
        placeholder="Search places..."
        onChange={(e) => onSearchValue(e?.target?.value)}
      />
      <table className={isLoading && "loading"}>
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {countries?.data?.map((item, index) => (
            <tr key={item?.id}>
              <td className="table-index">{index + 1}</td>
              <td>{item?.name}</td>
              <td>{item?.country}</td>
            </tr>
          ))}
          <SpinnerCircular enabled={isLoading} className="spinner" />
        </tbody>
      </table>

      {!countries?.data?.length && !isLoading && (
        <div className="no-result">No Result Found</div>
      )}
      <Pagination
        totalCount={countries?.metadata?.totalCount}
        currentOffset={countries?.metadata?.currentOffset}
        setCurrentPage={setCurrentPage}
        perPage={perPage}
        setPerPage={setPerPage}
      />
    </div>
  );
};

export default Table;
