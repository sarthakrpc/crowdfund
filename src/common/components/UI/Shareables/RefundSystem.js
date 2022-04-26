import { Button } from "react-bootstrap";

const RefundSystem = ({handleRefund}) => {
  return (
    <>
      <Button variant="danger" className="w-100 mb-3" onClick={handleRefund}>
        REFUND
      </Button>
    </>
  );
};

export default RefundSystem;
