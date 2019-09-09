import React, { useEffect } from 'react'
import { Checkbox } from './Checkbox'
import { AddTask } from './AddTask'

import { useTasks } from '../hooks/hooks.index'
import { collectedTasks } from '../constants/constants.index'
import { getTitle, getCollectedTitle, collectedTasksExist } from '../helpers/helpers.index'
import { useSelectedProjectValue } from '../context/selected-project-context'
import { useProjectsValue } from '../context/projects-context'

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue()
  const { projects } = useProjectsValue()
  const { tasks } = useTasks(selectedProject)

  let projectName = ''

  if (projects && selectedProject && !collectedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name
  }

  if (collectedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollectedTitle(collectedTasks, selectedProject).name
  }

  useEffect(() => {
    document.title = `${projectName}: Todo`
  })

  return (
    <div className='tasks' data-testid='tasks'>
      <h4 data-testid='project-name'>{projectName}</h4>
      <ul className='tasks__list'>
        {tasks.map(task => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>

      <AddTask />
    </div>
  )
}