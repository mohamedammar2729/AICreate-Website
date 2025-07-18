import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { websiteIdeaApi} from '@/lib/api';
import { toast } from 'sonner';

// Query key factory
export const websiteIdeaKeys = {
  all: ['website-ideas'] as const,
  lists: () => [...websiteIdeaKeys.all, 'list'] as const,
  list: (filters: string) => [...websiteIdeaKeys.lists(), { filters }] as const,
  details: () => [...websiteIdeaKeys.all, 'detail'] as const,
  detail: (id: string) => [...websiteIdeaKeys.details(), id] as const,
};

// Get all website ideas
export const useWebsiteIdeas = () => {
  return useQuery({
    queryKey: websiteIdeaKeys.lists(),
    queryFn: async () => {
      const response = await websiteIdeaApi.getAll();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data || [];
    },
  });
};

// Get a specific website idea
export const useWebsiteIdea = (id: string) => {
  return useQuery({
    queryKey: websiteIdeaKeys.detail(id),
    queryFn: async () => {
      const response = await websiteIdeaApi.getById(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    enabled: !!id,
  });
};

// Create a website idea
export const useCreateWebsiteIdea = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (idea: string) => {
      const response = await websiteIdeaApi.create(idea);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: websiteIdeaKeys.lists() });
      toast.success('Website idea created successfully!');
      return data;
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create website idea');
    },
  });
};

 // Update a website idea
// export const useUpdateWebsiteIdea = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({
//       id,
//       updates,
//     }: {
//       id: string;
//       updates: Partial<WebsiteIdea>;
//     }) => {
//       const response = await websiteIdeaApi.update(id, updates);
//       if (!response.success) {
//         throw new Error(response.message);
//       }
//       return response.data;
//     },
//     onSuccess: (data, { id }) => {
//       queryClient.invalidateQueries({ queryKey: websiteIdeaKeys.lists() });
//       queryClient.invalidateQueries({ queryKey: websiteIdeaKeys.detail(id) });
//       toast.success('Website idea updated successfully!');
//     },
//     onError: (error: Error) => {
//       toast.error(error.message || 'Failed to update website idea');
//     },
//   });
// };

// Delete a website idea
// export const useDeleteWebsiteIdea = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id: string) => {
//       const response = await websiteIdeaApi.delete(id);
//       if (!response.success) {
//         throw new Error(response.message);
//       }
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: websiteIdeaKeys.lists() });
//       toast.success('Website idea deleted successfully!');
//     },
//     onError: (error: Error) => {
//       toast.error(error.message || 'Failed to delete website idea');
//     },
//   });
// };
