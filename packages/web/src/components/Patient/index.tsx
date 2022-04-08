import React from 'react'
<<<<<<< HEAD
import {BrowserRouter,Routes,Route, Navigate,} from "react-router-dom";
import MedHistory from './MedHistory';
import PatientHome from './PatientHome';
import ScheduleApps from './ScheduleApps';
import UpcomingApps from './UpcomingApps';
=======

>>>>>>> 0ea3e1d (inital changes)
type Props = {}

const PatientMain = (props: Props) => {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<PatientHome/>} ></Route>
          <Route path="history" element={<MedHistory/>} ></Route>
          <Route path="schedule" element={<ScheduleApps/>} ></Route>
          <Route path="upcoming" element={<UpcomingApps/>} ></Route>
          <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
=======
    <div>hello</div>
>>>>>>> 0ea3e1d (inital changes)
  )
}

export default PatientMain;