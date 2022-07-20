import { FC, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Container } from './styles';

type currentPosition = {
  latitude: number;
  longitude: number;
};
interface IMap {
  position: currentPosition;
}

export const Map: FC<IMap> = ({ position }) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const success = (pos: any) => {
    const crd = pos.coords;
    setLatitude(crd.latitude);
    setLongitude(crd.longitude);
    return crd;
  };
  navigator.geolocation.getCurrentPosition(success);

  return (
    <Container>
      {latitude && longitude !== 0 ? (
        <MapContainer
          center={[position.latitude, position.longitude]}
          zoom={16}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[position.latitude, position.longitude]}>
            <Popup>Picagem Realizada.</Popup>
          </Marker>
        </MapContainer>
      ) : undefined}
    </Container>
  );
};
