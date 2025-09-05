
import { Car } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-background/50 backdrop-blur-sm">
      <div className="relative w-full overflow-hidden h-16 flex items-center">
        <div className="absolute left-0 car-loader">
          <Car className="w-12 h-12 text-primary" />
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold font-headline animate-pulse">Loading, please wait...</p>
    </div>
  );
}
