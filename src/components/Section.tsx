import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
  /** Background treatment. Alternate these to separate long pages. */
  tone?: "default" | "subtle" | "sunken";
  narrow?: boolean;
  labelledBy?: string;
};

export function Section({ children, id, tone = "default", narrow, labelledBy }: Props) {
  const classes = ["section", tone !== "default" ? `section--${tone}` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes} aria-labelledby={labelledBy}>
      <div className={narrow ? "container container--narrow" : "container"}>{children}</div>
    </section>
  );
}
