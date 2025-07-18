'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles, Lightbulb, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCreateWebsiteIdea } from '@/hooks/useWebsiteIdeas';
import { WebsiteIdea } from '@/lib/api';
import { FormData, formSchema } from '@/validations/form';
import { IdeasSection } from './ideas-section';






interface WebsiteIdeaFormProps {
  onSuccess?: (data: WebsiteIdea) => void;
}

export function WebsiteIdeaForm({ onSuccess }: WebsiteIdeaFormProps) {
  const createMutation = useCreateWebsiteIdea();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const watchedIdea = watch('idea', '');

  const onSubmit = async (data: FormData) => {
    try {
      const result = await createMutation.mutateAsync(data.idea);
      if (result) {
        onSuccess?.(result);
      }
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleExampleClick = (example: string) => {
    setValue('idea', example);
  };

  return (
    <div className='max-w-4xl mx-auto space-y-8'>
      {/* Hero Section */}
      <Card className='border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors bg-gradient-to-br from-primary/5 via-blue-50/50 to-purple-50/50 dark:from-primary/5 dark:via-blue-950/20 dark:to-purple-950/20'>
        <CardHeader className='text-center pb-6'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='relative'>
              <Sparkles className='h-8 w-8 text-primary animate-pulse' />
              <div className='absolute inset-0 animate-ping'>
                <Sparkles className='h-8 w-8 text-primary/20' />
              </div>
            </div>
            <Badge variant='secondary' className='px-3 py-1'>
              AI-Powered
            </Badge>
          </div>

          <CardTitle className='text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent leading-tight pb-2'>
            Create Your Perfect Website
          </CardTitle>
          <CardDescription className='text-lg mt-2 max-w-2xl mx-auto leading-relaxed'>
            Describe your vision and watch our AI transform it into a
            professional, responsive landing page with modern design and
            optimized code.
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-6'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Target className='h-5 w-5 text-primary' />
                <Label htmlFor='idea' className='text-lg font-semibold'>
                  What&apos;s your website idea?
                </Label>
              </div>

              <Textarea
                id='idea'
                placeholder="Describe your website idea in detail... e.g., 'Modern bakery specializing in artisan sourdough breads, organic pastries, Features online ordering.'"
                {...register('idea')}
                disabled={createMutation.isPending}
                className='min-h-[120px] text-base resize-none'
                rows={4}
              />

              <div className='flex items-center justify-between text-sm'>
                {errors.idea ? (
                  <p className='text-destructive'>{errors.idea.message}</p>
                ) : (
                  <div className='flex items-center gap-2 text-muted-foreground'>
                    <Lightbulb className='h-4 w-4' />
                    <span>
                      Be specific about your business, services, and target
                      audience
                    </span>
                  </div>
                )}
                <span
                  className={`text-xs ${
                    watchedIdea.length > 180
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  }`}
                >
                  {watchedIdea.length}/200
                </span>
              </div>
            </div>

            <Separator className='my-6' />

            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 py-6 text-lg'
              disabled={createMutation.isPending}
              size='lg'
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className='mr-3 h-5 w-5 animate-spin' />
                  AI is crafting your website...
                </>
              ) : (
                <>
                  <Zap className='mr-3 h-5 w-5' />
                  Generate Professional Website
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Example Ideas */}
      <IdeasSection handleExampleClick={handleExampleClick} />

    </div>
  );
}
