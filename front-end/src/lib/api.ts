import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface WebsiteSection {
  name: string;
  description: string;
  content: string;
  order: number;
}

export interface WebsiteIdea {
  _id: string;
  idea: string;
  userId?: string;
  sections: WebsiteSection[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  statusCode?: number;
}

export const websiteIdeaApi = {
  // Create a new website idea
  create: async (idea: string): Promise<ApiResponse<WebsiteIdea>> => {
    const response = await api.post('/api/website-ideas', { idea });
    return response.data;
  },

  // Get all website ideas
  getAll: async (): Promise<ApiResponse<WebsiteIdea[]>> => {
    const response = await api.get('/api/website-ideas');
    return response.data;
  },

  // Get a specific website idea
  getById: async (id: string): Promise<ApiResponse<WebsiteIdea>> => {
    const response = await api.get(`/api/website-ideas/${id}`);
    return response.data;
  },
};

// ***** features will implement soon *****

//   // Update a website idea
//   update: async (
//     id: string,
//     updates: Partial<WebsiteIdea>
//   ): Promise<ApiResponse<WebsiteIdea>> => {
//     const response = await api.patch(`/api/website-ideas/${id}`, updates);
//     return response.data;
//   },

//   // Delete a website idea
//   delete: async (id: string): Promise<ApiResponse<null>> => {
//     const response = await api.delete(`/api/website-ideas/${id}`);
//     return response.data;
//   },
// }