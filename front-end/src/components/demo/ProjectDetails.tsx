'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Edit,
  Download,
  ExternalLink,
  Copy,
  Share,
  Eye,
  Code,
  Smartphone,
  Tablet,
  Monitor,
  Maximize,
  Minimize,
  Calendar,
  Globe,
} from 'lucide-react';
import { WebsiteIdea } from '@/lib/api';
import { useState } from 'react';
import { toast } from 'sonner';

interface ProjectDetailsProps {
  websiteIdea: WebsiteIdea;
  onEdit?: (idea: WebsiteIdea) => void;
  onBack: () => void;
}

export function ProjectDetails({
  websiteIdea,
  onEdit,
  onBack,
}: ProjectDetailsProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'code' | 'demo'>(
    'preview'
  );
  const [devicePreview, setDevicePreview] = useState<
    'desktop' | 'tablet' | 'mobile'
  >('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const createdDate = new Date(websiteIdea.createdAt);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Content copied to clipboard!');
  };

  const downloadHtml = () => {
    const landingPageContent = websiteIdea.sections[0]?.content || '';
    const isCompleteHtml = landingPageContent.includes('<!DOCTYPE html>');

    const htmlContent = isCompleteHtml
      ? landingPageContent
      : `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteIdea.idea}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; padding: 0; }
        @media (max-width: 768px) {
            .container { padding: 1rem; }
        }
    </style>
</head>
<body>
${landingPageContent}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${websiteIdea.idea
      .replace(/\s+/g, '-')
      .toLowerCase()}-landing-page.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Landing page downloaded!');
  };

  const openLiveDemo = () => {
    const landingPageContent = websiteIdea.sections[0]?.content || '';
    const isCompleteHtml = landingPageContent.includes('<!DOCTYPE html>');

    const htmlContent = isCompleteHtml
      ? landingPageContent
      : `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteIdea.idea}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; padding: 0; }
        @media (max-width: 768px) {
            .container { padding: 1rem; }
        }
    </style>
</head>
<body>
${landingPageContent}
</body>
</html>`;

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  };

  const deviceClasses = {
    desktop: 'w-full h-full',
    tablet: 'w-4/5 h-4/5 mx-auto',
    mobile: 'w-80 h-full mx-auto',
  };

  const landingPageContent = websiteIdea.sections[0]?.content || '';
  const isCompleteHtml = landingPageContent.includes('<!DOCTYPE html>');

  const iframeContent = isCompleteHtml
    ? landingPageContent
    : `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteIdea.idea}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; padding: 0; }
        @media (max-width: 768px) {
            .container { padding: 1rem; }
        }
    </style>
</head>
<body>
${landingPageContent}
</body>
</html>`;

  return (
    <div
      className={`w-full ${
        isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'max-w-7xl mx-auto'
      } space-y-6`}
    >
      {/* Project Header */}
      <Card className='border-none bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-cyan-950/20'>
        <CardContent className='p-8'>
          <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6'>
            <div className='space-y-4 flex-1 '>
              <div className='flex items-center gap-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={onBack}
                  className='text-muted-foreground hover:text-foreground'
                >
                  ← Back to Dashboard
                </Button>
              </div>

              <div className='space-y-2'>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent leading-tight pb-2'>
                  {websiteIdea.idea}
                </h1>
                <div className='flex items-center gap-5'>
                  <Badge
                    variant={
                      websiteIdea.status === 'completed'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {websiteIdea.status}
                  </Badge>
                  <span className='text-sm text-muted-foreground'>
                    {websiteIdea.sections.length} sections generated
                  </span>
                  <Separator orientation='vertical' className='h-4' />
                  <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                    <Calendar className='h-3 w-3' />
                    Created {createdDate.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <div className='flex gap-2'>
                <Button onClick={downloadHtml} className='flex-1'>
                  <Download className='h-4 w-4 mr-2' />
                  Download
                </Button>
                <Button onClick={openLiveDemo} variant='outline'>
                  <ExternalLink className='h-4 w-4 mr-2' />
                  Live Demo
                </Button>
              </div>

              <div className='flex gap-2'>
                {onEdit && (
                  <Button
                    variant='outline'
                    onClick={() => onEdit(websiteIdea)}
                    className='flex-1'
                  >
                    <Edit className='h-4 w-4 mr-2' />
                    Edit
                  </Button>
                )}
                <Button variant='outline'>
                  <Share className='h-4 w-4 mr-2' />
                  Share
                </Button>
              </div>

              <Button
                variant='outline'
                onClick={() =>
                  copyToClipboard(
                    websiteIdea.sections.map((s) => s.content).join('\n\n')
                  )
                }
                className='w-full'
              >
                <Copy className='h-4 w-4 mr-2' />
                Copy All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Controls */}
      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <Tabs
                value={viewMode}
                onValueChange={(value) =>
                  setViewMode(value as 'preview' | 'code' | 'demo')
                }
              >
                <TabsList className='grid w-full grid-cols-3 max-w-md'>
                  <TabsTrigger
                    value='preview'
                    className='flex items-center gap-2'
                  >
                    <Eye className='h-4 w-4' />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value='code' className='flex items-center gap-2'>
                    <Code className='h-4 w-4' />
                    Code
                  </TabsTrigger>
                  <TabsTrigger value='demo' className='flex items-center gap-2'>
                    <Globe className='h-4 w-4' />
                    Live Demo
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? (
                    <Minimize className='h-4 w-4' />
                  ) : (
                    <Maximize className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </div>

            {viewMode === 'preview' && (
              <div className='flex items-center gap-2'>
                <span className='text-sm text-muted-foreground'>Device:</span>
                <div className='flex gap-1'>
                  {[
                    { key: 'desktop', icon: Monitor, label: 'Desktop' },
                    { key: 'tablet', icon: Tablet, label: 'Tablet' },
                    { key: 'mobile', icon: Smartphone, label: 'Mobile' },
                  ].map((device) => (
                    <Button
                      key={device.key}
                      variant={
                        devicePreview === device.key ? 'default' : 'outline'
                      }
                      size='sm'
                      onClick={() =>
                        setDevicePreview(
                          device.key as 'desktop' | 'tablet' | 'mobile'
                        )
                      }
                    >
                      <device.icon className='h-4 w-4' />
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area */}
      <Card className='overflow-hidden'>
        <CardContent className='p-0'>
          {viewMode === 'preview' && (
            <div className='p-6 bg-muted/30'>
              <div
                className={`${deviceClasses[devicePreview]} border rounded-lg overflow-hidden bg-white shadow-lg`}
              >
                <iframe
                  srcDoc={iframeContent}
                  className='w-full h-96 md:h-[600px] lg:h-[800px]'
                  title='Website Preview'
                />
              </div>
            </div>
          )}

          {viewMode === 'code' && (
            <div className='p-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold'>Generated Code</h3>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => copyToClipboard(landingPageContent)}
                >
                  <Copy className='h-4 w-4 mr-2' />
                  Copy Code
                </Button>
              </div>
              <div className='relative'>
                <pre className='bg-muted p-4 rounded-lg overflow-auto max-h-96 text-sm'>
                  <code>{landingPageContent}</code>
                </pre>
              </div>
            </div>
          )}

          {viewMode === 'demo' && (
            <div className='p-6'>
              <div className='aspect-video w-full border rounded-lg overflow-hidden bg-white shadow-lg'>
                <iframe
                  srcDoc={iframeContent}
                  className='w-full h-full'
                  title='Live Demo'
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
