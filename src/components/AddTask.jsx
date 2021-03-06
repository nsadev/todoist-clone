import React, { useState } from 'react'
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa'
import moment from 'moment'
import { firebase } from '../firebase'
import { useSelectedProjectValue } from '../context/selected-project-context'

import { ProjectOverlay } from './ProjectOverlay'
import { TaskDate } from './TaskDate'

export const AddTask = ({ 
  showAddTaskMain = true, 
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask
}) => {
  const [task, setTask] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [project, setProject] = useState('')
  const [showMain, setShowMain] = useState(shouldShowMain)
  const [showProjectOverlay, setShowProjectOverlay] = useState(false)
  const [showTaskDate, setShowTaskDate] = useState(false)
  
  const { selectedProject } = useSelectedProjectValue()

  const addTask = () => {
    const projectId = project || selectedProject
    let collectedDate = ''

    if (projectId === 'TODAY') {
      collectedDate = moment().format('DD/MM/YYYY')
    } else if (projectId === 'NEXT_7') {
      collectedDate = moment()
        .add(7, 'days')
        .format('DD/MM/YYYY')
    }

    return (task && 
      projectId && 
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          projectId,
          task,
          date: collectedDate || taskDate,
          userId: ''
        })
        .then(() => {
          setTask('')
          setProject('')
          setShowMain('')
          setShowProjectOverlay(false)
        })
    )
  }

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid='add-task-comp'
    >
      {showAddTaskMain && (
        <div
          className='add-task__shallow'
          data-testid='show-main-action'
          aria-label='Add task'
          role='button'
          tabIndex={0}
          onClick={() => setShowMain(!showMain)}
          onKeyDown={() => setShowMain(!showMain)}
        >
          <span className='add-task__plus'>+</span>
          <span className='add-task__text'>Add task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div 
          className='add-task__main'
          data-testid='add-task-main'
        >
          {showQuickAddTask && (
            <>
              <div data-testid='quick-add-task'>
                <h3 className='header'>Quick add task</h3>
                <span
                  className='add-task__cancel-x'
                  data-testid='add-tasl-quick-cancel'
                  aria-label='Cancel adding task'
                  role='button'
                  tabIndex={0}
                  onClick={() => {
                    setShowMain(false)
                    setShowProjectOverlay(false)
                    setShowQuickAddTask(false)
                  }}
                  onKeyDown={() => {
                    setShowMain(false)
                    setShowProjectOverlay(false)
                    setShowQuickAddTask(false)
                  }}
                >
                  X
                </span>
              </div>
            </>
          )}
          <ProjectOverlay 
            setProject={setProject} 
            showProjectOverlay={showProjectOverlay} 
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate 
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className='add-task__content'
            data-testid='add-task-content'
            aria-label='Enter your task'
            type='text'
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <button
            type='button'
            className='add-task__submit'
            data-testid='add-task'
            onClick={() => (showQuickAddTask 
              ? 
              addTask() && setShowQuickAddTask(false)  
              : 
              addTask())
            }
          >Add task</button>
          {!showQuickAddTask && (
            <span
              className='add-task__cancel'
              data-testid='add-task-main-cancel'
              aria-label='Cancel adding task'
              role='button'
              tabIndex={0}
              onClick={() => {
                setShowMain(false)
                setShowProjectOverlay(false)
              }}
              onKeyDown={() => {
                setShowMain(false)
                setShowProjectOverlay(false)
              }}
            >
              Cancel
            </span>
          )}
          <span
            className='add-task__project'
            data-testid='show-project-overlay'
            role='button'
            tabIndex={0}
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            onKeyDown={() => setShowProjectOverlay(!showProjectOverlay)}
          >
            <FaRegListAlt />
          </span>
          <span
            className='add-task__date'
            data-testid='show-task-date-overlay'
            role='button'
            tabIndex={0}
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={() => setShowTaskDate(!showTaskDate)}
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
    )           
}
