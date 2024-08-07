import React, { useState } from 'react';
import Application from './Application';
import Volunteers from './Volunteers';

function VolunteerContainer() {
  const [volunteers, setVolunteers] = useState([]); // State to hold volunteer data

  // Function to add a new volunteer
  const addVolunteer = (newVolunteer) => {
    setVolunteers((prevVolunteers) => [...prevVolunteers, newVolunteer]);
  };

  return (
    <div>
      <Application addVolunteer={addVolunteer} /> {/* Pass down the function */}
      <Volunteers volunteersData={volunteers} /> {/* Pass down the volunteers data */}
    </div>
  );
}

export default VolunteerContainer;
