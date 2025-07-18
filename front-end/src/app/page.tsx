'use client';

import { useState } from 'react';
import { Toaster } from 'sonner';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { ProjectDetails } from '@/components/demo/ProjectDetails';
import { WebsiteIdeaForm } from '@/components/form/WebsiteCreationForm';
import { LoadingState, ErrorState } from '@/components/ui/loading';
import { useWebsiteIdeas } from '@/hooks/useWebsiteIdeas';
import { WebsiteIdea } from '@/lib/api';

export default function Home() {
  const [selectedIdea, setSelectedIdea] = useState<WebsiteIdea | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { data: websiteIdeas, isLoading, error, refetch } = useWebsiteIdeas();

  const handleFormSuccess = (data: WebsiteIdea) => {
    setSelectedIdea(data);
    setShowForm(false);
  };

  const handleCreateNew = () => {
    setSelectedIdea(null);
    setShowForm(true);
  };

  const handleSelectIdea = (idea: WebsiteIdea | null) => {
    setSelectedIdea(idea);
    setShowForm(false);
  };

  const handleBackToDashboard = () => {
    setSelectedIdea(null);
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50'>
        <div className='container mx-auto px-4 py-8'>
          <LoadingState message='Loading your website studio...' showSkeleton />
        </div>
        <Toaster position='top-right' richColors />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50'>
        <div className='container mx-auto px-4 py-8'>
          <ErrorState
            message='Failed to load website studio'
            onRetry={() => refetch()}
          />
        </div>
        <Toaster position='top-right' richColors />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className='min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50'>
        <AppSidebar
          selectedIdea={selectedIdea}
          onSelectIdea={handleSelectIdea}
          onCreateNew={handleCreateNew}
        />

        <SidebarInset className='flex-1 flex flex-col overflow-hidden'>
          <AppHeader
            selectedIdea={selectedIdea}
            onRefresh={refetch}
            isLoading={isLoading}
          />

          <main className='flex-1 overflow-auto'>
            <div className='container mx-auto px-6 py-8 max-w-7xl'>
              {showForm ? (
                <div className='space-y-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <h1 className='text-3xl font-bold'>Create New Project</h1>
                      <p className='text-muted-foreground mt-1'>
                        Describe your website idea and let AI create it for you
                      </p>
                    </div>
                  </div>
                  <WebsiteIdeaForm onSuccess={handleFormSuccess} />
                </div>
              ) : selectedIdea ? (
                <ProjectDetails
                  websiteIdea={selectedIdea}
                  onEdit={(idea: WebsiteIdea) => setSelectedIdea(idea)}
                  onBack={handleBackToDashboard}
                />
              ) : (
                <Dashboard
                  websiteIdeas={websiteIdeas || []}
                  onCreateNew={handleCreateNew}
                  onSelectIdea={handleSelectIdea}
                />
              )}
            </div>
          </main>
        </SidebarInset>
      </div>

      <Toaster position='top-right' richColors />
    </SidebarProvider>
  );
}
