import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom'

import Layout from './components/Layout'
import Search from './pages/Search'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Search/>}></Route>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes