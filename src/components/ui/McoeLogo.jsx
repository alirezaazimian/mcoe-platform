import { Fragment, useId } from 'react';

const LOGO_SOURCE = '/mcoe-logo-inner.png?v=5';

const SEGMENTS = [
  {
    key: 'purple',
    points: '84,118 360,118 360,502 84,310',
    shadow: '#481155',
  },
  {
    key: 'pink',
    points: '356,116 627,365 461,592 356,502',
    shadow: '#9b174f',
  },
  {
    key: 'upper-red',
    points: '625,363 898,116 898,502 792,592',
    shadow: '#911f1d',
  },
  {
    key: 'orange',
    points: '894,116 1172,116 1172,312 894,502',
    shadow: '#a84617',
  },
  {
    key: 'green',
    points: '82,306 360,498 360,858 82,642',
    shadow: '#08624a',
  },
  {
    key: 'center-red',
    points: '625,361 796,590 625,788 457,590',
    shadow: '#8d1d1d',
  },
  {
    key: 'yellow',
    points: '894,498 1172,306 1172,642 894,858',
    shadow: '#946100',
  },
  {
    key: 'left-white',
    points: '356,496 461,588 627,785 480,976 356,858',
    shadow: '#52606f',
  },
  {
    key: 'right-white',
    points: '792,588 898,496 898,858 770,976 623,785',
    shadow: '#52606f',
  },
  {
    key: 'silver',
    points: '625,782 773,974 625,1150 477,974',
    shadow: '#334155',
  },
];

export default function McoeLogo({ alt = '', className = '' }) {
  const instanceId = useId().replace(/:/g, '');

  return (
    <span
      className={`group relative inline-block shrink-0 align-middle ${className}`}
    >
      <svg
        viewBox="0 0 1254 1254"
        className="block h-full w-full overflow-visible"
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        <defs>
          {SEGMENTS.map((segment) => (
            <Fragment key={segment.key}>
              <clipPath
                id={`${instanceId}-${segment.key}-clip`}
                clipPathUnits="userSpaceOnUse"
              >
                <polygon points={segment.points} />
              </clipPath>
              <filter
                id={`${instanceId}-${segment.key}-shadow`}
                x="-15%"
                y="-15%"
                width="130%"
                height="130%"
                colorInterpolationFilters="sRGB"
              >
                <feDropShadow
                  dx="0"
                  dy="14"
                  stdDeviation="11"
                  floodColor={segment.shadow}
                  floodOpacity="0.34"
                />
              </filter>
            </Fragment>
          ))}
        </defs>

        <image
          href={LOGO_SOURCE}
          width="1254"
          height="1254"
          preserveAspectRatio="xMidYMid meet"
        />

        <g aria-hidden="true" pointerEvents="none">
          {SEGMENTS.map((segment, index) => (
            <g
              key={segment.key}
              filter={`url(#${instanceId}-${segment.key}-shadow)`}
              className="opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 motion-reduce:transition-none"
              style={{ transitionDelay: `${index * 16}ms` }}
            >
              <g clipPath={`url(#${instanceId}-${segment.key}-clip)`}>
                <image
                  href={LOGO_SOURCE}
                  width="1254"
                  height="1254"
                  preserveAspectRatio="xMidYMid meet"
                />
              </g>
            </g>
          ))}
        </g>
      </svg>
    </span>
  );
}
