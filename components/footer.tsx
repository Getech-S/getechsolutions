"use client";

import { AlignmentLogo } from "./logo";

const columns = [
  {
    heading: "Company",
    links: [
      { label: "Services", href: "#services" },
      { label: "Labs", href: "#labs" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Verticals",
    links: [
      { label: "Healthcare", href: "#labs" },
      { label: "Wildlife & Conservation", href: "#labs" },
      { label: "Churches & Communities", href: "#labs" },
    ],
  },
  {
    heading: "Connect",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/getechrw/",
        external: true,
      },
      {
        label: "getechsolutions@protonmail.com",
        href: "mailto:getechsolutions@protonmail.com",
        external: true,
      },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-meteorite/10 px-6 pt-16 pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <AlignmentLogo size={32} animated={false} />
              <span className="font-heading text-sm font-semibold tracking-[0.18em] text-platinum uppercase">
                GeTech <span className="text-meteorite">Solutions</span>
              </span>
            </div>
            <p className="max-w-xs text-sm text-meteorite">
              Engineering high-impact digital futures for startups, companies,
              visionaries, and communities.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-xs tracking-[0.22em] text-meteorite/60 uppercase">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm break-all text-meteorite transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-14 border-t border-meteorite/10 pt-8 text-center text-xs text-meteorite/50">
          © {year} GeTech Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
