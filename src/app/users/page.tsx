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
  ArrowUpDown
} from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'ダッシュボード', active: false, href: '/dashboard' },
  { icon: Users, label: '登録ユーザー', active: true, href: '/users' },
  { icon: Trophy, label: '当選者', active: false, href: '/winners' },
  { icon: Settings, label: '運営管理者', active: false, href: '/admin' },
];

// Sample user data matching the image
const userData = [
  {
    id: 1,
    nickname: 'ゆうと',
    email: 'example1@example.com',
    birthYear: '1992年12月',
    gender: '男性',
    location: '東京都',
    registrationDate: '2024年01月12日'
  },
  {
    id: 2,
    nickname: 'ニックネーム最大12文字',
    email: 'user234@example.net',
    birthYear: '1987年5月',
    gender: '女性',
    location: '東京都',
    registrationDate: '2024年01月12日'
  },
  {
    id: 3,
    nickname: 'わんこ好き',
    email: 'test_user@gmail.com',
    birthYear: '1996年10月',
    gender: '男性',
    location: '東京都',
    registrationDate: '2024年01月12日'
  },
  {
    id: 4,
    nickname: 'はるかぜ',
    email: 'dummy_email_567@yahoo.co.jp',
    birthYear: '1998年2月',
    gender: '男性',
    location: '静岡県',
    registrationDate: '2024年01月12日'
  },
  {
    id: 5,
    nickname: 'あおい',
    email: 'ecampleaddress124e23@outlook.co...',
    birthYear: '1978年5月',
    gender: '女性',
    location: '埼玉県',
    registrationDate: '2024年01月11日'
  },
  {
    id: 6,
    nickname: 'ポンたろう',
    email: 'random.user@example.org',
    birthYear: '1978年6月',
    gender: '女性',
    location: '栃木県',
    registrationDate: '2024年01月11日'
  },
  {
    id: 7,
    nickname: 'まさやん',
    email: 'email1234@example.co.jp',
    birthYear: '1972年8月',
    gender: '回答しない',
    location: '鹿児島県',
    registrationDate: '2024年01月11日'
  },
  {
    id: 8,
    nickname: 'なつこ',
    email: 'user_test456@gmail.com',
    birthYear: '1969年11月',
    gender: '回答しない',
    location: '茨城県',
    registrationDate: '2024年01月11日'
  },
  {
    id: 9,
    nickname: 'ぴょんぴょん',
    email: 'example_email@yahoo.com',
    birthYear: '1984年4月',
    gender: '女性',
    location: '東京都',
    registrationDate: '2024年01月10日'
  },
  {
    id: 10,
    nickname: 'ひまわりさん',
    email: 'dummy.address@example.net',
    birthYear: '1988年4月',
    gender: 'その他',
    location: '福岡',
    registrationDate: '2024年01月10日'
  },
];

export default function RegisteredUsers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const itemsPerPage = 10;
  const totalUsers = 5000;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getGenderBadgeColor = (gender: string) => {
    switch (gender) {
      case '男性':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '女性':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'その他':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case '回答しない':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredUsers = userData.filter(user =>
    user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="flex items-center gap-2">
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
              onClick={() => router.push(item.href)}
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
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  登録ユーザー一覧
                </CardTitle>
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ニックネーム / メールアドレスで検索"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b border-gray-200">
                      <TableHead className="w-16 text-center font-medium text-gray-700">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSort('id')}
                          className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900"
                        >
                          No.
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </Button>
                      </TableHead>
                      <TableHead className="font-medium text-gray-700">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSort('nickname')}
                          className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900"
                        >
                          ニックネーム
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </Button>
                      </TableHead>
                      <TableHead className="font-medium text-gray-700">メールアドレス</TableHead>
                      <TableHead className="font-medium text-gray-700">生年月</TableHead>
                      <TableHead className="font-medium text-gray-700">性別</TableHead>
                      <TableHead className="font-medium text-gray-700">居住地</TableHead>
                      <TableHead className="font-medium text-gray-700">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSort('registrationDate')}
                          className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900"
                        >
                          登録日
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user, index) => (
                      <TableRow 
                        key={user.id} 
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="text-center font-medium text-gray-600">
                          {String(user.id).padStart(2, '0')}.
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">
                          {user.nickname}
                        </TableCell>
                        <TableCell className="text-gray-700 font-mono text-sm">
                          {user.email}
                          {user.email.includes('ecampleaddress124e23@outlook.co') && (
                            <div className="mt-1">
                              <Badge variant="outline" className="text-xs bg-gray-800 text-white border-gray-700">
                                ecampleaddress124e23@outlook.co.jp
                              </Badge>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-700">{user.birthYear}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${getGenderBadgeColor(user.gender)} font-medium`}
                          >
                            {user.gender}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700">{user.location}</TableCell>
                        <TableCell className="text-gray-700">{user.registrationDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  {totalUsers.toLocaleString()}人中 - {itemsPerPage}人表示
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-orange-500 text-white hover:bg-orange-600 border-orange-500"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <span className="text-gray-400 px-2">...</span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(500)}
                    className="border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    500
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}