import React, { useState } from "react"
import styled from "styled-components"
import Maps from "./Maps"

const Wrapper = styled.div`
  height: 100vh;
`

const Header = styled.header`
  height: 50px;
  background-color: palevioletred;
`

const Footer = styled.footer`
  height: 50px;
  background-color: aquamarine;
`

const Main = () => {
  const [polygon, setPolygon] = useState([])

  return (
    <Wrapper>
      <Header>
        Header <button onClick={() => setPolygon([])}>Clear</button>
      </Header>
      <Maps polygon={polygon} onSetPolygon={setPolygon} />
      <Footer>footer</Footer>
    </Wrapper>
  )
}

export default Main
