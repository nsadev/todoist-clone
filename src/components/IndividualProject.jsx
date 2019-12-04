import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useSelectedProjectValue } from '../context/selected-project-context'
import { useProjectsValue } from '../context/projects-context'
import { firebase } from '../firebase'

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const { projects, setProjects } = useProjectsValue()
  const { setSelectedProject } = useSelectedProjectValue()

  const deleteProject = docId => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects])
        setSelectedProject('INBOX')
      })
  }
  return (
    <>
      <span className='sidebar__dot'>●</span>
      <span className='sidebar__project-name'>{project.name}</span>
      <span className='sidebar__project-delete'
        data-testid='delete-project'
        aria-label='Confirm deletion of project'
        role='button'
        tabIndex='0'
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={() => setShowConfirm(!showConfirm)}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className='project-delete-modal'>
            <div className='project-delete-modal__inner'>
              <p>Are you sure you want to delete this project?</p>
              <button
                type='button'
                tabIndex='0'
                aria-label='Delete project'
                onClick={() => deleteProject(project.docId)}
                onKeyDown={() => deleteProject(project.docId)}
              >
                Delete
              </button>
              <span 
                role='button'
                tabIndex='0'
                aria-label='Cancel adding project, do not delete'
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={() => setShowConfirm(!showConfirm)}
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  )
}