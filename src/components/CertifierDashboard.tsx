import { useState } from "react";
import { CheckCircle, X, Eye, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import HarvestReviewDetails from "./HarvestReviewDetails";

interface PendingHarvest {
  id: string;
  cropType: string;
  farmName: string;
  location: string;
  harvestDate: string;
  quantity: string;
  farmer: string;
  submittedDate: string;
}

const CertifierDashboard = () => {
  const { toast } = useToast();
  const [selectedHarvest, setSelectedHarvest] = useState<PendingHarvest | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  
  const [pendingHarvests] = useState<PendingHarvest[]>([
    {
      id: "NFT-001",
      cropType: "Cocoa Beans",
      farmName: "Adebayo Cocoa Estate",
      location: "Ondo State, Nigeria",
      harvestDate: "2024-05-28",
      quantity: "2.5 tons",
      farmer: "Adebayo Oluwaseun",
      submittedDate: "2024-05-29"
    },
    {
      id: "NFT-002",
      cropType: "Palm Oil",
      farmName: "Okafor Palm Plantation",
      location: "Cross River State, Nigeria",
      harvestDate: "2024-05-27",
      quantity: "1.8 tons",
      farmer: "Chioma Okafor",
      submittedDate: "2024-05-28"
    },
    {
      id: "NFT-003",
      cropType: "Cashew Nuts",
      farmName: "Bello Cashew Farm",
      location: "Kwara State, Nigeria",
      harvestDate: "2024-05-26",
      quantity: "800 kg",
      farmer: "Ibrahim Bello",
      submittedDate: "2024-05-27"
    },
    {
      id: "NFT-004",
      cropType: "Rubber Latex",
      farmName: "Ikechukwu Rubber Estate",
      location: "Delta State, Nigeria",
      harvestDate: "2024-05-25",
      quantity: "1.2 tons",
      farmer: "Ikechukwu Okwu",
      submittedDate: "2024-05-26"
    },
    {
      id: "NFT-005",
      cropType: "Cotton",
      farmName: "Musa Cotton Fields",
      location: "Kaduna State, Nigeria",
      harvestDate: "2024-05-24",
      quantity: "950 kg",
      farmer: "Musa Abdullahi",
      submittedDate: "2024-05-25"
    }
  ]);

  const handleCertify = (id: string) => {
    toast({
      title: "Harvest Certified",
      description: `Harvest record ${id} has been successfully certified and is now traceable.`,
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "Harvest Rejected",
      description: `Harvest record ${id} has been rejected. Farmer has been notified.`,
      variant: "destructive",
    });
  };

  const handleReviewDetails = (harvest: PendingHarvest) => {
    setSelectedHarvest(harvest);
    setIsReviewOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-farmfi-green-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-farmfi-earth-500" />
              <div>
                <p className="text-2xl font-bold text-farmfi-earth-600">{pendingHarvests.length}</p>
                <p className="text-sm text-gray-600">Pending Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-farmfi-green-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-farmfi-green-500" />
              <div>
                <p className="text-2xl font-bold text-farmfi-green-600">47</p>
                <p className="text-sm text-gray-600">Certified This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-farmfi-green-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <X className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">3</p>
                <p className="text-sm text-gray-600">Rejected This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-farmfi-green-100">
        <CardHeader>
          <CardTitle className="text-farmfi-green-700">Pending Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingHarvests.map((harvest) => (
              <div key={harvest.id} className="border border-farmfi-green-100 rounded-lg p-4 bg-farmfi-green-50/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-farmfi-green-700">{harvest.cropType}</h3>
                    <p className="text-sm text-gray-600">by {harvest.farmer} - {harvest.farmName}</p>
                  </div>
                  <Badge variant="outline" className="border-farmfi-earth-500 text-farmfi-earth-600">
                    {harvest.id}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Location</p>
                    <p className="text-gray-600">{harvest.location}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Harvest Date</p>
                    <p className="text-gray-600">{harvest.harvestDate}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Quantity</p>
                    <p className="text-gray-600">{harvest.quantity}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Submitted</p>
                    <p className="text-gray-600">{harvest.submittedDate}</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    size="sm" 
                    className="bg-farmfi-green-600 hover:bg-farmfi-green-700 text-white"
                    onClick={() => handleCertify(harvest.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Certify
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleReject(harvest.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-farmfi-green-200 text-farmfi-green-700"
                    onClick={() => handleReviewDetails(harvest)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Review Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review Details Modal */}
      {selectedHarvest && (
        <HarvestReviewDetails
          isOpen={isReviewOpen}
          onClose={() => {
            setIsReviewOpen(false);
            setSelectedHarvest(null);
          }}
          harvest={selectedHarvest}
        />
      )}
    </div>
  );
};

export default CertifierDashboard;
