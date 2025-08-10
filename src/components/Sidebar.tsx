'use client'

import { LayoutDashboard, Users, UserCheck, Shield } from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'ダッシュボード', active: true },
  { icon: Users, label: '登録ユーザー', active: false },
  { icon: UserCheck, label: '当選者', active: false },
  { icon: Shield, label: '運営管理者', active: false },
]

export default function Sidebar() {
  return (
    <div className="w-60 bg-white h-screen border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">ル</span>
          </div>
          <span className="font-noto font-medium text-lg lookmeals-text">ルックミール</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}