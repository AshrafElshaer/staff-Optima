import { Img } from "@react-email/components";
import React from "react";

const baseUrl = "https://dashboard.staffoptima.co";

export default function Logo() {
  return (
    <Img
      src={`${baseUrl}/favicon.ico`}
      alt="Staff Optima"
      className="dark:hidden mx-auto h-14 w-14 mb-8"
    />
  );
}
