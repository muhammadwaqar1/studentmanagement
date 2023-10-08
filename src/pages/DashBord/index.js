import React from 'react'
import Hero from './Hero'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
  { name: "G1", value: 200 },
  { name: "G2", value: 400 },
  { name: "G3", value: 100 },
  { name: "G4", value: 700 },
  { name: "G5", value: 400 },
  { name: "G6", value: 500 },
  { name: "G7", value: 300 },
  { name: "G8", value: 100 },

]
export default function index() {
  return (
    <div className='w-full '> 
        <Hero/>
        <div className="container mt-5">
        <div className="row">
          <div className="col">
            <LineChart
              width={900}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  )
}
