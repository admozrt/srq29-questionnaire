import { PersonalInfo, Results, QuestionnaireAnswers } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export interface SubmitScreeningData {
  personal_info: PersonalInfo;
  results: Results;
  answers: QuestionnaireAnswers;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface ScreeningStatistics {
  total_tests: number;
  today_tests: number;
  this_month_tests: number;
  positive_results: {
    gme: number;
    substance: number;
    psychotic: number;
    ptsd: number;
  };
  average_score: number;
}

class ApiService {
  private async request<T = any>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * Submit screening test results to backend
   */
  async submitScreeningResults(data: SubmitScreeningData): Promise<ApiResponse> {
    return this.request('/screening/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Get screening statistics
   */
  async getStatistics(): Promise<ApiResponse<ScreeningStatistics>> {
    return this.request('/screening/statistics');
  }

  /**
   * Get recent screening tests
   */
  async getRecentTests(limit: number = 10): Promise<ApiResponse> {
    return this.request(`/screening/recent?limit=${limit}`);
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health');
  }
}

export const apiService = new ApiService();