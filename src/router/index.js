import React from 'react';
import Login from "../components/pages/login/Login"
import Plan from "../components/pages/plan/Plan"
import SearchDB from "../components/pages/searchDB/SearchDB"
import Analyze from "../components/pages/analyze/Analyze"
import PlanById from "../components/pages/planById/PlanById"
import AddPubl from "../components/pages/addPubl/AddPubl"
import AddAutor from "../components/pages/addAutor/AddAutor"
import Editor from "../components/pages/editorPage/Editor"
import AboutAuthor from '../components/pages/about/author/Author';
import DepartmentAnalyze from '../components/pages/analyze/department/DepartmentAnalyze';
import AuthorAnalyze from '../components/pages/analyze/author/AuthorAnalyze';
import { SearchPublication } from '../components/pages/serchDbPublication/SearchPublication';
import AboutPublication from '../components/pages/about/publication/AboutPublication';


export const privateRoutes = [
    { path: '/plan', element: <Plan />, exact: true },
    { path: '/add/public', element: <AddPubl />, exact: true },
    { path: '/add/autor', element: <AddAutor />, exact: true },
    { path: '/search', element: <SearchDB />, exact: true },
    { path: '/search/publications', element: <SearchPublication />, exact: true },
    { path: '/analyze', element: <Analyze />, exact: true },
    { path: '/analyze/author/:id', element: <AuthorAnalyze />, exact: true },
    { path: '/analyze/department', element: <DepartmentAnalyze />, exact: true },
    { path: '/plan/change/:id', element: <PlanById />, exact: true },
    { path: '/editor', element: <Editor />, exact: true },
    { path: '/about/author/:id', element: <AboutAuthor />, exact: true },
    { path: '/about/publication/:id', element: <AboutPublication />, exact: true }
];

export const publicRoutes = [
    { path: '/login', element: <Login />, exact: true },
    { path: '/plan', element: <Plan />, exact: true },
    { path: '/search', element: <SearchDB />, exact: true },
    { path: '/search/publications', element: <SearchPublication />, exact: true },
    { path: '/analyze', element: <Analyze />, exact: true },
    { path: '/analyze/department', element: <DepartmentAnalyze />, exact: true },
    { path: '/analyze/author/:id', element: <AuthorAnalyze />, exact: true },
    { path: '/plan/about/:id', element: <PlanById />, exact: true },
    { path: '/about/author/:id', element: <AboutAuthor />, exact: true },
    { path: '/about/publication/:id', element: <AboutPublication />, exact: true }
];

