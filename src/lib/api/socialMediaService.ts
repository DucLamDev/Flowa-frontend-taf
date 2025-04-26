import axiosInstance from './axiosConfig';

interface SocialAccountData {
  platform: string;
  accountName: string;
  accessToken: string;
  brandId: string;
}

interface PostData {
  brandId: string;
  content: string;
  platform: string;
  scheduledTime?: string;
  mediaUrls?: string[];
  socialAccountId?: string;
}

export const socialMediaService = {
  connectAccount: async (data: SocialAccountData) => {
    const response = await axiosInstance.post('/social/connect', data);
    return response.data;
  },

  getAccounts: async (brandId: string) => {
    const response = await axiosInstance.get(`/social/accounts/${brandId}`);
    return response.data;
  },

  createPost: async (data: PostData) => {
    const response = await axiosInstance.post('/social/post', data);
    return response.data;
  },

  schedulePosts: async (posts: PostData[]) => {
    const response = await axiosInstance.post('/social/schedule', { posts });
    return response.data;
  },

  getPosts: async (brandId: string, platform?: string, status?: string) => {
    let url = `/social/posts/${brandId}`;
    if (platform || status) {
      url += '?';
      if (platform) url += `platform=${platform}&`;
      if (status) url += `status=${status}`;
    }
    const response = await axiosInstance.get(url);
    return response.data;
  },

  updatePostStatus: async (postId: string, status: string) => {
    const response = await axiosInstance.put(`/social/posts/${postId}/status`, { status });
    return response.data;
  },
};
