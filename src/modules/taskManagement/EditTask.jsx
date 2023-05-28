import { Modal } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModalAction } from '../../store/taskModal/slice'

const EditTask = () => {
  const {onOpenEdit} = useSelector((state)=> state.OpenModal)
  const dispatch = useDispatch()
  const onClose = () =>{
    dispatch(openModalAction.closeEditTask())
  }
  return (
    <Modal
    title='Edit Task' 
    open={onOpenEdit}
    onCancel={()=>{
      onClose()
    }}
    width={'50%'}
    >
    
    </Modal>
  )
}

export default EditTask