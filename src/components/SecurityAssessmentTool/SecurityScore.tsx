import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SecurityScoreProps {
  score: number;
  previousScore?: number;
}

export default function SecurityScore({ score, previousScore }: SecurityScoreProps) {
  const industryAverage = 75; // Example industry average
  const getScoreColor = (value: number) => {
    if (value >= 80) return '#22c55e'; // green-500
    if (value >= 60) return '#eab308'; // yellow-500
    return '#ef4444'; // red-500
  };

  const getScoreLabel = (value: number) => {
    if (value >= 80) return 'Good';
    if (value >= 60) return 'Average';
    return 'Poor';
  };

  const getTrendIcon = () => {
    if (!previousScore) return null;
    if (score > previousScore) return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (score < previousScore) return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const chartData = {
    labels: ['Score', 'Remaining'],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: [getScoreColor(score), '#e5e7eb'],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-[#0a2463]">Security Score</h3>
        <button className="text-gray-500 hover:text-[#0a2463]" title="Learn more about security scores">
          <Info className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative">
          <div className="w-48 h-48 mx-auto">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-3xl font-bold" style={{ color: getScoreColor(score) }}>
                {score}
              </div>
              <div className="text-sm text-gray-500">out of 100</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Your Score</span>
              <div className="flex items-center space-x-2">
                <span className="font-semibold" style={{ color: getScoreColor(score) }}>
                  {score} - {getScoreLabel(score)}
                </span>
                {getTrendIcon()}
              </div>
            </div>
            {previousScore && (
              <div className="text-sm text-gray-500">
                Previous: {previousScore} ({score - previousScore > 0 ? '+' : ''}{score - previousScore})
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Industry Average</span>
              <span className="font-semibold" style={{ color: getScoreColor(industryAverage) }}>
                {industryAverage}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${industryAverage}%`,
                  backgroundColor: getScoreColor(industryAverage)
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}