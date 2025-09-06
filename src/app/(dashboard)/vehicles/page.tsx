
"use client";

import { useState } from "react";
import { vehicles, type Vehicle } from "@/lib/data";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AdminVehicleDetailsDialog } from "@/components/vehicles/admin-vehicle-details-dialog";
import { AdminAddVehicleDialog } from "@/components/vehicles/admin-add-vehicle-dialog";
import { useToast } from "@/hooks/use-toast";

export default function VehiclesPage() {
  const [vehicleList, setVehicleList] = useState(vehicles);
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleViewDetails = (vehicle: Vehicle) => {
    setVehicleToEdit(vehicle);
  };

  const handleCloseDialog = () => {
    setVehicleToEdit(null);
  };

  const handleSaveChanges = (updatedVehicle: Vehicle) => {
    const updatedVehicles = vehicleList.map(v => 
        v.id === updatedVehicle.id ? updatedVehicle : v
    );
    setVehicleList(updatedVehicles);

    toast({
        title: "Vehicle Updated",
        description: `${updatedVehicle.brand} ${updatedVehicle.name} has been successfully updated.`,
    });
    handleCloseDialog();
  };

  const handleAddVehicle = (newVehicle: Omit<Vehicle, 'id' | 'status'>) => {
    const vehicleWithId: Vehicle = {
        ...newVehicle,
        id: vehicleList.length > 0 ? Math.max(...vehicleList.map(v => v.id)) + 1 : 1,
        status: 'Available',
    };
    setVehicleList(prev => [...prev, vehicleWithId]);
    toast({
        title: "Vehicle Added",
        description: `${vehicleWithId.brand} ${vehicleWithId.name} has been added to the fleet.`
    });
    setIsAddDialogOpen(false);
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
            <Button className="w-full md:w-auto" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Vehicle
            </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vehicleList.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} onViewDetails={handleViewDetails} />
        ))}
      </div>

       {vehicleToEdit && (
         <AdminVehicleDetailsDialog
            vehicle={vehicleToEdit}
            isOpen={!!vehicleToEdit}
            onClose={handleCloseDialog}
            onSave={handleSaveChanges}
        />
       )}

       <AdminAddVehicleDialog 
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            onSave={handleAddVehicle}
       />
    </div>
  );
}
