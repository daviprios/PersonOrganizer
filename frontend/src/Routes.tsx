import { BrowserRouter, Navigate, Route, Routes as Switch } from 'react-router-dom'

import Layout from './components/Layout'
import Search from './pages/Search'

const paths = {
  home: '/',
  pages: {
    search: '/search',
    add: '/add'
  }
}

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Navigate to={paths.pages.search} replace/>}/>
          <Route path={paths.pages.search} element={<Search/>}/>
          <Route path={paths.pages.add} element={<Search/>}/>
        </Route>
        <Route path='*'>
          <Route index element={
            <span>Not Found</span>
          }/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export { paths }
export default Routes