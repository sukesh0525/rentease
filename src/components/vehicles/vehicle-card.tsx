
"use client";

import type { Vehicle } from "@/lib/data";
import { getStatusBadge } from "@/lib/utils.tsx";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface VehicleCardProps {
    vehicle: Vehicle;
    onBookNow?: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onBookNow }: VehicleCardProps) {
    const handleBookNowClick = () => {
        if (onBookNow) {
            onBookNow(vehicle);
        }
    }
    return (
        <Card className="overflow-hidden interactive-card flex flex-col">
            <CardHeader className="p-0">
                <Image 
                    src={vehicle.image} 
                    alt={`${vehicle.brand} ${vehicle.name}`} 
                    width={600} 
                    height={400} 
                    data-ai-hint={vehicle.aiHint}
                    className="w-full h-48 object-cover"
                />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-muted-foreground">{vehicle.brand}</p>
                        <h3 className="font-bold text-xl font-headline">{vehicle.name}</h3>
                    </div>
                    {getStatusBadge(vehicle.status)}
                </div>
                <div className="mt-4 text-sm text-muted-foreground grid grid-cols-2 gap-x-4 gap-y-1">
                    <p><strong>Year:</strong> {vehicle.year}</p>
                    <p><strong>Color:</strong> {vehicle.color}</p>
                    <p><strong>Seats:</strong> {vehicle.seats}</p>
                    <p><strong>Mileage:</strong> {vehicle.mileage}</p>
                </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
                <p className="text-lg font-semibold">₹{vehicle.pricePerDay.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/day</span></p>
                {onBookNow ? (
                    <Button onClick={handleBookNowClick} disabled={vehicle.status !== 'Available'}>Book Now</Button>
                ) : (
                    <Button disabled={vehicle.status !== 'Available'}>View Details</Button>
                )}
            </CardFooter>
        </Card>
    );
}
