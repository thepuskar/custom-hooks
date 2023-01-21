import { useState, useEffect, useCallback } from 'react'

type PositionError = GeolocationPositionError

interface GeolocationOptions {
  enableHighAccuracy?: boolean
  maximumAge?: number
  timeout?: number
}

interface Coordinates {
  accuracy: number | null
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number | null
  longitude: number | null
  speed: number | null
  timestamp: number | null
  error: PositionError | null
}

/**
 * It returns the current position of the user's device, and updates the position as it changes
 * @param {GeolocationOptions} options - GeolocationOptions = {}
 * @param [callback] - A callback function that will be called with the current coordinates whenever
 * they change.
 * @param [isEnabled=true] - boolean - whether or not to enable geolocation
 * @returns The coordinates object.
 */
export const useGeolocation = (
  options: GeolocationOptions = {},
  callback?: (coordinates: Coordinates) => void,
  isEnabled = true
) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null
  })
  const updateCoordinates = useCallback(
    ({ coords, timestamp }: GeolocationPosition) => {
      const {
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed
      } = coords

      setCoordinates({
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed,
        timestamp,
        error: null
      })

      if (typeof callback === 'function') {
        callback({
          accuracy,
          altitude,
          altitudeAccuracy,
          heading,
          latitude,
          longitude,
          speed,
          timestamp,
          error: null
        })
      }
    },
    [callback]
  )
  const setError = useCallback((error: PositionError) => {
    setCoordinates({
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: null,
      longitude: null,
      speed: null,
      timestamp: null,
      error
    })
  }, [])
  useEffect(() => {
    let watchId: number

    if (isEnabled && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateCoordinates, setError)
      watchId = navigator.geolocation.watchPosition(
        updateCoordinates,
        setError,
        options
      )
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [isEnabled, callback, options, setError, updateCoordinates])

  return coordinates
}
