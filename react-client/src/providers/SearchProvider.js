import { useContext, createContext, useState, useEffect } from "react";
import { authContext } from "../providers/authProvider";

const axios = require("axios");

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export default function SearchProvider(props) {
  const { user } = useContext(authContext);

  ////////////////// Search state ///////////////////////

  const [search, setSearch] = useState({
    location: "",
    fromDate: new Date(tomorrow),
    toDate: new Date(tomorrow),
  });

  const setLocation = function (location) {
    setSearch((prev) => {
      return { ...prev, location };
    });
  };

  const setFromDate = function (fromDate) {
    setSearch((prev) => {
      return { ...prev, fromDate };
    });
  };

  const setToDate = function (toDate) {
    setSearch((prev) => {
      return { ...prev, toDate };
    });
  };

  ////////////////// Filters state //////////////////

  const [filters, setFilters] = useState({
    pets: false,
    rv: false,
    sport: false,
  });

  const setPets = function (pets) {
    setFilters((prev) => {
      return { ...prev, pets };
    });
  };

  const setRv = function (rv) {
    setFilters((prev) => {
      return { ...prev, rv };
    });
  };

  const setSport = function (sport) {
    setFilters((prev) => {
      return { ...prev, sport };
    });
  };

  ////////////////// Cars state ///////////////////////

  const [cars, setCars] = useState({
    rows: [],
  });

  // get all the cars for the search results
  useEffect(() => {
    if (search.location !== "") {
      axios
        .get("/api/cars", {
          params: {
            city: search.location,
            fromDate: search.fromDate,
            toDate: search.toDate,
          },
        })
        .then(function (response) {
          // handle success
          setCars((prev) => {
            return { ...prev, rows: response.data };
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [search]);

  //////////////////// Favourites //////////////
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`/api/favourites/${user.id}`)
        .then(function (response) {
          // handle success
          setFavourites(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [user]);

  const addFavourite = async (carId) => {
    if (user && user.id) {
      try {
        const response = await axios.post("/api/favourites", {
          userId: user.id,
          carId,
        });
        setFavourites((prev) => {
          return [...prev, response.data];
        });
        return { result: "success", error: null };
      } catch (err) {
        return { result: "failed", error: err };
      }
    }
  };

  const removeFavourite = async (carId) => {
    try {
      await axios.delete(`/api/favourites/${user.id}/${carId}`);
      setFavourites((prev) => {
        return [...prev].filter((item) => {
          return item.car_id !== carId;
        });
      });
      return { result: "success", error: null };
    } catch (err) {
      return { result: "failed", error: err };
    }
  };

  const searchData = {
    search,
    setSearch,
    setLocation,
    setFromDate,
    setToDate,
    filters,
    setFilters,
    setPets,
    setRv,
    setSport,
    cars,
    favourites,
    addFavourite,
    removeFavourite,
  };

  // We can use this component to wrap any content we want to share this context
  return (
    <searchContext.Provider value={searchData}>
      {props.children}
    </searchContext.Provider>
  );
}

export const searchContext = createContext();
