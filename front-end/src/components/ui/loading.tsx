'use client';

import { Loader2, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  message?: string;
  showSkeleton?: boolean;
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function LoadingState({
  message = 'Loading...',
  showSkeleton = false,
}: LoadingStateProps) {
  if (showSkeleton) {
    return (
      <div className='space-y-8'>
        {/* Header Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className='h-8 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </CardHeader>
        </Card>

        {/* Stats Skeleton */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-4 rounded-full' />
                </div>
                <Skeleton className='h-8 w-16' />
                <Skeleton className='h-3 w-20' />
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Content Cards Skeleton */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {[...Array(6)].map((_, i) => (
            <Card key={i} className='border-l-4 border-l-primary/20'>
              <CardHeader>
                <Skeleton className='h-5 w-3/4' />
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-5 w-16' />
                  <Skeleton className='h-4 w-20' />
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-4/5' />
                <Skeleton className='h-8 w-full' />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardContent className='flex flex-col items-center justify-center py-16'>
        <div className='relative mb-6'>
          <div className='relative'>
            <Sparkles className='h-12 w-12 text-primary animate-pulse' />
            <div className='absolute inset-0 animate-ping'>
              <Sparkles className='h-12 w-12 text-primary/20' />
            </div>
          </div>
          <Loader2 className='h-6 w-6 animate-spin absolute -top-1 -right-1 text-primary' />
        </div>
        <h3 className='text-xl font-semibold text-center mb-2'>{message}</h3>
        <p className='text-sm text-muted-foreground text-center max-w-md'>
          Our AI is working hard to create something amazing for you. This
          usually takes just a few seconds...
        </p>
        <div className='flex items-center gap-2 mt-4 text-xs text-muted-foreground'>
          <div className='flex gap-1'>
            <div className='w-2 h-2 bg-primary rounded-full animate-pulse' />
            <div className='w-2 h-2 bg-primary rounded-full animate-pulse delay-75' />
            <div className='w-2 h-2 bg-primary rounded-full animate-pulse delay-150' />
          </div>
          <span>Processing</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function ErrorState({
  message = 'Something went wrong',
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className='w-full max-w-2xl mx-auto border-destructive/20'>
      <CardContent className='flex flex-col items-center justify-center py-16'>
        <div className='relative mb-6'>
          <div className='rounded-full bg-destructive/10 p-4'>
            <AlertCircle className='h-8 w-8 text-destructive' />
          </div>
        </div>
        <CardTitle className='text-xl font-semibold text-center mb-2 text-destructive'>
          {message}
        </CardTitle>
        <p className='text-sm text-muted-foreground text-center max-w-md mb-6'>
          We encountered an issue while loading your data. Please try again or
          contact support if the problem persists.
        </p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant='outline'
            className='border-destructive/20 hover:bg-destructive/10'
          >
            <RefreshCw className='h-4 w-4 mr-2' />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
