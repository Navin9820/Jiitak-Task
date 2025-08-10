'use client'

import { useState } from 'react'

const chartData = [
  { age: '10代未満', male: 50, female: 30, other: 20, noAnswer: 10 },
  { age: '10代', male: 80, female: 60, other: 40, noAnswer: 20 },
  { age: '20代', male: 150, female: 200, other: 80, noAnswer: 40 },
  { age: '30代', male: 180, female: 250, other: 100, noAnswer: 50 },
  { age: '40代', male: 200, female: 300, other: 120, noAnswer: 60 },
  { age: '50代', male: 120, female: 180, other: 80, noAnswer: 40 },
  { age: '60代', male: 80, female: 120, other: 50, noAnswer: 25 },
  { age: '70代', male: 40, female: 60, other: 25, noAnswer: 15 },
  { age: '80代', male: 20, female: 30, other: 15, noAnswer: 10 },
  { age: '90代以上', male: 10, female: 15, other: 8, noAnswer: 5 },
]

const maxValue = 800
const highlightedBar = 6 // 60代

export default function DemographicChart() {
  const [selectedYear] = useState('2024年')
  const [selectedMonth] = useState('01月')

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-noto font-medium text-gray-900">性別・年代比</h3>
        <div className="flex items-center gap-2">
          <select className="border border-gray-300 rounded px-3 py-1 text-sm">
            <option>{selectedYear}</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-1 text-sm">
            <option>{selectedMonth}</option>
          </select>
          <span className="text-gray-500">▶</span>
        </div>
      </div>

      <div className="relative h-80">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
          <span>1,000</span>
          <span>900</span>
          <span>800</span>
          <span>700</span>
          <span>600</span>
          <span>500</span>
          <span>400</span>
          <span>300</span>
          <span>200</span>
          <span>100</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-12 h-full flex items-end justify-between gap-1">
          {chartData.map((data, index) => {
            const total = data.male + data.female + data.other + data.noAnswer
            const height = (total / maxValue) * 100
            const isHighlighted = index === highlightedBar

            return (
              <div key={data.age} className="flex flex-col items-center relative">
                {/* Tooltip for highlighted bar */}
                {isHighlighted && (
                  <div className="absolute -top-8 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    {total}人
                  </div>
                )}
                
                {/* Stacked bar */}
                <div 
                  className="w-8 flex flex-col justify-end relative"
                  style={{ height: '300px' }}
                >
                  <div 
                    className="w-full flex flex-col"
                    style={{ height: `${height}%` }}
                  >
                    {/* No answer (top) */}
                    <div 
                      className="w-full bg-orange-200"
                      style={{ 
                        height: `${(data.noAnswer / total) * 100}%`,
                        minHeight: data.noAnswer > 0 ? '2px' : '0'
                      }}
                    />
                    {/* Other */}
                    <div 
                      className="w-full bg-orange-300"
                      style={{ 
                        height: `${(data.other / total) * 100}%`,
                        minHeight: data.other > 0 ? '2px' : '0'
                      }}
                    />
                    {/* Female */}
                    <div 
                      className="w-full bg-orange-400"
                      style={{ 
                        height: `${(data.female / total) * 100}%`,
                        minHeight: data.female > 0 ? '2px' : '0'
                      }}
                    />
                    {/* Male (bottom) */}
                    <div 
                      className="w-full bg-orange-500"
                      style={{ 
                        height: `${(data.male / total) * 100}%`,
                        minHeight: data.male > 0 ? '2px' : '0'
                      }}
                    />
                  </div>
                </div>
                
                {/* X-axis label */}
                <span className="text-xs text-gray-600 mt-2 transform -rotate-45 origin-center whitespace-nowrap">
                  {data.age}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
          <span className="text-gray-700">男性</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
          <span className="text-gray-700">女性</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-300 rounded-sm"></div>
          <span className="text-gray-700">その他</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-200 rounded-sm"></div>
          <span className="text-gray-700">回答なし</span>
        </div>
      </div>
    </div>
  )
}