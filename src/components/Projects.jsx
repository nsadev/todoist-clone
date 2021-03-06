import React, { useState } from 'react'

import { useSelectedProjectValue } from '../context/selected-project-context'
import { useProjectsValue } from '../context/projects-context'

import { IndividualProject } from './IndividualProject'

export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue)
  const { setSelectedProject } = useSelectedProjectValue()
  const { projects } = useProjectsValue()

  return (
    projects &&
    projects.map(project => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-testid='project-action'
        className={
          active === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
        >
          <div
            role='button'
            tabIndex={0}
            aria-label={`Select ${project.name} as task project`}
            onKeyDown={() => {
              setActive(project.projectId)
              setSelectedProject(project.projectId)
            }}
            onClick={() => {
              setActive(project.projectId)
              setSelectedProject(project.projectId)
            }}
          >
            <IndividualProject project={project} />
          </div>
        </li>
    ))
  )
}