import React from 'react';
import regionMapping from './regionMapping'; // Adjust the path as needed

const BeaconLayer = ({ dengueData }) => {
  const beacons = dengueData
    .map((entry) => {
      if (entry.regions && entry.cases !== undefined && entry.deaths !== undefined) {
        const region = regionMapping[entry.regions] || entry.regions; // Use mapping if available
        return {
          name: region,
          cases: entry.cases,
          deaths: entry.deaths,
          color: getColor(entry.cases), // A function to get color based on cases
          lat: entry.lat,
          lon: entry.lon,
        };
      }
      return null;
    })
    .filter((beacon) => beacon !== null); // Remove null values

  const getColor = (cases) => {
    if (cases < 100) return '#B0E0E6'; // Light blue for fewer cases
    if (cases < 500) return '#4682B4'; // Moderate blue for medium cases
    return '#000080'; // Dark blue for higher cases
  };

  return (
    <div id="beacon-layer">
      {beacons.map((beacon, index) => (
        <div
          key={index}
          className="beacon"
          style={{
            position: 'absolute',
            top: `${beacon.lat}px`, // Adjust positioning logic as per actual coordinates
            left: `${beacon.lon}px`,
            backgroundColor: beacon.color,
            borderRadius: '50%',
            width: '10px',
            height: '10px',
          }}
          title={`${beacon.name}: ${beacon.cases} cases, ${beacon.deaths} deaths`}
        />
      ))}
    </div>
  );
};

export default BeaconLayer;
