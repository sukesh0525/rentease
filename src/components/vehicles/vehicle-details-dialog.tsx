
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import type { Vehicle } from "@/lib/data";
import Image from "next/image";

interface VehicleDetailsDialogProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
  onBookNow?: (vehicle: Vehicle) => void;
}

export function VehicleDetailsDialog({ vehicle, isOpen, onClose, onBookNow }: VehicleDetailsDialogProps) {
  if (!vehicle) return null;

  const handleBookNowClick = () => {
    if (onBookNow) {
      onBookNow(vehicle);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{vehicle.brand} {vehicle.name}</DialogTitle>
          <DialogDescription>
            Vehicle ID: {vehicle.id} | Plate: {vehicle.plate}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div>
                <Image 
                    src={vehicle.image} 
                    alt={`${vehicle.brand} ${vehicle.name}`} 
                    width={800} 
                    height={600}
                    data-ai-hint={vehicle.aiHint} 
                    className="rounded-lg object-cover w-full h-auto shadow-lg"
                />
            </div>
            <div className="space-y-4">
                <h4 className="font-semibold text-lg border-b pb-2">Vehicle Specifications</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <p><strong>Type:</strong></p><p>{vehicle.type}</p>
                    <p><strong>Year:</strong></p><p>{vehicle.year}</p>
                    <p><strong>Color:</strong></p><p>{vehicle.color}</p>
                    <p><strong>Seats:</strong></p><p>{vehicle.seats}</p>
                    <p><strong>Mileage:</strong></p><p>{vehicle.mileage}</p>
                    <p><strong>Status:</strong></p><p>{vehicle.status}</p>
                </div>

                <h4 className="font-semibold text-lg border-b pb-2 pt-4">Pricing</h4>
                 <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-primary">₹{vehicle.pricePerDay.toLocaleString()}</p>
                    <span className="text-muted-foreground">/ per day</span>
                 </div>
            </div>
        </div>
        <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
                <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
            {onBookNow && (
                 <Button onClick={handleBookNowClick} disabled={vehicle.status !== 'Available'}>
                    Book Now
                </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
