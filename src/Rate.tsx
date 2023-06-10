import React, { useCallback, useState, useRef, useMemo } from "react";
import Star from "./Star";

const COLORS = { inactive: "#121621", active: "#FFED76" };

interface Props {
  count: number;
  precision?: number;
  size?: number | string;
}
function Rating({ count = 5, precision = 0.5, size = 50 }: Props) {
  const STARS = [...new Array(count).fill(0)];

  const [hoverIdx, setHoverIdx] = useState(-1);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateRating = useCallback(
    (e: any) => {
      const rect = containerRef?.current?.getBoundingClientRect();
      const width = rect?.width || 0;
      const left = rect?.left || 0;

      let percent = (e.clientX - left) / width;

      const numberInStars = percent * count;
      const nearestNumber =
        Math.round((numberInStars + precision / 2) / precision) * precision;

      return precision === 1 ? Math.round(nearestNumber) : nearestNumber;
    },
    [precision, containerRef]
  );

  const handleClickRank = useCallback(
    (idx: number) => {
      // deselect
      if (idx === activeIdx) setActiveIdx(-1);
      else setActiveIdx(idx);
    },
    [activeIdx]
  );

  const handleMouseMove = (e: any) => {
    setIsHovered(true);
    setHoverIdx(calculateRating(e));
  };

  const handleMouseLeave = () => {
    setHoverIdx(-1);
    setIsHovered(false);
  };

  const activeState = useMemo(
    () => (isHovered ? hoverIdx : activeIdx),
    [isHovered, hoverIdx, activeIdx]
  );

  return (
    <div
      className="container"
      ref={containerRef}
      onClick={(e) => handleClickRank(calculateRating(e))}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {STARS.map((star, idx) => (
        <div key={idx} style={{ position: "relative", width: `${size}px` }}>
          <div
            style={{
              position: "absolute",
              overflow: "hidden",
              width:
                activeState % 1 === 0 || idx + 1 < activeState
                  ? `100%`
                  : `${(activeState % 1) * 100}%`,
            }}
          >
            <Star
              size={size}
              selected={idx < activeState}
              activeColor={COLORS.active}
              inactiveColor={COLORS.inactive}
            />
          </div>
          <Star
            size={size}
            selected={false}
            activeColor={COLORS.active}
            inactiveColor={COLORS.inactive}
          />
        </div>
      ))}
    </div>
  );
}

export default React.memo(Rating);
