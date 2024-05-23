// router.tsx

import React from 'react';
// import { Routes } from 'react-router-dom';

// import MarketingDashboard from './components/MarketingManager_Dashboard.tsx';
// import RLTableRow from './components/redlistTableRow.tsx';
// import RLTable from './components/redlistFullTable.tsx';
// import SampleTable from './components/redlistFullTable.tsx';
// import RedlistWithTable from './components/Redlist_bottomPage.tsx';
import MM_Redlist from '../src/screen/MarketingManager_Redlist.tsx';
// import RefTableRow from './screen/TabRowRef.tsx';
// import RefTable from './components/ReferencesOverviewTable.tsx';
// import RefWithTable from './components/ReferencesOverview_bottomPage.tsx';
import MM_RefOverview from './screen/MarketingManager_ReferencesOverview.tsx';
import Login from './screen/Login.jsx';
// import { References } from './screen/references.tsx';
// import { ReservedPhoneCalls } from './screen/reservedPhoneCalls.tsx';
import {Route, Routes} from "react-router-dom";

import ReserveCallsPhoneAg from './screen/ReservedCalls.jsx'
import Scheduler from '../src/screen/Scheduler.jsx';
import AvailableHours from "../src/screen/AvailableHours.jsx"
import Statistics from "../src/screen/Statistics.jsx";
import SalesAgentDashboard from "../src/screen/SaleAgentDashboard.jsx";
import PageNotFound from "../src/screen/PageNotFound.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
const AllRoutes = () => {
  return (
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/overview' element={
            <ProtectedRoute roleName={""}>
              < MM_RefOverview/>
          </ProtectedRoute>
          }/>
          {/* <Route path='/references' element={
            <ProtectedRoute roleName={"marketingManager"}>
              <References/>
          </ProtectedRoute>
          }/> */}
          <Route path='/redlist' element={
            <ProtectedRoute roleName={"phoneAgent"}>
              <MM_Redlist/>
          </ProtectedRoute>
          }/>
          <Route path='/reservedCalls' element={
            <ProtectedRoute roleName={"phoneAgent"}>
              <ReserveCallsPhoneAg/>
          </ProtectedRoute>
          }/>
          <Route path='/scheduler' element={
            <ProtectedRoute roleName={"salesAgent"}>
              <Scheduler/>
            </ProtectedRoute>
          }/>
          <Route path='/availableHours' element={
            <ProtectedRoute roleName={"salesAgent"}>
              <AvailableHours/>
            </ProtectedRoute>
          }/>
          <Route path="/statistics" element={
          <ProtectedRoute roleName={"phoneAgent"}>
            <Statistics/>
          </ProtectedRoute>
          }/>

          <Route path="/ref" element={
          <ProtectedRoute roleName={"phoneAgent"}>
            <MM_RefOverview/>
          </ProtectedRoute>
          }/>

          <Route path='/salesAgentDashboard' element={
            <ProtectedRoute roleName={"salesAgent"}>
              <SalesAgentDashboard/>
            </ProtectedRoute>
          }/>
          <Route path='/notFound' element={<PageNotFound/>}/>
      </Routes>
  )
}

export default AllRoutes;
