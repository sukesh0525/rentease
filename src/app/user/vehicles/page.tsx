
"use client";

import { vehicles, type Vehicle } from "@/lib/data";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { BookingDialog } from "@/components/vehicles/booking-dialog";

export default function UserVehiclesPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const availableVehicles = vehicles.filter(v => v.status === 'Available');

  const handleBookNow = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleCloseDialog = () => {
    setSelectedVehicle(null);
  };

  return (
    <div className="fade-in space-y-6">
      <Header title="Our Fleet" />
      <Card>
        <CardContent className="p-4 flex flex-wrap items-center gap-4">
            <Input type="text" placeholder="Search vehicles..." className="flex-grow min-w-[200px]" />
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                    <SelectItem value="tata">Tata</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                </SelectContent>
            </Select>
            <Button className="w-full md:w-auto">Search</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {availableVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} onBookNow={handleBookNow} />
        ))}
      </div>

      {selectedVehicle && (
        <BookingDialog 
            vehicle={selectedVehicle} 
            isOpen={!!selectedVehicle}
            onClose={handleCloseDialog}
        />
      )}
    </div>
  );
}
