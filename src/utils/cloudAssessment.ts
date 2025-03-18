import axios from 'axios';

export interface AssessmentRequest {
  provider: string;
  region: string;
  email: string;
  responses: Record<string, string>;
}

export interface AssessmentResult {
  id: string;
  status: 'pass' | 'fail' | 'warning';
  details: string;
  recommendations: string[];
  category: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AssessmentResponse {
  results: AssessmentResult[];
  score: number;
  summary: string;
  timestamp: string;
  recommendations: {
    critical: string[];
    important: string[];
    suggested: string[];
  };
  riskLevel: 'high' | 'medium' | 'low';
  categories: {
    [key: string]: {
      score: number;
      total: number;
      passing: number;
    };
  };
}

export async function performCloudAssessment(data: AssessmentRequest): Promise<AssessmentResponse> {
  try {
    const response = await axios.post('/.netlify/functions/cloud-assessment', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Cloud assessment failed:', error);
    throw new Error('Failed to perform cloud assessment');
  }
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#22c55e'; // green-500
  if (score >= 60) return '#eab308'; // yellow-500
  return '#ef4444'; // red-500
}

export function getRiskLevelColor(level: 'high' | 'medium' | 'low'): string {
  switch (level) {
    case 'high': return '#ef4444'; // red-500
    case 'medium': return '#eab308'; // yellow-500
    case 'low': return '#22c55e'; // green-500
  }
}

export function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}