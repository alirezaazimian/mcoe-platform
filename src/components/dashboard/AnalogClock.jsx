import {
  useEffect,
  useState,
} from 'react';

export default function AnalogClock() {
  const [now, setNow] = useState(
    new Date()
  );

  useEffect(() => {
    const id = setInterval(
      () => setNow(new Date()),
      1000
    );

    return () => clearInterval(id);
  }, []);

  const min = now.getMinutes();
  const hr = now.getHours() % 12;

  const minAngle = min * 6;
  const hrAngle =
    hr * 30 + min * 0.5;

  const cx = 50;
  const cy = 50;

  const hand = (
    angle,
    len,
    width,
    color
  ) => {
    const rad =
      (angle - 90) *
      (Math.PI / 180);

    return {
      x1: cx,
      y1: cy,
      x2:
        cx +
        len * Math.cos(rad),
      y2:
        cy +
        len * Math.sin(rad),
      width,
      stroke: color,
      strokeLinecap: 'round',
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '16px 12px 22px',
      }}
    >
      <div
        className="neu-inset-sm"
        style={{
          width: 108,
          height: 108,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width="84"
          height="84"
          style={{ display: 'block' }}
        >
          {Array.from({
            length: 12,
          }).map((_, i) => {
            const angle =
              (i * 30 - 90) *
              (Math.PI / 180);

            const isMajor =
              i % 3 === 0;

            const r1 = isMajor
              ? 38
              : 41;

            const r2 = 45;

            return (
              <line
                key={i}
                x1={
                  cx +
                  r1 *
                    Math.cos(angle)
                }
                y1={
                  cy +
                  r1 *
                    Math.sin(angle)
                }
                x2={
                  cx +
                  r2 *
                    Math.cos(angle)
                }
                y2={
                  cy +
                  r2 *
                    Math.sin(angle)
                }
                stroke={
                  isMajor
                    ? '#7a7470'
                    : '#c4beb7'
                }
                strokeWidth={
                  isMajor
                    ? 1.6
                    : 0.9
                }
                strokeLinecap="round"
              />
            );
          })}

          <line
            {...hand(
              hrAngle,
              24,
              3,
              '#080C66'
            )}
          />

          <line
            {...hand(
              minAngle,
              33,
              2,
              '#2e2a26'
            )}
          />

          <circle
            cx={cx}
            cy={cy}
            r="2.4"
            fill="#2e2a26"
          />
        </svg>
      </div>
    </div>
  );
}
