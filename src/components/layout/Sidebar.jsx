import React, { useState } from 'react'
import { 
  FaChevronDown, 
  FaInbox, 
  FaRegCalendarAlt, 
  FaRegCalendar 
} from 'react-icons/fa'

import { Projects } from '../Projects'
import { AddProject } from '../AddProject'

import { useSelectedProjectValue } from '../../context/selected-project-context'

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue()
  const [active, setActive] = useState('inbox')
  const [showProjects, setShowProjects] = useState(true)

  return (
    <div className='sidebar' data-testid='sidebar'>
      <ul className='sidebar__generic'>
        <li
          data-testid='inbox'
          className={active === 'inbox' ? 'active' : ''}
        >
            <div
              data-testid='inbox-action'
              aria-label='Show inbox tasks'
              tabIndex={0}
              role='button'
              onClick={() => {
                setActive('inbox')
                setSelectedProject('INBOX')
              }}
              onKeyDown={() => {
                setActive('inbox')
                setSelectedProject('INBOX')
              }}
            >
              <span>
                <FaInbox />
              </span>
              <span>Inbox</span>
            </div>
          </li>
        <li
          data-testid='today'
          className={active === 'today' ? 'active' : ''}
        >
          <div
            data-testid='today-action'
            aria-label="Show today's tasks"
            tabIndex={0}
            role='button'
            onClick={() => {
              setActive('today')
              setSelectedProject('TODAY')
            }}
            onKeyDown={() => {
              setActive('today')
              setSelectedProject('TODAY')
            }}
          >
              <span>
                <FaRegCalendar />
              </span>
              <span>Today</span>
          </div>
        </li>
        <li
          data-testid='next_7'
          className={active === 'next_7' ? 'active' : ''}
        >
          <div
            data-testid='next_7-action'
            aria-label="Show tasks for the next 7 days"
            tabIndex={0}
            role='button'
            onClick={() => {
              setActive('next_7')
              setSelectedProject('NEXT_7')
            }}
            onKeyDown={() => {
              setActive('next_7')
              setSelectedProject('NEXT_7')
            }}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Next 7 days</span>
          </div>
        </li>
      </ul>
      <div 
        className='sidebar__middle' 
        aria-label="Show/hide projects"
        role='button'
        tabIndex={0}
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={() => setShowProjects(!showProjects)}
      >
        <span>
          <FaChevronDown 
            className={!showProjects ? 'hidden-projects' : ''}
          />
        </span>
        <h3>Projects</h3>
      </div>
      <ul className='sidebar__projects'>
        {showProjects && <Projects />}
      </ul>
      {showProjects && <AddProject />}
    </div>
  )
}