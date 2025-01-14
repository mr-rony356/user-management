import { apiClient } from '@/lib/apiClient';

const BASE_URL = 'https://api.frill.co/v1';

export const getIdeas = async (token: string) => {
  return apiClient(`${BASE_URL}/ideas`, 'GET', undefined, token);
};

export const getIdeaById = async (id: string, token: string) => {
  return apiClient(`${BASE_URL}/ideas/${id}`, 'GET', undefined, token);
};

export const createIdea = async (
  token: string,
  data: { title: string; description: string }
) => {
  return apiClient(`${BASE_URL}/ideas`, 'POST', data, token);
};

// Add more endpoints as needed
