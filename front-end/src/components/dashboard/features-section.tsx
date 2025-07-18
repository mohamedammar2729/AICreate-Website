import { features } from '@/data/data';
import { Card, CardContent } from '@/components/ui/card';

export const FeaturesSection = () => {
  return (
    <section className='space-y-6'>
      <div className='text-center space-y-2'>
        <h3 className='text-2xl font-bold'>Powerful Features</h3>
        <p className='text-muted-foreground'>
          Everything you need to create professional landing pages
        </p>
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {features.map((feature, index) => (
          <Card
            key={index}
            className='group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20'
          >
            <CardContent className='p-6 text-center space-y-4'>
              <div
                className={`inline-flex p-3 rounded-full bg-muted group-hover:bg-primary/10 transition-colors`}
              >
                <feature.icon
                  className={`h-6 w-6 ${feature.color} group-hover:scale-110 transition-transform`}
                />
              </div>
              <div className='space-y-2'>
                <h4 className='font-semibold'>{feature.title}</h4>
                <p className='text-sm text-muted-foreground'>
                  {feature.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
