import React, { useEffect, useRef } from "react";

interface QRCodeWithLogoProps {
  text: string;
  logoSrc: string;
}

const QRCodeWithBackgroundLogo: React.FC<QRCodeWithLogoProps> = ({
  text,
  logoSrc,
}) => {
  const qrCodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!qrCodeRef.current) return;

    import("qr-code-styling")
      .then((QRCodeStyling) => {
        const qrCode = new QRCodeStyling.default({
          width: 256,
          height: 256,
          data: text,
          qrOptions: {
            errorCorrectionLevel: "H",
          },
          dotsOptions: {
            color: "#ffffff", // QR code is white
            type: "extra-rounded",
          },
          backgroundOptions: {
            color: "transparent", // Background of QR code is transparent
          },
          cornersSquareOptions: {
            type: "extra-rounded",
            color: "#ffffff", // Corners are white
          },
          cornersDotOptions: {
            color: "#ffffff", // Corner dots are white
            type: "dot",
          },
        });

        // @ts-ignore
        qrCode.append(qrCodeRef.current);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [text, logoSrc]);

  return (
    <div
      style={{
        position: "relative",
        width: "256px",
        height: "256px",
        backgroundColor: "#57A088", // Set specific background color
        margin: "auto",
        marginTop: "2rem",
        borderRadius: "1rem",
      }}
    >
      <img
        src={logoSrc}
        style={{
          position: "absolute",
          width: "75%",
          height: "75%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={qrCodeRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default QRCodeWithBackgroundLogo;
