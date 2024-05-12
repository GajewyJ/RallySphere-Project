import React from "react"
import Home from "../pages/home"
import WRC from "../pages/wrc"
import CalendarPage from "../pages/calendar"
import News from "../pages/news"
import SingleNews from "../pages/singleNews"
import Teams from "../pages/teams"

interface RouteItem{
    path: string,
    element: React.JSX.Element,
    label: string
}

export const routes: Array<RouteItem> = [
    {
        path: "/",
        element: <Home/>,
        label: "Home"
    },
    {
        path: "/wrc",
        element: <WRC/>,
        label: "WRC"
    },
    {
        path: "/wrc/calendar",
        element: <CalendarPage/>,
        label: "WRC Calendar"
    },
    {
        path: "/wrc/news",
        element: <News/>,
        label: "WRC News"
    },
    {
        path: "/wrc/news/:id",
        element: <SingleNews/>,
        label: "Single News"
    },
    {
        path: "/wrc/teams",
        element: <Teams/>,
        label: "Teams"
    },
]