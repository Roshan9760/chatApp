import React from 'react'
import { Outlet } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
       Home
        
        {/* Messages section  */}
        <section>
            <Outlet/>
        </section>
    </div>
  )
}
