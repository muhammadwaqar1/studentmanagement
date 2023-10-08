import React, { useState } from 'react'
import Hero from './Hero'

export default function Index() {
  const [collapsed, setCollapsed] = useState(false)
console.log(collapsed,"collapsed")
  return (
    <div className={` ${collapsed?"w-[5%]":"w-[15%]"}   border-r h-[100vh]`}>
        <Hero
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        />
    </div>
  )
}
