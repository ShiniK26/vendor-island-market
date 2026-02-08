import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;