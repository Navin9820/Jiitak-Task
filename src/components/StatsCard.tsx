interface StatsCardProps {
  title: string
  value: string
  unit: string
  subtitle: string
  change: string
  changeType: 'positive' | 'negative'
  period: string
}

export default function StatsCard({ 
  title, 
  value, 
  unit, 
  subtitle, 
  change, 
  changeType,
  period 
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-noto font-medium text-gray-900 text-sm">{title}</h3>
        <span className="text-xs text-gray-500">{period}</span>
      </div>
      
      <div className="mb-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="text-lg text-gray-600 ml-1">{unit}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{subtitle}</span>
        <span className={`text-sm font-medium ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-500'
        }`}>
          {changeType === 'positive' ? '↑' : '↓'}{change}
        </span>
      </div>
    </div>
  )
}