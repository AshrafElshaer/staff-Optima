import { Img } from "@react-email/components";
import React from "react";

const baseUrl = "https://dashboard.hrtoolkit.app";

export default function Logo() {
  return (
    <>
      <Img
        src={`${baseUrl}/logo-png-dark.png`}
        alt="HR Toolkit"
        className="dark:hidden mx-auto h-14 w-14 mb-8"
      />
      <Img
        src={`${baseUrl}/logo-png-light.png`}
        alt="HR Toolkit"
        className="hidden dark:block mx-auto h-14 w-14  mb-8"
      />
    </>
  );
}
