
"use client";

import { useState, useEffect, useRef } from "react";
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
import { vehicles as initialVehicles } from "@/lib/data";
import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


interface AdminVehicleDetailsDialogProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function AdminVehicleDetailsDialog({ vehicle, isOpen, onClose, onSave }: AdminVehicleDetailsDialogProps) {
  const [editedVehicle, setEditedVehicle] = useState<Vehicle>(vehicle);
  const [imagePreview, setImagePreview] = useState<string>(vehicle.image);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setEditedVehicle(vehicle);
    setImagePreview(vehicle.image);
  }, [vehicle]);

  if (!vehicle) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEditedVehicle(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setEditedVehicle(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSaveChanges = () => {
    setIsSaving(true);
    const storedVehiclesRaw = localStorage.getItem('vehicles');
    let currentVehicles: Vehicle[] = storedVehiclesRaw ? JSON.parse(storedVehiclesRaw) : initialVehicles;

    const vehicleIndex = currentVehicles.findIndex(v => v.id === editedVehicle.id);
    if (vehicleIndex > -1) {
        currentVehicles[vehicleIndex] = editedVehicle;
    }

    localStorage.setItem('vehicles', JSON.stringify(currentVehicles));
    window.dispatchEvent(new Event('storage'));
    
    toast({
        title: "Vehicle Updated",
        description: "The vehicle details have been saved."
    });
    onSave();
    onClose();
    setIsSaving(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setImagePreview(result);
            setEditedVehicle(prev => ({...prev, image: result}));
        };
        reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Edit Vehicle: {vehicle.brand} {vehicle.name}</DialogTitle>
          <DialogDescription>
            Modify the vehicle details below and click save.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
                <div className="relative">
                     <Image 
                        src={imagePreview} 
                        alt={`${vehicle.brand} ${vehicle.name}`} 
                        width={800} 
                        height={600}
                        data-ai-hint={vehicle.aiHint} 
                        className="rounded-lg object-cover w-full h-auto shadow-lg"
                    />
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className="absolute bottom-2 right-2 rounded-full bg-background/70 hover:bg-background"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Edit className="h-4 w-4"/>
                        <span className="sr-only">Edit photo</span>
                    </Button>
                    <Input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <div className="space-y-4">
                <h4 className="font-semibold text-lg border-b pb-2">Vehicle Specifications</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="brand">Brand</Label>
                        <Input id="brand" value={editedVehicle.brand} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={editedVehicle.name} onChange={handleInputChange} />
                    </div>
                     <div>
                        <Label htmlFor="type">Type</Label>
                        <Select value={editedVehicle.type} onValueChange={(value) => handleSelectChange('type', value)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Hatchback">Hatchback</SelectItem>
                                <SelectItem value="SUV">SUV</SelectItem>
                                <SelectItem value="Sedan">Sedan</SelectItem>
                                <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                                <SelectItem value="Cruiser">Cruiser</SelectItem>
                                <SelectItem value="Scooter">Scooter</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="year">Year</Label>
                        <Input id="year" type="number" value={editedVehicle.year} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="color">Color</Label>
                        <Input id="color" value={editedVehicle.color} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="seats">Seats</Label>
                        <Input id="seats" type="number" value={editedVehicle.seats} onChange={handleInputChange} />
                    </div>
                     <div>
                        <Label htmlFor="mileage">Mileage</Label>
                        <Input id="mileage" value={editedVehicle.mileage} onChange={handleInputChange} />
                    </div>
                     <div>
                        <Label htmlFor="plate">License Plate</Label>
                        <Input id="plate" value={editedVehicle.plate} onChange={handleInputChange} />
                    </div>
                </div>

                <h4 className="font-semibold text-lg border-b pb-2 pt-4">Pricing & Status</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="pricePerDay">Price Per Day (Rs.)</Label>
                        <Input id="pricePerDay" type="number" value={editedVehicle.pricePerDay} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="status">Status</Label>
                         <Select value={editedVehicle.status} onValueChange={(value) => handleSelectChange('status', value as Vehicle['status'])}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Available">Available</SelectItem>
                                <SelectItem value="Rented">Rented</SelectItem>
                                <SelectItem value="Maintenance">Maintenance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                 </div>
            </div>
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveChanges} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
