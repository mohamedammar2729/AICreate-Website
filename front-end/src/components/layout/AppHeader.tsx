'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  RefreshCw,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Command,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { WebsiteIdea } from '@/lib/api';

interface AppHeaderProps {
  selectedIdea: WebsiteIdea | null;
  onRefresh: () => void;
  isLoading: boolean;
}

export function AppHeader({
  selectedIdea,
  onRefresh,
  isLoading,
}: AppHeaderProps) {
  const breadcrumbItems = selectedIdea
    ? [
        { label: 'Dashboard', href: '/' },
        { label: 'Projects', href: '/' },
        { label: selectedIdea.idea.slice(0, 30) + '...', current: true },
      ]
    : [{ label: 'Dashboard', current: true }];

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-16 items-center gap-4 px-4'>
        <SidebarTrigger className='-ml-1' />

        <div className='flex-1 flex items-center gap-4'>
          {/* Breadcrumb Navigation */}
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <div key={item.label} className='flex items-center'>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {item.current ? (
                      <BreadcrumbPage className='font-medium'>
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href}>
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Search Bar */}
          <div className='relative ml-auto flex-1 max-w-sm'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search projects... (⌘K)'
              className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
            />
            <kbd className='pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
              <span className='text-xs'>⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Header Actions */}
        <div className='flex items-center gap-2'>
          {/* Project Status */}
          {selectedIdea && (
            <Badge variant='outline' className='hidden sm:flex'>
              {selectedIdea.sections.length} sections
            </Badge>
          )}

          {/* Refresh Button */}
          <Button
            variant='outline'
            size='sm'
            onClick={onRefresh}
            disabled={isLoading}
            className='hidden sm:flex'
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
            />
            Refresh
          </Button>

          {/* Notifications */}
          <Button variant='ghost' size='sm' className='relative'>
            <Bell className='h-4 w-4' />
            <Badge
              variant='destructive'
              className='absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs'
            >
              2
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                <Avatar className='h-8 w-8'>
                  <AvatarFallback>
                    <User className='h-4 w-4' />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <div className='flex items-center justify-start gap-2 p-2'>
                <div className='flex flex-col space-y-1 leading-none'>
                  <p className='font-medium'>Welcome!</p>
                  <p className='w-[200px] truncate text-sm text-muted-foreground'>
                    AI Website Studio User
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Command className='mr-2 h-4 w-4' />
                <span>Keyboard shortcuts</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
