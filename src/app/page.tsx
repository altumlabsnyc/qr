import { redirect } from "next/navigation";
import "./globals.css";

export default function Home() {
  // redirect to plantalysis.com
  redirect("https://plantalysis.com");

  return <></>;
}
