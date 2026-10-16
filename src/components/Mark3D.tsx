import Image from "next/image";

/**
 * The OdooVast mark presented as an object: the exact logo file — one image,
 * never redrawn or recoloured — given a thin extruded edge with drop-shadows
 * and a backlight so the navy V still reads on the dark bands. Its parent
 * turns it in 3D with --rx / --ry. Decorative everywhere it is used: the
 * wordmark beside it already names the company.
 *
 * Always fetched early and at one small size: every use shares the same file,
 * and a decorative image that arrived late would become the page's Largest
 * Contentful Paint instead of the text.
 */
export function Mark3D({ className }: { className?: string }) {
  return (
    <span className={className ? `mark3d ${className}` : "mark3d"}>
      <Image
        src="/brand/mark.png"
        alt=""
        width={512}
        height={512}
        sizes="(min-width: 60rem) 300px, 190px"
        priority
      />
    </span>
  );
}
