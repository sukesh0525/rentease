
"use client";

import { useState, useEffect } from "react";
import type { Vehicle } from "@/lib/data";
import { vehicles as initialVehicles } from "@/lib/data";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AdminVehicleDetailsDialog } from "@/components/vehicles/admin-vehicle-details-dialog";
import { AdminAddVehicleDialog } from "@/components/vehicles/admin-add-vehicle-dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function VehiclesPage() {
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const loadVehicles = () => {
    setIsLoading(true);
    const storedVehicles = localStorage.getItem('vehicles');
    const vehicles = storedVehicles ? JSON.parse(storedVehicles) : initialVehicles;
    setAllVehicles(vehicles);
    setIsLoading(false);
  };

  useEffect(() => {
    loadVehicles();
    window.addEventListener('storage', loadVehicles);
    return () => {
        window.removeEventListener('storage', loadVehicles);
    };
  }, []);

  useEffect(() => {
    let vehicles = allVehicles;

    if (searchTerm) {
        vehicles = vehicles.filter(v => 
            v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    if (selectedBrand !== 'all') {
        vehicles = vehicles.filter(v => v.brand === selectedBrand);
    }
    if (selectedType !== 'all') {
        vehicles = vehicles.filter(v => v.type === selectedType);
    }
    if (selectedStatus !== 'all') {
        vehicles = vehicles.filter(v => v.status === selectedStatus);
    }
    
    setFilteredVehicles(vehicles);
  }, [searchTerm, selectedBrand, selectedType, selectedStatus, allVehicles]);

  const handleViewDetails = (vehicle: Vehicle) => {
    setVehicleToEdit(vehicle);
  };

  const handleCloseDialog = () => {
    setVehicleToEdit(null);
  };
  
  const uniqueBrands = [...new Set(allVehicles.map(v => v.brand))];
  const uniqueTypes = [...new Set(allVehicles.map(v => v.type))];

  return (
    <div className="fade-in space-y-6">
      <Card>
        <CardContent className="p-4 flex flex-wrap items-center gap-4">
            <Input 
                type="text" 
                placeholder="Search vehicles..." 
                className="flex-grow min-w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {uniqueBrands.map(brand => <SelectItem key={brand} value={brand}>{brand}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                     {uniqueTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                </SelectContent>
            </Select>
             <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Rented">Rented</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
            </Select>
            <Button className="w-full md:w-auto" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Vehicle
            </Button>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-96 w-full" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} onViewDetails={handleViewDetails} />
            ))}
        </div>
      )}

       {vehicleToEdit && (
         <AdminVehicleDetailsDialog
            vehicle={vehicleToEdit}
            isOpen={!!vehicleToEdit}
            onClose={handleCloseDialog}
            onSave={loadVehicles}
        />
       )}

       <AdminAddVehicleDialog 
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            onSave={loadVehicles}
       />
    </div>
  );
}
