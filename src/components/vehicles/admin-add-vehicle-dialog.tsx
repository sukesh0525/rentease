
"use client";

import { useState, useRef } from "react";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Edit, UploadCloud } from "lucide-react";

interface AdminAddVehicleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicle: Omit<Vehicle, 'id' | 'status'>) => void;
}

const initialVehicleState: Omit<Vehicle, 'id' | 'status'> = {
    name: '',
    brand: '',
    type: 'Hatchback',
    year: new Date().getFullYear(),
    pricePerDay: 1000,
    image: 'https://placehold.co/800x600?text=Upload+Image',
    aiHint: 'car',
    color: '',
    plate: '',
    seats: 4,
    mileage: '',
};

export function AdminAddVehicleDialog({ isOpen, onClose, onSave }: AdminAddVehicleDialogProps) {
  const [newVehicle, setNewVehicle] = useState(initialVehicleState);
  const [imagePreview, setImagePreview] = useState<string>(initialVehicleState.image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setNewVehicle(prev => ({ ...prev, [id]: type === 'number' ? Number(value) : value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setNewVehicle(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSaveChanges = () => {
    // Basic validation
    if (!newVehicle.brand || !newVehicle.name || !newVehicle.plate) {
        alert("Please fill in Brand, Name, and License Plate.");
        return;
    }
    onSave(newVehicle);
    // Reset form after saving
    setNewVehicle(initialVehicleState);
    setImagePreview(initialVehicleState.image);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setImagePreview(result);
            setNewVehicle(prev => ({...prev, image: result}));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleDialogClose = () => {
    // Reset state when closing without saving
    setNewVehicle(initialVehicleState);
    setImagePreview(initialVehicleState.image);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Add a New Vehicle</DialogTitle>
          <DialogDescription>
            Enter the details for the new vehicle to add it to the fleet.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
                <div 
                    className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                >
                     <Image 
                        src={imagePreview} 
                        alt="Vehicle preview"
                        width={800} 
                        height={600}
                        className="rounded-lg object-cover w-full h-auto shadow-lg"
                    />
                     {imagePreview === initialVehicleState.image && (
                        <div className="absolute flex flex-col items-center text-muted-foreground">
                            <UploadCloud className="h-12 w-12"/>
                            <p>Click to upload image</p>
                        </div>
                     )}
                     <Button 
                        variant="outline" 
                        size="icon" 
                        className="absolute bottom-2 right-2 rounded-full bg-background/70 hover:bg-background"
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
                        <Input id="brand" value={newVehicle.brand} onChange={handleInputChange} placeholder="e.g. Tata" />
                    </div>
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={newVehicle.name} onChange={handleInputChange} placeholder="e.g. Nexon" />
                    </div>
                     <div>
                        <Label htmlFor="type">Type</Label>
                        <Select value={newVehicle.type} onValueChange={(value) => handleSelectChange('type', value)}>
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
                        <Input id="year" type="number" value={newVehicle.year} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="color">Color</Label>
                        <Input id="color" value={newVehicle.color} onChange={handleInputChange} placeholder="e.g. Red" />
                    </div>
                    <div>
                        <Label htmlFor="seats">Seats</Label>
                        <Input id="seats" type="number" value={newVehicle.seats} onChange={handleInputChange} />
                    </div>
                     <div>
                        <Label htmlFor="mileage">Mileage</Label>
                        <Input id="mileage" value={newVehicle.mileage} onChange={handleInputChange} placeholder="e.g. 20 km/l" />
                    </div>
                     <div>
                        <Label htmlFor="plate">License Plate</Label>
                        <Input id="plate" value={newVehicle.plate} onChange={handleInputChange} placeholder="AP-01-AB-1234" />
                    </div>
                </div>

                <h4 className="font-semibold text-lg border-b pb-2 pt-4">Pricing</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="pricePerDay">Price Per Day (Rs.)</Label>
                        <Input id="pricePerDay" type="number" value={newVehicle.pricePerDay} onChange={handleInputChange} />
                    </div>
                 </div>
            </div>
        </div>
        <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSaveChanges}>Add Vehicle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
