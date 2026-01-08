import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => navigate("/market")}
    >
      &lt;
    </Button>
  );
};

export default BackButton;
