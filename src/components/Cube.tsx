import { Icon, type IconName } from "@/components/Icon";

/**
 * A service or industry icon as a solid cube in the brand gradient. CSS turns
 * it as its block scrolls past (a scroll timeline, no script); the icon is on
 * the front and back faces, so it comes round again halfway through the turn.
 * Decorative: the heading beside it names the service.
 */
export function Cube({ icon }: { icon: IconName }) {
  return (
    <span className="cube" aria-hidden="true">
      <span className="cube__body">
        <span className="cube__face cube__face--front">
          <Icon name={icon} size={24} />
        </span>
        <span className="cube__face cube__face--back">
          <Icon name={icon} size={24} />
        </span>
        <span className="cube__face cube__face--right" />
        <span className="cube__face cube__face--left" />
        <span className="cube__face cube__face--top" />
        <span className="cube__face cube__face--bottom" />
      </span>
    </span>
  );
}
