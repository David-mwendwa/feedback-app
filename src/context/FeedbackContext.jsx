import {createContext, useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState(FeedbackData)
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false })

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async() => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

  const updateFeedback = (id, updateItem) => {
    setFeedback(feedback.map(item => item.id === id ? {...item, ...updateItem} : item))
  }

  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newFeedback)
    })
    const data = await response.json()
    setFeedback([data, ...feedback]);
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
      isLoading,
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