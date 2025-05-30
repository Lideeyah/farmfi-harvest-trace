
import { Calendar, MapPin, CheckCircle, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HarvestCardProps {
  id: string;
  cropType: string;
  farmName: string;
  location: string;
  harvestDate: string;
  quantity: string;
  status: "pending" | "certified" | "rejected";
  certifier?: string;
}

const HarvestCard = ({
  id,
  cropType,
  farmName,
  location,
  harvestDate,
  quantity,
  status,
  certifier
}: HarvestCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "certified":
        return <Badge className="bg-accent text-white hover:bg-accent-600">Certified</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
    }
  };

  return (
    <Card className="card-hover border-slate-200 bg-white">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-slate-800">{cropType}</CardTitle>
            <p className="text-sm text-slate-600">NFT ID: {id}</p>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-slate-600">{farmName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-slate-600">{harvestDate}</span>
          </div>
        </div>
        
        <div className="text-sm text-slate-600">
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Quantity:</strong> {quantity}</p>
          {certifier && <p><strong>Certified by:</strong> {certifier}</p>}
        </div>

        <div className="flex space-x-2 pt-2">
          {status === "certified" && (
            <Button size="sm" className="gradient-bg text-white hover:opacity-90">
              <QrCode className="h-4 w-4 mr-1" />
              Generate QR
            </Button>
          )}
          <Button variant="outline" size="sm" className="border-slate-300 text-slate-700 hover:bg-slate-50">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HarvestCard;
