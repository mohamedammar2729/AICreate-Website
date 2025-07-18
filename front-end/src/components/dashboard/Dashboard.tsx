'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Globe, ArrowRight } from 'lucide-react';
import { WebsiteIdea } from '@/lib/api';
import { FeaturesSection } from './features-section';

interface DashboardProps {
  websiteIdeas: WebsiteIdea[];
  onCreateNew: () => void;
  onSelectIdea: (idea: WebsiteIdea) => void;
}

export function Dashboard({
  websiteIdeas,
  onCreateNew,
  onSelectIdea,
}: DashboardProps) {
  return (
    <div className='space-y-8'>
      {/* Hero Section */}
      <section className='text-center space-y-6 py-12'>
        <div className='flex items-center justify-center gap-3 mb-6'>
          <div className='relative'>
            <Sparkles className='h-12 w-12 text-primary animate-pulse' />
            <div className='absolute inset-0 animate-ping'>
              <Sparkles className='h-12 w-12 text-primary/20' />
            </div>
          </div>
          <Badge variant='secondary' className='px-3 py-1'>
            AI-Powered
          </Badge>
        </div>

        <div className='space-y-4 max-w-4xl mx-auto'>
          <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight pb-2'>
            Professional Landing Pages
          </h1>
          <h2 className='text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed'>
            Transform your ideas into stunning websites with AI
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
            Our advanced AI generates complete, responsive landing pages with
            modern design systems, optimized code, and professional layouts in
            seconds.
          </p>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-4 mt-8'>
          <Button
            onClick={onCreateNew}
            size='lg'
            className='bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90'
          >
            <Sparkles className='mr-2 h-5 w-5' />
            Create New Project
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
          <Button variant='outline' size='lg'>
            <Globe className='mr-2 h-4 w-4' />
            View Templates
          </Button>
        </div>
      </section>
      {/* Features Section */}
      <FeaturesSection />

      {/* Recent Projects Preview in cards */}
      {websiteIdeas.length > 0 && (
        <section className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-2xl font-bold'>Recent Projects</h3>
              <p className='text-muted-foreground'>
                Your latest AI-generated websites
              </p>
            </div>
            <Button variant='outline'>
              View All
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </div>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {websiteIdeas.slice(0, 6).map((idea) => (
              <Card
                key={idea._id}
                className='group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 justify-between'
                onClick={() => onSelectIdea(idea)}
              >
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div className='space-y-1 flex-1'>
                      <CardTitle className='text-lg group-hover:text-primary transition-colors line-clamp-2'>
                        {idea.idea}
                      </CardTitle>
                      <div className='flex items-center gap-2'>
                        <Badge
                          variant={
                            idea.status === 'completed'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {idea.status}
                        </Badge>
                        <span className='text-sm text-muted-foreground'>
                          {idea.sections.length} sections
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <p className='text-xs text-muted-foreground line-clamp-2 flex flex-col justify-between'>
                        • Generated{' '}
                        {new Date(idea.createdAt).toLocaleDateString()}{' '}
                      </p>
                      <p className='text-xs text-muted-foreground line-clamp-2 flex flex-col justify-between'>
                        • Last updated{' '}
                        {new Date(idea.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Separator />
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-1'>
                        {idea.sections.slice(0, 3).map((_, index) => (
                          <div
                            key={index}
                            className='w-2 h-2 bg-primary/30 rounded-full'
                          />
                        ))}
                        {idea.sections.length > 3 && (
                          <span className='text-xs text-muted-foreground ml-1'>
                            +{idea.sections.length - 3}
                          </span>
                        )}
                      </div>
                      <ArrowRight className='h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
