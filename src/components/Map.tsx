import React, { useRef, useEffect } from 'react';
import { Location } from '../models/Location';

interface MapProps {
  locations: Location[]
  mapCenter: Location
}

const Map: React.FC<MapProps> = ({ mapCenter, locations }) => {
  /*const mapEle = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map>();

  useEffect(() => {

    map.current = new google.maps.Map(mapEle.current, {
      center: {
        lat: mapCenter.lat,
        lng: mapCenter.lng
      },
      zoom: 16
    });

    addMarkers();

    google.maps.event.addListenerOnce(map.current, 'idle', () => {
      if (mapEle.current) {
        mapEle.current.classList.add('show-map');
      }
    });

    function addMarkers() {
      locations.forEach((markerData) => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(markerData.lat, markerData.lng),
          map: map.current!,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map.current!, marker);
        });
      });
    }

  }, [mapCenter, locations]);

  return (
    <div ref={mapEle} className="map-canvas"></div>
  );*/
  return (
  <div  className="map-canvas"><h3 className="ion-padding-top ion-padding-start">About</h3>

  <p className="ion-padding-start ion-padding-end">
    The  Shada is a one-day shada on    </p>

  <h3 className="ion-padding-top ion-padding-start">Details</h3><p>todo</p><p>todo</p><p>todo</p><p>todo</p>
  </div>
  );
}

export default Map;
