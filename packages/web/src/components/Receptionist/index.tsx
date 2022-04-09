import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPatient from './AddPatient';
import EditPatient from './EditPatient';
import ReceptionistHome from './ReceptionistHome';
import SetPatient from './SetPatient';

type Props = {}

const ReceptionistMain = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<ReceptionistHome/>} ></Route>
          <Route path="add" element={<AddPatient/>} ></Route>
          <Route path="edit" element={<EditPatient/>} ></Route>
          <Route path="set" element={<SetPatient/>} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default ReceptionistMain;