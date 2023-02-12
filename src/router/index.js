import Login from "../components/pages/login/Login"
import Plan from "../components/pages/plan/Plan"
import SearchDB from "../components/pages/searchDB/SearchDB"
import Analyze from "../components/pages/analyze/Analyze"
import PlanById from "../components/pages/planById/PlanById"

export const publicRoutes = [
    {path:'/login', element: <Login/>, exact: true},
    {path:'/plan', element: <Plan/>, exact: true},
    {path: '/search', element: <SearchDB/>, exact: true},
    {path: '/analyze', element: <Analyze/>, exact: true},
    {path: '/plan/about/:id', element: <PlanById/>, exact: true},
]

export const privateRoutes = [
    {path:'/plan', element: <Plan/>, exact: true},
    {path: '/search', element: <SearchDB/>, exact: true},
    {path: '/analyze', element: <Analyze/>, exact: true},
    {path: '/plan/change/:id', element: <PlanById/>, exact: true},
]