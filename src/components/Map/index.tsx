import { FC } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Container } from './styles';

export type currentPosition = {
  latitude: number;
  longitude: number;
};
interface IMap {
  position: currentPosition;
}

export const Map: FC<IMap> = ({ position }) => {
  return (
    <Container>
      <MapContainer
        center={[position.latitude, position.longitude]}
        zoom={16}
        scrollWheelZoom={false}
        style={{ width: '60%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.latitude, position.longitude]}>
          <Popup>Picagem Realizada.</Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};
