import { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

import "./HostDetails.scss";

const HostDetails = (props) => {
  const { email, id, image, name } = props.owner;
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const getHostReviews = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/reviews?hostId=${id}`);

          const rating = Math.floor(
            response.data.reduce((acc, curr) => curr.rating + acc, 0) /
              response.data.length
          );
          if (isNaN(rating)) {
            setAvgRating(0);
          } else {
            setAvgRating(rating);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    getHostReviews();
  }, [id]);

  return (
    <div className="host-details">
      <img className="host-details__image" src={image} alt="host's avatar" />
      <div className="host-details__details">
        <Link to={(location) => `/messages?contactId=${id}`}>
          <div>{name}</div>
        </Link>
      </div>
      {avgRating !== 0 && (
        <div className="host-details__reviews">
          <ReactStars
            count={5}
            size={36}
            activeColor="#ffd700"
            value={avgRating}
            edit={false}
          />
        </div>
      )}
    </div>
  );
};

export default HostDetails;
