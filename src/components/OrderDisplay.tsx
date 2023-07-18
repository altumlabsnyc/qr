import { OrderData } from "@/types/OrderData";
import QRCodeWithBackgroundLogo from "./QRCodeWithBackgroundLogo";
import QRCodeWithForegroundLogo from "./QRCodeWithForegroundLogo";

export interface OrderDisplayProps {
  order?: OrderData;
  error?: any;
}

export default function OrderDisplay({ order, error }: OrderDisplayProps) {
  console.log(order);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }

  if (!order) {
    return <h1>Order not found</h1>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-8 ">
        <QRCodeWithForegroundLogo
          text={`https://qr.plantalysis.com/${order.id}`}
          logoSrc="/logoPretty.svg"
        />
        <QRCodeWithBackgroundLogo
          text={`https://qr.plantalysis.com/${order.id}`}
          logoSrc="/logoThick.svg"
        />
      </div>
      <h1>{order.id}</h1>
      <p>{order.pickup_date}</p>
      <p>{}</p>
    </div>
  );
}
