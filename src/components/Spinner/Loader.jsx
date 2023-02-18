import React from 'react'
// import "./spinner.css"
import {Spinner} from 'reactstrap';

const Loader = () => {
  return (
    <>
        <Spinner
    color="primary"
    style={{
      height: '3rem',
      width: '3rem'
    }}
  >
    Loading...
  </Spinner>
    </>
  )
}

export default Loader