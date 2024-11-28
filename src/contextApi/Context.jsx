import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';

export const addResponseContext = createContext()
export const editResponseContext = createContext()

function Context({ children }) {
  const [addResponse, setAddResponse] = useState('')
  const [editResponse, setEditResponse] = useState('')
  return (
    <>
      <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
        <editResponseContext.Provider value={{ editResponse, setEditResponse }}>
          {children}
        </editResponseContext.Provider>
      </addResponseContext.Provider>
    </>
  )
}

export default Context