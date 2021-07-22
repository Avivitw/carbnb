import { useContext, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Button,
  Dialog,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  DialogActions,
  DialogContentText,
  TextField,
  Snackbar,
  FormControl,
  Checkbox,
  Grid,
  Select,
  Container,
  InputLabel,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

// select
import { authContext } from "../../providers/authProvider";

const useStyles = makeStyles((theme) => ({
  avail: {
    padding: "20px",
    borderRadius: "15px",
    boxShadow: theme.shadows[5],
  },
  paper: {
    margin: theme.spacing(2),
  },
  title: {
    marginBottom: "30px",
    padding: "10px",
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120,
  },
  select: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  trans: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    padding: "10px",
    fontSize: "12pt",
  },
  buttoncancel: {
    marginTop: theme.spacing(2),
    padding: "10px",
    fontSize: "12pt",
  },
}));

const colours = [
  "Beige",
  "Black",
  "Blue",
  "Brown",
  "Green",
  "Grey",
  "Orange",
  "Purple",
  "Red",
  "Silver",
  "White",
  "Yellow",
];

const fuels = ["Petrol", "Diesel", "Hybrid", "Electric", "Other"];

const AddVehicle = (props) => {
  const { open, close, locations, vehiclesUpdated } = props;
  const classes = useStyles();
  const { auth, user } = useContext(authContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [modelYear, setModelYear] = useState(new Date().getFullYear());
  const [doors, setDoors] = useState(""); // might need to change this
  const [colour, setColour] = useState("");
  const [fuel, setFuel] = useState("");
  const [seats, setSeats] = useState(2);
  const [transmission, setTransmission] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [checkState, setCheckState] = useState({
    sport: false,
    luxury: false,
    truck: false,
    van: false,
    miniVan: false,
    rv: false,
    suv: false,
    convertible: false,
    economy: false,
    petFriendly: false,
  });
  const [snackOpen, setSnackOpen] = useState(false);
  const [locationField, setLocationField] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // User should not be able to get to this point
    if (!auth) {
      setErrorMessage("You must be logged in to register a vehicle");
      return;
    }

    const {
      petFriendly,
      sport,
      truck,
      van,
      miniVan,
      luxury,
      rv,
      suv,
      convertible,
      economy,
    } = checkState;

    const content = {
      userId: user.id,
      locationId: locationField,
      make,
      model,
      doors,
      colour,
      transmission,
      description,
      fuel,
      seats,
      image,
      petFriendly,
      sport,
      truck,
      van,
      miniVan,
      luxury,
      rv,
      suv,
      convertible,
      economy,
      modelYear,
    };

    try {
      const response = await axios.post("/api/cars", content);

      // Update car state in parent with newly created car
      vehiclesUpdated(response.data);
      // console.log(typeof handleVehiclesUpdated);

      setSnackOpen(true);
      handleClose();
    } catch (err) {
      console.log("Error registering new car", err);
    }
  };

  const handleClose = () => {
    // Set form fields to default values;
    setMake("");
    setModel("");
    setModelYear(new Date().getFullYear());
    setDoors("");
    setColour("");
    setFuel("");
    setSeats("");
    setTransmission("");
    setDescription("");
    setImage("");
    setCheckState({
      sport: false,
      luxury: false,
      truck: false,
      van: false,
      miniVan: false,
      rv: false,
      suv: false,
      convertible: false,
      economy: false,
      petFriendly: false,
    });

    // Close the dialog
    close(false);
  };

  const handleCheckChange = (event) => {
    setCheckState({ ...checkState, [event.target.name]: event.target.checked });
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <div>
      <Dialog
        className={classes.paper}
        open={open}
        onClose={handleClose}
        aria-labelledby="login-dialog"
      >
        <Container className={classes.avail} maxWidth="sm">
          <DialogTitle id="login-dialog" className={classes.title}>
            Register Vehicle
          </DialogTitle>
          <Grid container spacing={3}>
            <form id="register-vehicle-form" onSubmit={handleSubmit}>
              {errorMessage && (
                <DialogContentText>{errorMessage}</DialogContentText>
              )}
              <Grid item xs={8}>
                <FormControl fullWidth={true}>
                  <InputLabel id="demo-simple-select-label">
                    Select Location
                  </InputLabel>

                  <Select
                    className={classes.select}
                    autoFocus
                    margin="dense"
                    id="rvehicle-location"
                    label="Location"
                    value={locationField}
                    onChange={(event) => setLocationField(event.target.value)}
                    required
                  >
                    {locations.map((loc) => (
                      <MenuItem key={loc.id} value={loc.id}>
                        {`${loc.street_number} ${loc.street} ${loc.city}, ${loc.province}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={8}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="rvehicle-make"
                  label="Make"
                  type="text"
                  value={make}
                  onChange={(event) => setMake(event.target.value)}
                  fullWidth={true}
                  required
                />
              </Grid>

              <Grid item xs={8}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="rvehicle-model"
                  label="Model"
                  type="text"
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                  fullWidth={true}
                  required
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="rvehicle-seats"
                  label="Model Year"
                  type="number"
                  inputProps={{
                    min: 1900,
                    max: new Date().getFullYear() + 1,
                    step: 1,
                  }}
                  value={modelYear}
                  onChange={(event) => setModelYear(event.target.value)}
                  fullWidth={true}
                  required
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="rvehicle-seats"
                  label="Number of Seats"
                  type="number"
                  inputProps={{ min: 1, step: 1 }}
                  value={seats}
                  onChange={(event) => setSeats(event.target.value)}
                  fullWidth={true}
                  required
                />
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth={true}>
                  <InputLabel id="demo-simple-select-label">
                    Select No.of Doors
                  </InputLabel>

                  <Select
                    className={classes.select}
                    autoFocus
                    margin="dense"
                    id="rvehicle-doors"
                    label="Number of Doors"
                    value={doors}
                    onChange={(event) => setDoors(event.target.value)}
                    fullWidth={true}
                    required
                  >
                    {[2, 4].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth={true}>
                  <InputLabel id="demo-simple-select-label">
                    Select Colour
                  </InputLabel>

                  <Select
                    className={classes.select}
                    autoFocus
                    margin="dense"
                    id="rvehicle-colours"
                    label="Select Colour"
                    value={colour}
                    onChange={(event) => setColour(event.target.value)}
                    fullWidth={true}
                    required
                  >
                    {colours.map((col) => (
                      <MenuItem key={col} value={col}>
                        {col}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth={true}>
                  <InputLabel id="demo-simple-select-label">
                    Select Fuel Type
                  </InputLabel>

                  <Select
                    className={classes.select}
                    autoFocus
                    margin="dense"
                    id="rvehicle-fuel"
                    label="Select Fuel Type"
                    value={fuel}
                    onChange={(event) => setFuel(event.target.value)}
                    fullWidth={true}
                    required
                  >
                    {fuels.map((f) => (
                      <MenuItem key={f} value={f}>
                        {f}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  component="fieldset"
                  fullWidth={true}
                  className={classes.trans}
                >
                  <FormLabel component="legend">Transmission</FormLabel>
                  <RadioGroup
                    aria-label="transmission type"
                    name="vtransmission"
                    value={transmission}
                    onChange={(event) => setTransmission(event.target.value)}
                    row
                  >
                    <FormControlLabel
                      value="automatic"
                      control={<Radio />}
                      label="Automatic"
                    />
                    <FormControlLabel
                      value="manual"
                      control={<Radio />}
                      label="Manual"
                    />
                    <FormControlLabel
                      value="dct"
                      control={<Radio />}
                      label="Dual Clutch"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <FormControl fullWidth={true} className={classes.trans}>
                <FormLabel component="legend">Vehicle Information</FormLabel>
                <FormGroup row>
                  <Grid item xs={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkState.sport}
                          onChange={handleCheckChange}
                          name="sport"
                        />
                      }
                      label="Sport"
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkState.luxury}
                          onChange={handleCheckChange}
                          name="luxury"
                        />
                      }
                      label="Luxury"
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkState.economy}
                          onChange={handleCheckChange}
                          name="economy"
                        />
                      }
                      label="Economy"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkState.truck}
                          onChange={handleCheckChange}
                          name="truck"
                        />
                      }
                      label="Truck"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkState.van}
                          onChange={handleCheckChange}
                          name="van"
                        />
                      }
                      label="Van"
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkState.miniVan}
                          onChange={handleCheckChange}
                          name="miniVan"
                        />
                      }
                      label="Mini Van"
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkState.rv}
                          onChange={handleCheckChange}
                          name="rv"
                        />
                      }
                      label="RV"
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkState.suv}
                          onChange={handleCheckChange}
                          name="suv"
                        />
                      }
                      label="SUV"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkState.convertible}
                          onChange={handleCheckChange}
                          name="convertible"
                        />
                      }
                      label="Convertible"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkState.petFriendly}
                          onChange={handleCheckChange}
                          name="petFriendly"
                        />
                      }
                      label="Pet Friendly"
                    />
                  </Grid>
                </FormGroup>
              </FormControl>

              <Grid item xs={12}>
                <TextField
                  id="rvehicle-description"
                  label="Description"
                  inputProps={{ minLength: 10 }}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  multiline
                  rows={3}
                  fullWidth={true}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="rvehicle-image"
                  label="Image URL"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  fullWidth={true}
                  required
                />
              </Grid>

              <DialogActions>
                <Button
                  className={classes.button}
                  onClick={handleClose}
                  variant="contained"
                  color="secondary"
                  style={{ borderRadius: 5 }}
                >
                  Cancel
                </Button>
                <Button
                  className={classes.button}
                  type="submit"
                  form="register-vehicle-form"
                  variant="contained"
                  color="secondary"
                  style={{ borderRadius: 5 }}
                >
                  Register
                </Button>
              </DialogActions>
            </form>
          </Grid>
        </Container>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <MuiAlert
          onClose={handleCloseSnack}
          severity="success"
          elevation={6}
          variant="filled"
        >
          Successfully registered new car
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AddVehicle;
