import React, { useState } from 'react';
import { LineChart, BarChart, PieChart, Pie, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, Users, CreditCard, TrendingUp, Activity, Filter } from 'lucide-react';

// Sample data - In a real implementation, this would be fetched from the data warehouse
const transactionData = [
  { date: '2025-03-15', deposits: 45650, withdrawals: 32400, transfers: 28750, payments: 15800 },
  { date: '2025-03-16', deposits: 42300, withdrawals: 35600, transfers: 29900, payments: 17200 },
  { date: '2025-03-17', deposits: 48200, withdrawals: 30100, transfers: 31500, payments: 16500 },
  { date: '2025-03-18', deposits: 50100, withdrawals: 29800, transfers: 32600, payments: 18900 },
  { date: '2025-03-19', deposits: 49300, withdrawals: 31700, transfers: 30900, payments: 19200 },
  { date: '2025-03-20', deposits: 51800, withdrawals: 33500, transfers: 31200, payments: 20100 },
  { date: '2025-03-21', deposits: 53500, withdrawals: 34800, transfers: 33000, payments: 21500 },
];

const hourlyData = [
  { hour: '00', transactions: 120, amount: 8500 },
  { hour: '04', transactions: 80, amount: 5600 },
  { hour: '08', transactions: 320, amount: 23500 },
  { hour: '12', transactions: 520, amount: 42700 },
  { hour: '16', transactions: 480, amount: 38200 },
  { hour: '20', transactions: 280, amount: 21300 },
];

const segmentData = [
  { segment: 'Premium', users: 12500, volume: 860000, avgTransaction: 215 },
  { segment: 'Standard', users: 48300, volume: 1250000, avgTransaction: 125 },
  { segment: 'Basic', users: 105400, volume: 950000, avgTransaction: 80 },
];

const countryData = [
  { country: 'USA', transactions: 28500, amount: 1350000 },
  { country: 'UK', transactions: 16800, amount: 780000 },
  { country: 'Germany', transactions: 12500, amount: 580000 },
  { country: 'Canada', transactions: 9800, amount: 450000 },
  { country: 'Australia', transactions: 8500, amount: 390000 },
  { country: 'Others', transactions: 35200, amount: 1200000 },
];

const conversionData = [
  { name: 'Visit to Signup', value: 25 },
  { name: 'Signup to First Deposit', value: 65 },
  { name: 'Weekly Active Users', value: 42 },
  { name: 'Monthly Active Users', value: 72 },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedTransactionType, setSelectedTransactionType] = useState('all');
  const [showChart, setShowChart] = useState('volume');
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">E-Wallet Analytics Dashboard</h1>
          <p className="text-gray-500">Real-time insights into your e-wallet platform performance</p>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow max-w-6xl mx-auto w-full p-4">
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Calendar className="mr-2 text-gray-500" size={20} />
            <select 
              className="p-2 rounded bg-black text-white" 
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
            >
              <option value="day">Today</option>
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last 90 days</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <Filter className="mr-2 text-gray-500" size={20} />
            <select 
              className="bg-black text-white p-2 rounded"
              value={selectedTransactionType}
              onChange={e => setSelectedTransactionType(e.target.value)}
            >
              <option value="all">All Transactions</option>
              <option value="deposits">Deposits</option>
              <option value="withdrawals">Withdrawals</option>
              <option value="transfers">Transfers</option>
              <option value="payments">Payments</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <button 
              className={`px-3 py-2 rounded ${showChart === 'volume' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              onClick={() => setShowChart('volume')}
            >
              Volume
            </button>
            <button 
              className={`px-3 py-2 rounded ${showChart === 'count' ? 'bg-blue-600 text-black' : 'bg-black'}`}
              onClick={() => setShowChart('count')}
            >
              Count
            </button>
          </div>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Transaction Volume */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100">
                <DollarSign className="text-blue-600" size={24} />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Transaction Volume</p>
                <h3 className="text-xl font-bold">$3,251,400</h3>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <p className="text-sm text-green-500">+12.5% from last week</p>
            </div>
          </div>
          
          {/* Transaction Count */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100">
                <Activity className="text-green-600" size={24} />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Transaction Count</p>
                <h3 className="text-xl font-bold">128,543</h3>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <p className="text-sm text-green-500">+8.3% from last week</p>
            </div>
          </div>
          
          {/* Active Users */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-purple-100">
                <Users className="text-purple-600" size={24} />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Active Users</p>
                <h3 className="text-xl font-bold">75,842</h3>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <p className="text-sm text-green-500">+5.7% from last week</p>
            </div>
          </div>
          
          {/* Average Transaction */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-amber-100">
                <CreditCard className="text-amber-600" size={24} />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Avg. Transaction</p>
                <h3 className="text-xl font-bold">$126.35</h3>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="text-green-500 mr-1" size={16} />
              <p className="text-sm text-green-500">+3.2% from last week</p>
            </div>
          </div>
        </div>
        
        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Transaction Trend */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Transaction Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="deposits" 
                  stroke="#4f46e5" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="withdrawals" 
                  stroke="#10b981" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="transfers" 
                  stroke="#f59e0b" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="payments" 
                  stroke="#ef4444" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Hourly Distribution */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Hourly Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis yAxisId="left" orientation="left" stroke="#4f46e5" />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="transactions" name="Transactions" fill="#4f46e5" />
                <Bar yAxisId="right" dataKey="amount" name="Amount ($)" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* User Segments */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">User Segments</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {segmentData.map(segment => (
                <div key={segment.segment} className="bg-gray-50 rounded p-3 text-center">
                  <p className="text-sm text-gray-500">{segment.segment}</p>
                  <p className="font-bold">{segment.users.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">users</p>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={segmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="segment" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" name="Volume ($)" fill="#4f46e5" />
                <Bar dataKey="avgTransaction" name="Avg. Transaction ($)" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Geographic Distribution */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Geographic Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="country" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="transactions" name="Transactions" fill="#4f46e5" />
                <Bar dataKey="amount" name="Amount ($)" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Charts Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversion Metrics */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Conversion Metrics (%)</h2>
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={conversionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {conversionData.map((entry, index) => (
                      <Pie key={`cell-${index}`} fill={['#4f46e5', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-gray-50 rounded">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <DollarSign className="text-blue-600" size={16} />
                </div>
                <div>
                  <p className="font-medium">Large Deposit Alert</p>
                  <p className="text-sm text-gray-500">User ID #8752 made a deposit of $25,000</p>
                  <p className="text-xs text-gray-400 mt-1">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-gray-50 rounded">
                <div className="p-2 rounded-full bg-red-100 mr-3">
                  <Activity className="text-red-600" size={16} />
                </div>
                <div>
                  <p className="font-medium">Failed Transaction Spike</p>
                  <p className="text-sm text-gray-500">Detected 12% increase in failed transactions</p>
                  <p className="text-xs text-gray-400 mt-1">42 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-gray-50 rounded">
                <div className="p-2 rounded-full bg-green-100 mr-3">
                  <Users className="text-green-600" size={16} />
                </div>
                <div>
                  <p className="font-medium">New User Milestone</p>
                  <p className="text-sm text-gray-500">Platform reached 500,000 registered users</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white p-4 shadow-inner mt-8">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>E-Wallet Analytics Dashboard • Data refreshed: March 22, 2025 08:45 AM</p>
        </div>
      </footer>
    </div>
  );
}
export default Analytics
