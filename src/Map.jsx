import React, { useRef, useEffect } from "react"
import coordinates from "coordinates"
import styled from "styled-components"
import L, { LayerGroup } from "leaflet"
import "leaflet-truesize"

const StyledMap = styled.div`
  height: 100%;
  width: calc(100%);
`

const Map = ({ id, polygon, setPolygon, expanded }) => {
  const map = useRef(null)
  const layer = useRef(null)

  const handleClick = (e) => {
    setPolygon((polygon) => [...polygon, [e.latlng.lng, e.latlng.lat]])
  }

  /* Converts origin polygon in new polygon with the target map's center as a center */
  const convertPolygon = (polygon) =>
    polygon.map((point) => {
      const difference = {
        lat: map.current.getCenter().lat - polygon[0][1],
        lng: polygon[0][0] - map.current.getCenter().lng,
      }
      const coord = {
        lat: point[0] + difference.lat,
        lng: point[1] + difference.lng,
      }
      return [coord.lat, coord.lng]
    })

  /* Initialisation */
  useEffect(() => {
    map.current = L.map(`map${id}`, {
      center: [43.599, 1.437],
      zoom: 5,
      layers: [
        L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            'Tiles provided by <a href="http://osm.org/copyright">OpenStreetMap</a> with ♥️',
        }),
      ],
    })
    map.current.on("click", handleClick)
    layer.current = new LayerGroup().addTo(map.current)
  }, [id])

  useEffect(() => {
    layer.current.clearLayers()
    if (polygon.length > 0) {
      new L.trueSize(
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [id === 2 ? convertPolygon(polygon) : polygon],
          },
        },
        {
          color: "#FF0000",
          weight: 1,
          opacity: 1,
          dashArray: "7, 10",
        },
      ).addTo(layer.current)
    }
  }, [polygon, id])

  useEffect(() => {
    map.current.invalidateSize()
  }, [expanded])

  return <StyledMap id={`map${id}`} />
}

export default Map
