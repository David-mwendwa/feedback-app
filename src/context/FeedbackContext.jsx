import {createContext, useContext, useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState(FeedbackData)
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false })

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = (id, updateItem) => {
    setFeedback(feedback.map(item => item.id === id ? {...item, ...updateItem} : item))
  }

  const addFeedback = (newFeedback) => {
    newFeedback = { ...newFeedback, id: uuidv4() };
    setFeedback([newFeedback, ...feedback]);
  };

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  return <FeedbackContext.Provider 
    value={{
      feedback,
      feedbackEdit, 
      deleteFeedback, 
      addFeedback, 
      editFeedback,
      updateFeedback
    }}
  >
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext