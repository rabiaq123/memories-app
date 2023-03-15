import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../actions/user'
import { useEffect } from 'react'

const UsersPage = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.user)

  const handleClick = () => {
    dispatch(getUsers())
    console.log('users', users)
  }

  return (
    <div>
      <h1>Users</h1>
      <button onClick={handleClick}>Get Users</button>
      {users?.map((user) => (
        <div key={user._id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  )
}

export default UsersPage