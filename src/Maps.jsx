import React, { useState, useImperativeHandle, forwardRef } from "react"
import styled from "styled-components"

import Map from "./Map"

const Wrapper = styled.section`
  height: calc(100% - 100px);
  width: 100%;
  background-color: hsl(0, 0%, 0%);
  display: grid;
  grid-template-columns: 1fr 10px ${({ expanded }) =>
      expanded ? "1fr" : "20%"};

  transition: all 1s ease;

  & #map2 {
    transition: opacity 0.5s ease;
    ${({ expanded }) => (expanded ? "opacity: 1" : "opacity: 0.3")};
  }
`

const ExpandButton = styled.button`
  height: 50px;
  width: 50px;
  position: absolute;
  top: calc(50% - 20px);
  background-color: white;
  margin-left: -22.5px;
  border-radius: 50%;
  border: 3px solid black;
  font-size: 2em;
  text-align: center;
  transition: transform 0.3s ease-out;
  z-index: 9999;

  ${({ expanded }) =>
    expanded &&
    `
    transform: rotate(180deg);
  `}
`

const Separator = styled.div`
  background-color: hsl(0, 0%, 15%);
  border-left: 2px solid hsl(0, 0%, 5%);
  border-right: 2px solid hsl(0, 0%, 5%);
`

const Maps = ({ polygon, onSetPolygon }) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <Wrapper expanded={expanded}>
      <Map id={1} polygon={polygon} setPolygon={onSetPolygon} />
      <Separator>
        <ExpandButton
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          &lt;
        </ExpandButton>
      </Separator>
      <Map
        id={2}
        polygon={polygon}
        setPolygon={onSetPolygon}
        expanded={expanded}
      />
    </Wrapper>
  )
}

export default forwardRef(Maps)
