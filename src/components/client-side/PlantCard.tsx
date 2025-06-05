import { getPlantById } from "@/actions/plantAction";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Leaf } from "lucide-react";
import React from "react";

type Plant = Awaited<ReturnType<typeof getPlantById>>

interface PlantCardProps {
    fetchedPlant: Plant
}

const PlantCard = ({ fetchedPlant }: PlantCardProps) => {
    return (
        <Card className="shadow-none flex flex-row">
            <img
                src={fetchedPlant?.imageUrl ? fetchedPlant?.imageUrl : "https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE="}
                className="h-[50%] w-[50%] ml-6 aspect-auto bg-muted rounded-xl object-cover"
            />
            <CardContent className="text-[15px] space-y-2">
                <div className="font-bold flex gap-2 text-2xl items-center">
                    <Leaf className="h-6 w-6" />{fetchedPlant?.name}
                    <Button className="">
                        {fetchedPlant?.category}
                    </Button>
                </div>
                <div className="font-bold text-xl">
                    ${fetchedPlant?.price}
                </div>
                <div className="text-sm">
                    Stock: {fetchedPlant?.stock}
                </div>
                <p className="text-muted-foreground text-sm max-w-xs">
                    {fetchedPlant?.description}
                </p>
            </CardContent>
        </Card>
    );
};

export default PlantCard;
