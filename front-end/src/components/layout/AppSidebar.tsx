'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  Sparkles,
  Home,
  FolderOpen,
  Settings,
  Plus,
  History,
  Palette,
  Code2,
  Download,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useWebsiteIdeas } from '@/hooks/useWebsiteIdeas';
import { WebsiteIdea } from '@/lib/api';

interface AppSidebarProps {
  selectedIdea: WebsiteIdea | null;
  onSelectIdea: (idea: WebsiteIdea | null) => void;
  onCreateNew: () => void;
}

export function AppSidebar({
  selectedIdea,
  onSelectIdea,
  onCreateNew,
}: AppSidebarProps) {
  const { data: websiteIdeas } = useWebsiteIdeas();

  const navigationItems = [
    {
      title: 'Dashboard',
      icon: Home,
      isActive: !selectedIdea,
      onClick: () => onSelectIdea(null),
    },
    {
      title: 'Projects',
      icon: FolderOpen,
      isActive: false,
    },
    {
      title: 'Templates',
      icon: Palette,
      isActive: false,
    },
    {
      title: 'Code Export',
      icon: Code2,
      isActive: false,
    },
  ];

  const toolsItems = [
    { title: 'AI Generator', icon: Sparkles },
    { title: 'Downloads', icon: Download },
    { title: 'Settings', icon: Settings },
    { title: 'Help', icon: HelpCircle },
  ];

  return (
    <Sidebar variant='inset' className='border-r-2'>
      <SidebarHeader className='p-4'>
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <Sparkles className='h-8 w-8 text-primary' />
            <div className='absolute inset-0 animate-ping'>
              <Sparkles className='h-8 w-8 text-primary/20' />
            </div>
          </div>
          <div>
            <h1 className='text-lg font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent leading-tight pb-1'>
              AI Website Studio
            </h1>
            <p className='text-xs text-muted-foreground leading-relaxed'>
              Professional Design Platform
            </p>
          </div>
        </div>

        <Button
          onClick={onCreateNew}
          className='w-full mt-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90'
        >
          <Plus className='h-4 w-4 mr-2' />
          New Project
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.isActive}
                    onClick={item.onClick}
                  >
                    <item.icon className='h-4 w-4' />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className='my-2' />

        <SidebarGroup>
          <SidebarGroupLabel className='flex items-center justify-between'>
            Recent Projects
            <Badge variant='secondary' className='text-xs'>
              {websiteIdeas?.length || 0}
            </Badge>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {websiteIdeas?.slice(0, 5).map((idea) => (
                <SidebarMenuItem key={idea._id}>
                  <SidebarMenuButton
                    isActive={selectedIdea?._id === idea._id}
                    onClick={() => onSelectIdea(idea)}
                    className='flex flex-col items-start p-3 h-auto'
                  >
                    <div className='flex items-center gap-2 w-full'>
                      <History className='h-3 w-3 flex-shrink-0' />
                      <span className='truncate text-sm font-medium'>
                        {idea.idea.slice(0, 30)}...
                      </span>
                    </div>
                    <div className='flex items-center gap-2 mt-1 w-full'>
                      <Badge
                        variant={
                          idea.status === 'completed' ? 'default' : 'secondary'
                        }
                        className='text-xs'
                      >
                        {idea.status}
                      </Badge>
                      <span className='text-xs text-muted-foreground'>
                        {idea.sections.length} sections
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className='my-2' />

        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <item.icon className='h-4 w-4' />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='p-4'>
        <div className='text-xs text-muted-foreground text-center leading-relaxed'>
          <p className='pb-1'>© 2025 AI Website Studio</p>
          <p className='pb-1'>Professional Landing Pages</p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
