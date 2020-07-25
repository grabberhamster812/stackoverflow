import React from 'react'

import NavItem from '../components/nav-item'
import Navigation from '../components/navigation'
import { World } from '../components/icons'

export default {
  title: 'Navigation'
}

export const NavigationItem = () => (
  <div className="navItems">
    <NavItem href="/" selected={false}>
      <World />
      <span>Stack Overflow</span>
    </NavItem>
    <NavItem href="/" selected={true}>
      <World />
      <span>Stack Overflow</span>
    </NavItem>
  </div>
)

export const Nav = () => <Navigation />
