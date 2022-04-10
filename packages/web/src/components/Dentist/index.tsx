import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DentistHome from './DentistHome';

type Props = {}

const DentistMain = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<DentistHome/>} ></Route>
          <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default DentistMain;