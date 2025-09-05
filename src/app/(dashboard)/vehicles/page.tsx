
"use client";

import { useState } from "react";
import { vehicles, type Vehicle } from "@/lib/data";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { VehicleDetailsDialog } from "@/components/vehicles/vehicle-details-dialog";

export default function VehiclesPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleCloseDialog = () => {
    setSelectedVehicle(null);
  };


  return (
    <div className="fade-in space-y-6">
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
            <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                </SelectContent>
            </Select>
            <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Add Vehicle
            </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} onViewDetails={handleViewDetails} />
        ))}
      </div>

       {selectedVehicle && (
        <VehicleDetailsDialog 
            vehicle={selectedVehicle} 
            isOpen={!!selectedVehicle}
            onClose={handleCloseDialog}
        />
      )}
    </div>
  );
}
