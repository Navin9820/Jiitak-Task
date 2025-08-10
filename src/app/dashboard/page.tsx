"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  LayoutDashboard,
  Users,
  Trophy,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  User,
  ArrowUpDown,
  BarChart,
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const sidebarItems = [
  { icon: LayoutDashboard, label: 'ダッシュボード', active: true, href: '/dashboard' },
  { icon: Users, label: '登録ユーザー', active: false, href: '/users' },
  { icon: Trophy, label: '当選者', active: false, href: '/winners' },
  { icon: Settings, label: '運営管理者', active: false, href: '/admin' },
];

// Sample data for statistics cards
const statsData = [
  {
    title: 'ユーザー登録数累計',
    value: '450人',
    change: '+12.5%',
    period: '2024年2月1日 - 2024年2月5日',
    previousValue: '400人 (前月時点の累計)',
  },
  {
    title: 'アクティブユーザー',
    value: '50人 / 今月',
    change: '+316.6%',
    period: '2024年2月1日 - 2024年2月5日',
    previousValue: '12人 (前月時点)',
  },
  {
    title: '定着率',
    value: '10% / 前月',
    change: '-16.6%',
    period: '2024年1月1日 - 2024年1月31日',
    previousValue: '12% (前々月)',
  },
  {
    title: '平均検索回数',
    value: '4回 / 今月',
    change: '+100%',
    period: '2024年2月1日 - 2024年2月5日',
    previousValue: '2回 (前月の今日時点)',
  },
  {
    title: '抽選利用回数',
    value: '125回 / 今月',
    change: '+47%',
    period: '2024年2月1日 - 2024年2月5日',
    previousValue: '85回 (前月の今日時点)',
  },
  {
    title: 'アカウント削除数',
    value: '10人 / 今月',
    change: '+25%',
    period: '2024年2月1日 - 2024年2月5日',
    previousValue: '8人 (前月の今日時点)',
  },
];

// Sample bar chart data
const barChartData = {
  labels: ['10代未満', '10代', '20代', '30代', '40代', '50代', '60代', '70代', '80代', '90代以上'],
  datasets: [
    {
      label: '男性',
      data: [200, 300, 400, 600, 500, 450, 300, 150, 100, 50],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '女性',
      data: [100, 200, 300, 400, 500, 400, 300, 200, 100, 50],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
    {
      label: 'その他',
      data: [50, 100, 150, 200, 250, 200, 150, 100, 50, 25],
      backgroundColor: 'rgba(255, 206, 86, 0.5)',
    },
    {
      label: '回答なし',
      data: [0, 50, 100, 150, 200, 150, 100, 50, 25, 10],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle navigation
  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center ">
            <img
              src="/text.png" 
              alt="LookMeals Logo"
              className=" h-8 mr-2"
            />
            
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                item.active 
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => handleNavigation(item.href)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
             
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {statsData.map((stat, index) => (
              <Card key={index} className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.previousValue}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {stat.change}
                      </span>
                      <p className="text-xs text-gray-500">{stat.period}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bar Chart */}
          <Card className="bg-white border border-gray-200 shadow-sm mb-6">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900">
                性別・年代比
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">2024年</span>
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium text-gray-600">01月</span>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[400px]">
                {/* Bar Chart Component */}
                <Bar
                  data={barChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom' as const,
                      },
                    },
                    scales: {
                      x: {
                        stacked: true,
                      },
                      y: {
                        stacked: true,
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>


          {/* Additional Content */}
          {/* Add more components as needed */}
        </main>
      </div>
    </div>
  );
}