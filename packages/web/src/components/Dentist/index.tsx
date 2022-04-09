import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DentistHome from './DentistHome';

type Props = {}

const DentistMain = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<DentistHome/>} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default DentistMain;