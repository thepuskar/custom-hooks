import React from 'react'
import { useGeolocation } from './useGeolocation'

export const UseGeolocationDemo = () => {
  const coordinates = useGeolocation()

  return !coordinates.error ? (
    <ul>
      <li>Latitude: {coordinates.latitude}</li>
      <li>Longitude: {coordinates.longitude}</li>
      <li>Location accuracy: {coordinates.accuracy}</li>
      <li>Altitude: {coordinates.altitude}</li>
      <li>Altitude accuracy: {coordinates.altitudeAccuracy}</li>
      <li>Heading: {coordinates.heading}</li>
      <li>Speed: {coordinates.speed}</li>
      <li>Timestamp: {coordinates.timestamp}</li>
    </ul>
  ) : (
    <p>No geolocation, sorry.</p>
  )
}
