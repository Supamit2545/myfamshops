// components/MyGoogleMap.js
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '150px'
};

const center = {
  lat: 13.7746742, // Latitude for Bangkok, Thailand
  lng: 100.64759 // Longitude for Bangkok, Thailand
};

const Gmap = () => {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default Gmap;