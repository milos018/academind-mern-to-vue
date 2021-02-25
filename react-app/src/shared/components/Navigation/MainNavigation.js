import React, { Fragment, useState } from 'react'

import { Link } from 'react-router-dom'

import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import BackDrop from '../UIElements/Backdrop'

import './MainNavigation.css'

const MainNavigation = props => {

  const [drawerisOpen, setDrawerIsOpen] = useState(false)
  const openDrawerHandler = () => setDrawerIsOpen(true)
  const closeDrawerHandler = () => setDrawerIsOpen(false)

  return (
    <Fragment>
      {drawerisOpen && <BackDrop onClick={closeDrawerHandler} />}

      <SideDrawer show={drawerisOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  )
}

export default MainNavigation
