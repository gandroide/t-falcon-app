import React, { FC, ReactElement } from 'react'

interface Iprops {
  content:  ReactElement
}

export const Form: FC<Iprops> = ({content}) => {
  return (
    <>
        {content}
    </>
  )
}
