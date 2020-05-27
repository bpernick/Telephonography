import React, { useState, useEffect } from 'react'
import graphql from 'graphql'

export default function App(): JSX.Element {
  const [hello, setHello] = useState('')
  useEffect (() => {
    fetch('/graphql?query={hello}')
    .then(response => response.json())
    .then((response) => {
      console.log(response)
    })
  })
  return <p>Deno + React = HAHAHAHAHA</p>
}
