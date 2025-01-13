import { buttonVariants } from "@optima/ui/button";
import { Icons } from "@optima/ui/icons";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="pt-12">
      {/* <div className="grid  grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
        <div className="flex flex-col gap-2">
          <p className=" font-bold mb-2">Sections</p>
          <Link
            href="/"
            className={buttonVariants({
              variant: "link",
              className: "!justify-start",
            })}
          >
            Home
          </Link>
          <Link
            href="/features"
            className={buttonVariants({
              variant: "link",
              className: "!justify-start",
            })}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className={buttonVariants({
              variant: "link",
              className: "!justify-start",
            })}
          >
            Pricing
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <p className=" font-bold mb-2">Resources</p>
          <Link
            href="/about"
            className={buttonVariants({
              variant: "link",
              className: "!justify-start",
            })}
          >
            Support
          </Link>
          <Link
            href="https://github.com/staff-optima"
            className={buttonVariants({
              variant: "link",
              className: "!justify-start",
            })}
          >
            GitHub
          </Link>
          <Link
            href="https://github.com/staff-optima/staff-optima/issues"
            className={buttonVariants({
              variant: "link",
              className: "!justify-start",
            })}
          >
            Features Request
          </Link>
        </div>
      </div> */}

      <div className=" w-full text-center mt-4 items-center justify-center py-12 border-t space-y-8">
        <h1 className="text-center text-6xl md:text-8xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-neutral-900 select-none ">
          Staff Optima
        </h1>
        <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-neutral-900 select-none">
          Hire Smarter, Hire Faster
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm  border-t pt-4">
        <p className=" mr-auto">
          &copy; {new Date().getFullYear()} Staff Optima. All rights reserved.
        </p>

        <Link href="/privacy" className={buttonVariants({ variant: "link" })}>
          Privacy Policy
        </Link>
        <Link href="/terms" className={buttonVariants({ variant: "link" })}>
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
