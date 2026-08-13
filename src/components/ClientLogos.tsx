import Image from "next/image";

import { clients } from "@/content/clients";
import { t, type Locale } from "@/lib/i18n";

/** The client logo grid — real companies only, straight from content/clients.ts. */
export function ClientLogos({ locale }: { locale: Locale }) {
  return (
    <ul className="clients">
      {clients.map((client) => (
        <li key={client.name} className="client">
          <span className={client.darkArtwork ? "client__art client__art--dark" : "client__art"}>
            <Image
              src={client.logo}
              alt={client.name}
              width={client.width}
              height={client.height}
              sizes="(min-width: 60rem) 180px, 40vw"
            />
          </span>
          {/* Brand names keep their own (Latin) branding in every language. */}
          <p className="client__name ltr">{client.name}</p>
          <p className="client__sector">{t(client.sector, locale)}</p>
        </li>
      ))}
    </ul>
  );
}
