import { useEffect, useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import { makeStyles } from "@material-ui/core/styles";

import "./HostDetails.scss";
const useStyles = makeStyles((theme) => ({
  email: {
    fontSize: "2em",
  },
  name: {
    fontSize: "1.2em",
  },
}));

const HostDetails = (props) => {
  const { id, image, name } = props.owner;
  const [avgRating, setAvgRating] = useState(0);
  const classes = useStyles();

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
        <div className={classes.name}>{name}</div>
        <Link to={(location) => `/messages?contactId=${id}`}>
          <EmailIcon className={classes.email}></EmailIcon>
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
