import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { exampleIdeas } from '@/data/data';
import { Lightbulb } from 'lucide-react';

interface IdeasSectionProps {
  handleExampleClick: (example: string) => void;
}

export const IdeasSection = ({ handleExampleClick }: IdeasSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Lightbulb className='h-5 w-5 text-amber-500' />
          Need Inspiration?
        </CardTitle>
        <CardDescription>
          Click any example below to get started quickly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
          {exampleIdeas.map((example, index) => (
            <Card
              key={index}
              className='cursor-pointer hover:bg-muted/50 transition-colors border-dashed hover:border-solid hover:border-primary/50'
              onClick={() => handleExampleClick(example)}
            >
              <CardContent className='p-4'>
                <p className='text-sm font-medium text-center'>{example}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
