import React from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
  } from 'mdb-react-ui-kit';

const Navbar = () => {
  return (
     <>
      <MDBNavbar light bgColor='light'>
        <MDBContainer>
          <MDBNavbarBrand style={{margin : 'auto'}}>
            <img
              src='https://i.imgur.com/iIb4ZfB.png'
              height='30'
              alt='After Eight'
              loading='lazy'
            />
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </>
  )
}

export default Navbar