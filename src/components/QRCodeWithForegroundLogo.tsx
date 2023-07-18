import React, { useEffect, useRef } from "react";

interface QRCodeWithLogoProps {
  text: string;
  logoSrc: string;
}

const QRCodeWithForegroundLogo: React.FC<QRCodeWithLogoProps> = ({
  text,
  logoSrc,
}) => {
  const qrCodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!qrCodeRef.current) return;

    // Dynamic import of qr-code-styling
    import("qr-code-styling")
      .then((QRCodeStyling) => {
        const qrCode = new QRCodeStyling.default({
          width: 256,
          height: 256,
          type: "svg",
          data: text,
          image: logoSrc,
          qrOptions: {
            errorCorrectionLevel: "H",
          },
          dotsOptions: {
            color: "#57A088",
            type: "extra-rounded",
          },
          backgroundOptions: {
            color: "#fff",
          },
          imageOptions: {
            crossOrigin: "anonymous",
            margin: 2,
          },
          cornersSquareOptions: {
            type: "extra-rounded",
            color: "#CFAA41",
          },
          cornersDotOptions: {
            color: "#CFAA41",
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

  return <div ref={qrCodeRef} className="mx-auto my-8" />;
};

export default QRCodeWithForegroundLogo;
