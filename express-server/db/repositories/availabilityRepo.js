const db = require('../index');

// Retrieve all availabilities, or all availabilities for a specific owner
exports.getAllAvailabilitiesAsync = (ownerId) => {
  let queryText = `
    SELECT availability.*, name, email, phone, make, model
    FROM availability
    JOIN users ON owner_id = users.id
    JOIN cars ON car_id = cars.id
  `;
  const queryParams = [];

  if (ownerId) {
    queryText += 'WHERE owner_id = $1';
    queryParams.push(ownerId);
  }

  queryText += ';';

  return db.query(queryText, queryParams);
};

// Create a new availability.  Pass in availability column data except id.
exports.createAvailabilityAsync = data => {
  const queryText = `
    INSERT INTO availability (
      location_id,
      owner_id,
      start_date,
      end_date,
      delivery,
      car_id,
      price
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const queryParams = [
    data.locationId,
    data.ownerId,
    data.startDate,
    data.endDate,
    data.delivery,
    data.carId,
    data.price
  ];
  return db.query(queryText, queryParams);
};

// Delete an availability with a given id
exports.deleteAvailabilityAsync = id => {
  const queryText = 'DELETE FROM availability WHERE id = $1';
  const queryParams = [id];
  return db.query(queryText, queryParams);
}

// Update an availability.  Pass in th availability id, and all availability fields.
exports.updateAvailabilityWithIdAsync = (id, data) => {
  const queryParams = [];

  let setItems = '';
  let values = '';
  for (const key of Object.keys(data)) {
    if (['id', 'ownerId'].includes(key)) {
      continue;
    }

    // Account for camelCase input and snake_case db columns
    switch (key) {
      case 'locationId':
        setItems += 'location_id, ';
        queryParams.push(data[key]);
        values += `$${queryParams.length}, `;
        break;
      case 'carId':
        setItems += 'car_id, ';
        queryParams.push(data[key]);
        values += `$${queryParams.length}, `;
        break;
      case 'startDate':
        setItems += 'start_date, ';
        queryParams.push(data[key]);
        values += `$${queryParams.length}, `;
        break;
      case 'endDate':
        setItems += 'end_date, ';
        queryParams.push(data[key]);
        values += `$${queryParams.length}, `;
        break;
      default:
        setItems += `${key}, `;
        queryParams.push(data[key]);
        values += `$${queryParams.length}, `;
        break;
    }
  }

  setItems = setItems.slice(0, -2);
  values = values.slice(0, -2);

  queryParams.push(id);

  queryText = `
    UPDATE availability SET (${setItems}) = (${values})
    WHERE id = $${queryParams.length};
  `;
  return db.query(queryText, queryParams);
};