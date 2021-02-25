import React from 'react'

import UsersList from '../components/UsersList'

const Users = () => {

  const USERS = [
    {
      id: "u1",
      name: "Yin Lo",
      image: "https://randomuser.me/api/portraits/women/51.jpg",
      places: 3,
    },
    {
      id: "u2",
      name: "Joe Down",
      image: "https://randomuser.me/api/portraits/women/53.jpg",
      places: 3,
    },
  ]

  return (
    <div>
      <UsersList items={USERS} />
    </div>
  )
}

export default Users