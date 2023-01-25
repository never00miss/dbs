import { createBrowserRouter } from 'react-router-dom'
import { MemberListScreen } from '../Screens/MemberListScreen'
import { RegisterScreen } from '../Screens/RegisterScreen'

export const router = createBrowserRouter([
  {
    path: '/',
    element:  <MemberListScreen/>
  },
  {
    path: '/addmember',
    element: <RegisterScreen />
  },
])
