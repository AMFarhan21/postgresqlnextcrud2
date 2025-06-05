"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlantCategory } from "./PlantCategory"
import { Textarea } from "../ui/textarea"
import { Edit, Image } from "lucide-react"
import { useState } from "react"
import { updatePlants } from "@/actions/plantAction"
import toast from "react-hot-toast"
import { UploadButton } from "@/lib/uploadthing"

type Plant = Awaited<ReturnType<typeof updatePlants>>

interface UpdateInventoryPlantProps {
    plant: Plant
}

export function UpdatePlant({plant}: UpdateInventoryPlantProps) {
    const [prevImageUrl] = useState(plant?.imageUrl)
    const [plantsData, setPlantsData] = useState({
        name: plant?.name,
        category: plant?.category,
        stock: plant?.stock,
        price: plant?.price,
        description: plant?.description,
        userId: plant?.userId,
        imageUrl: plant?.imageUrl,
    })


    const handleData = (type: string, value: string | number) => {
        setPlantsData({
            ...plantsData, [type]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userId = plant?.id as string
        try {
            const response = await updatePlants(plantsData, userId, prevImageUrl as string)
            console.log("Plant is updated: ", response)
            toast.success("Plant is updated", plant)
        } catch (error) {
            console.error("Failed to update plant: ", error)
            toast.error("Failed to updated plant")
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="cursor-pointer">
                    <Edit />
                    Edit Plant
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Plant</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to add a new plant in your inventory
                        </DialogDescription>
                    </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="flex gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Enter plant name" value={plantsData.name} onChange={(e) => handleData("name", e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <PlantCategory value={plantsData?.category as string} setValue={(val) => handleData("category", val as string)} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Enter plant description" value={plantsData?.description as string} onChange={(e) => handleData("description", e.target.value)}></Textarea>
                    </div>
                    <div className="flex gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" type="number" placeholder="Enter plant stock" value={plantsData.stock} onChange={(e) => handleData("stock", e.target.valueAsNumber)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" type="number" placeholder="Enter plant price" value={plantsData.price} onChange={(e) => handleData("price", e.target.valueAsNumber)} />
                        </div>
                    </div>
                    <div className="gap-4 flex items-center">
                        <Image />
                        <UploadButton
                            endpoint="imageUploader"
                            appearance={{
                                button: {
                                    color: "var(--foreground)"
                                }
                            }}
                            onClientUploadComplete={(res) => {
                                // Do something with the response
                                console.log("Files: ", res[0].ufsUrl);
                                toast.success("Upload Completed");
                                handleData("imageUrl", res[0].ufsUrl)
                            }}
                            onUploadError={(error: Error) => {
                                // Do something with the error.
                                toast.error(`ERROR! ${error.message}`);
                            }}
                        />
                    </div>
                    <DialogFooter className="flex">
                        {
                            plantsData?.imageUrl && <img src={plantsData?.imageUrl} className="w-40 object-cover" />
                        }
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild><Button type="submit" className="font-semibold">Save Changes</Button></DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
