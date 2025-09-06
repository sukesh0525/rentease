
"use client";

import { vehicles as initialVehicles, type Vehicle } from "@/lib/data";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { BookingDialog } from "@/components/vehicles/booking-dialog";
import { VehicleDetailsDialog } from "@/components/vehicles/vehicle-details-dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserVehiclesPage() {
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [vehicleToBook, setVehicleToBook] = useState<Vehicle | null>(null);
  const [vehicleToView, setVehicleToView] = useState<Vehicle | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

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
    let availableVehicles = allVehicles.filter(v => v.status === 'Available');

    if (searchTerm) {
        availableVehicles = availableVehicles.filter(v => 
            v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    if (selectedBrand !== 'all') {
        availableVehicles = availableVehicles.filter(v => v.brand === selectedBrand);
    }
    if (selectedType !== 'all') {
        availableVehicles = availableVehicles.filter(v => v.type === selectedType);
    }
    
    setFilteredVehicles(availableVehicles);
  }, [searchTerm, selectedBrand, selectedType, allVehicles]);


  const handleViewDetails = (vehicle: Vehicle) => {
    setVehicleToView(vehicle);
  };
  
  const handleBookNow = (vehicle: Vehicle) => {
    setVehicleToView(null); // Close details dialog if open
    setVehicleToBook(vehicle);
  };

  const handleCloseDialogs = () => {
    setVehicleToBook(null);
    setVehicleToView(null);
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


      {vehicleToView && (
        <VehicleDetailsDialog 
            vehicle={vehicleToView} 
            isOpen={!!vehicleToView}
            onClose={handleCloseDialogs}
            onBookNow={() => handleBookNow(vehicleToView)}
        />
      )}

      {vehicleToBook && (
        <BookingDialog 
            vehicle={vehicleToBook} 
            isOpen={!!vehicleToBook}
            onClose={handleCloseDialogs}
        />
      )}
    </div>
  );
}
