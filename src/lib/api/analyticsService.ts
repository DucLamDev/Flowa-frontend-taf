import axiosInstance from './axiosConfig';

interface DateRange {
  startDate: string;
  endDate: string;
}

export const analyticsService = {
  getContentPerformance: async (brandId: string, dateRange?: DateRange) => {
    let url = `/analytics/content-performance/${brandId}`;
    if (dateRange) {
      url += `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
    }
    const response = await axiosInstance.get(url);
    return response.data;
  },

  getSocialMediaPerformance: async (brandId: string, platform?: string, dateRange?: DateRange) => {
    let url = `/analytics/social-performance/${brandId}`;
    const params = [];
    if (platform) params.push(`platform=${platform}`);
    if (dateRange) {
      params.push(`startDate=${dateRange.startDate}`);
      params.push(`endDate=${dateRange.endDate}`);
    }
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    const response = await axiosInstance.get(url);
    return response.data;
  },

  getContentAnalysis: async (contentId: string) => {
    const response = await axiosInstance.get(`/analytics/content-analysis/${contentId}`);
    return response.data;
  },

  getImprovementSuggestions: async (brandId: string, contentType?: string) => {
    let url = `/analytics/improvement-suggestions/${brandId}`;
    if (contentType) {
      url += `?contentType=${contentType}`;
    }
    const response = await axiosInstance.get(url);
    return response.data;
  },

  getEngagementMetrics: async (brandId: string, dateRange?: DateRange) => {
    let url = `/analytics/engagement/${brandId}`;
    if (dateRange) {
      url += `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
    }
    const response = await axiosInstance.get(url);
    return response.data;
  },

  getAudienceInsights: async (brandId: string) => {
    const response = await axiosInstance.get(`/analytics/audience/${brandId}`);
    return response.data;
  },
};
