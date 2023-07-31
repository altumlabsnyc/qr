import Image from "next/image";
import Link from "next/link";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function Custom404() {
  return (
    <div>
      <Image
        src="/404.png"
        layout="fill"
        objectFit="cover"
        alt="Background image for 404 page"
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontFamily: "monospace",
            fontSize: "10rem",
            fontWeight: "bold",
            color: "white",
            marginBottom: "0.5rem",
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontFamily: "monospace",
            fontSize: "2rem",
            color: "white",
            marginTop: "0.5rem",
          }}
        >
          PAGE NOT FOUND
        </h2>
        <div style={{ textAlign: "center" }}>
          <Link href="/">
            <p
              style={{
                fontFamily: "monospace",
                backgroundColor: "#CFAA41",
                padding: "10px 20px",
                borderRadius: "30px",
                color: "white",
                fontSize: "1rem",
                textDecoration: "none",
                marginTop: "1rem",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "200px",
              }}
            >
              Go Back
              <ArrowForwardRoundedIcon
                sx={{ fontSize: 20, marginLeft: "10px" }}
              />
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
