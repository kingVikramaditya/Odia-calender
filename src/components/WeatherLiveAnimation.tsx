import React, { useMemo } from 'react';

export type WeatherAnimationType = 'sun' | 'moon' | 'heatwave' | 'rain' | 'thunderstorm' | 'cloud';

export interface WeatherLiveAnimationProps {
  weatherCode?: number;
  temp: number;
  isNight: boolean;
  conditionText?: string;
  overrideType?: WeatherAnimationType | 'auto';
  className?: string;
}

/**
 * WeatherLiveAnimation
 * Ambient, GPU-accelerated live weather animations for the Odia Calendar weather panel.
 * Seamlessly integrates with the warm Odisha terracotta & cream design system.
 */
export const WeatherLiveAnimation: React.FC<WeatherLiveAnimationProps> = ({
  weatherCode,
  temp,
  isNight,
  conditionText = '',
  overrideType = 'auto',
  className = '',
}) => {
  // Resolve effective animation type dynamically
  const activeType: WeatherAnimationType = useMemo(() => {
    if (overrideType && overrideType !== 'auto') {
      return overrideType;
    }

    const normText = conditionText.toLowerCase();

    // 1. Thunderstorm: WMO 95..99 or text match
    if (
      (weatherCode !== undefined && weatherCode >= 95 && weatherCode <= 99) ||
      normText.includes('thunder') ||
      normText.includes('storm') ||
      normText.includes('ବଜ୍ରପାତ')
    ) {
      return 'thunderstorm';
    }

    // 2. Rain / Drizzle / Showers: WMO 51..67, 80..82 or text match
    if (
      (weatherCode !== undefined &&
        ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82))) ||
      normText.includes('rain') ||
      normText.includes('shower') ||
      normText.includes('drizzle') ||
      normText.includes('ବର୍ଷା')
    ) {
      return 'rain';
    }

    // 3. Heatwave: extreme summer temperature (>= 35°C in Odisha) or hot condition
    if (
      temp >= 35 ||
      normText.includes('heat') ||
      normText.includes('scorch') ||
      normText.includes('ଗ୍ରୀଷ୍ମ')
    ) {
      return 'heatwave';
    }

    // 4. Cloud / Overcast / Fog: WMO 2, 3, 45, 48 or text match
    if (
      (weatherCode !== undefined && (weatherCode === 2 || weatherCode === 3 || weatherCode === 45 || weatherCode === 48)) ||
      normText.includes('cloud') ||
      normText.includes('overcast') ||
      normText.includes('fog') ||
      normText.includes('mist') ||
      normText.includes('ମେଘ') ||
      normText.includes('କୁହୁଡ଼ି')
    ) {
      return 'cloud';
    }

    // 5. Clear / Pleasant: Sun by day, Moon by night
    return isNight ? 'moon' : 'sun';
  }, [overrideType, weatherCode, conditionText, temp, isNight]);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none rounded-2xl md:rounded-3xl transition-opacity duration-700 ${className}`}
    >
      {/* ============================================================== */}
      {/* 1. SUN ANIMATION (Clear day, Konark chakra sunbeam rotation)   */}
      {/* ============================================================== */}
      {activeType === 'sun' && (
        <div className="absolute inset-0">
          {/* Ambient Warm Golden Halo Glow */}
          <div
            className="absolute -top-12 -right-8 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, rgba(217, 119, 6, 0.05) 50%, transparent 75%)',
            }}
          />

          {/* Sun Disc & Konark-inspired Rotating Sunbeam Wheel in top-right */}
          <div className="absolute -top-6 -right-6 w-44 h-44 flex items-center justify-center opacity-85 dark:opacity-75">
            {/* Outer Slow-Rotating Konark Chakra Rays */}
            <svg
              className="absolute w-40 h-40 text-amber-500/30 dark:text-amber-400/25"
              style={{ animation: 'weather-sun-spin 48s linear infinite' }}
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <polygon
                  key={deg}
                  points="49,12 51,12 52,24 48,24"
                  transform={`rotate(${deg} 50 50)`}
                />
              ))}
              {/* Secondary diamond spokes */}
              {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
                <polygon
                  key={deg}
                  points="49.5,17 50.5,17 51,24 49,24"
                  transform={`rotate(${deg} 50 50)`}
                  opacity="0.6"
                />
              ))}
            </svg>

            {/* Dotted Celestial Aura Ring (spinning slowly counter-clockwise) */}
            <svg
              className="absolute w-32 h-32 text-amber-600/30 dark:text-amber-300/20"
              style={{ animation: 'weather-sun-spin-rev 60s linear infinite' }}
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="2 5"
              />
            </svg>

            {/* Breathing Sun Core Orb */}
            <div
              className="w-14 h-14 rounded-full shadow-lg"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #FDE047 0%, #F59E0B 65%, #D97706 100%)',
                boxShadow: '0 0 25px rgba(245, 158, 11, 0.45)',
                animation: 'weather-sun-pulse 4.5s ease-in-out infinite',
              }}
            />
          </div>

          {/* Floating Subtle Solar Dust Motes */}
          {[
            { top: '35%', left: '72%', delay: '0s', dur: '4.5s' },
            { top: '55%', left: '84%', delay: '1.2s', dur: '5.2s' },
            { top: '25%', left: '60%', delay: '2.4s', dur: '4.8s' },
            { top: '65%', left: '50%', delay: '3.1s', dur: '5.8s' },
          ].map((mote, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/50 dark:bg-amber-300/40 blur-[0.5px]"
              style={{
                top: mote.top,
                left: mote.left,
                animation: `weather-solar-mote ${mote.dur} ease-in-out infinite ${mote.delay}`,
              }}
            />
          ))}
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. MOON ANIMATION (Clear night, glowing crescent & starry sky) */}
      {/* ============================================================== */}
      {activeType === 'moon' && (
        <div className="absolute inset-0">
          {/* Deep Nocturnal Celestial Tint */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 85% 25%, rgba(59, 130, 246, 0.12) 0%, rgba(30, 41, 59, 0.08) 50%, transparent 80%)',
            }}
          />

          {/* Luminous Crescent Moon in top-right */}
          <div className="absolute top-2 right-6 md:right-10 w-20 h-20 flex items-center justify-center">
            {/* Soft Lunar Corona Glow */}
            <div
              className="absolute w-16 h-16 rounded-full blur-md bg-yellow-100/25 dark:bg-yellow-200/20"
              style={{ animation: 'weather-sun-pulse 5s ease-in-out infinite' }}
            />

            {/* Glowing Crescent SVG */}
            <svg
              className="w-12 h-12 text-[#FFFBEB] dark:text-[#FEF08A] drop-shadow-[0_0_12px_rgba(254,240,138,0.55)]"
              style={{ animation: 'weather-moon-breathe 6s ease-in-out infinite' }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>

          {/* Twinkling Stars scattered across the night sky */}
          {[
            { top: '16%', left: '8%', size: 3, delay: '0.2s', dur: '2.5s' },
            { top: '35%', left: '16%', size: 2, delay: '1.4s', dur: '3.2s' },
            { top: '18%', left: '28%', size: 2.5, delay: '0.8s', dur: '2.8s' },
            { top: '48%', left: '38%', size: 2, delay: '2.1s', dur: '3.5s' },
            { top: '15%', left: '48%', size: 3.5, delay: '0.4s', dur: '2.2s' },
            { top: '62%', left: '58%', size: 2, delay: '1.7s', dur: '3.1s' },
            { top: '22%', left: '68%', size: 3, delay: '2.6s', dur: '2.9s' },
            { top: '75%', left: '76%', size: 2.5, delay: '0.9s', dur: '3.3s' },
            { top: '38%', left: '85%', size: 2, delay: '1.9s', dur: '2.6s' },
            { top: '12%', left: '92%', size: 2.5, delay: '0.5s', dur: '3.0s' },
          ].map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white dark:bg-yellow-100"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.9)',
                animation: `weather-star-sparkle ${star.dur} ease-in-out infinite ${star.delay}`,
              }}
            />
          ))}

          {/* Occasional Soft Shooting Star / Meteor */}
          <div
            className="absolute top-4 right-28 w-14 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
            style={{ animation: 'weather-shooting-star 14s linear infinite 4s' }}
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. HEATWAVE ANIMATION (Hot summer, undulating mirage waves)    */}
      {/* ============================================================== */}
      {activeType === 'heatwave' && (
        <div className="absolute inset-0">
          {/* Warm Amber-Terracotta Radiant Heat Pulse */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(234, 88, 12, 0.16) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 100%)',
              animation: 'weather-heat-glow-pulse 3.8s ease-in-out infinite',
            }}
          />

          {/* Intense Blazing Sun with Solar Flare in top-right */}
          <div className="absolute -top-4 -right-4 w-32 h-32 flex items-center justify-center opacity-85">
            <div
              className="w-16 h-16 rounded-full"
              style={{
                background: 'radial-gradient(circle at 40% 40%, #FEF08A 0%, #EA580C 65%, #C2410C 100%)',
                boxShadow: '0 0 35px rgba(234, 88, 12, 0.65), 0 0 60px rgba(249, 115, 22, 0.35)',
                animation: 'weather-sun-pulse 2.8s ease-in-out infinite',
              }}
            />
          </div>

          {/* Undulating Heat Distortion Sine Waves along bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden opacity-60 dark:opacity-45">
            {/* Wave 1: Terracotta / Orange */}
            <svg
              className="absolute -bottom-2 w-[140%] h-12 text-orange-500/25 dark:text-orange-400/20"
              style={{ animation: 'weather-heat-wave-1 5s ease-in-out infinite' }}
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,60 C150,110 350,10 500,60 C650,110 850,10 1000,60 C1100,90 1150,40 1200,60 L1200,120 L0,120 Z"
                fill="currentColor"
              />
            </svg>

            {/* Wave 2: Warm Amber / Gold in counter phase */}
            <svg
              className="absolute -bottom-1 w-[140%] h-10 text-amber-500/20 dark:text-amber-300/15"
              style={{ animation: 'weather-heat-wave-2 6.5s ease-in-out infinite' }}
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 C200,10 400,90 600,45 C800,5 1000,85 1200,50 L1200,120 L0,120 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Shimmering Vertical Heat Haze Streaks Rising */}
          {[
            { left: '15%', delay: '0s', dur: '3.2s' },
            { left: '32%', delay: '1.1s', dur: '2.8s' },
            { left: '52%', delay: '0.4s', dur: '3.6s' },
            { left: '68%', delay: '1.9s', dur: '3.1s' },
            { left: '85%', delay: '0.8s', dur: '2.9s' },
          ].map((haze, i) => (
            <div
              key={i}
              className="absolute bottom-3 w-8 h-14 rounded-full pointer-events-none opacity-40"
              style={{
                left: haze.left,
                background: 'linear-gradient(to top, rgba(249, 115, 22, 0.35), transparent)',
                animation: `weather-heat-haze-rise ${haze.dur} ease-in-out infinite ${haze.delay}`,
              }}
            />
          ))}
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. RAIN ANIMATION (Falling raindrops, ripple splash rings)     */}
      {/* ============================================================== */}
      {activeType === 'rain' && (
        <div className="absolute inset-0">
          {/* Cool Monsoon Aqua Wash */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isNight
                ? 'radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.15) 0%, rgba(15, 23, 42, 0.08) 60%, transparent 80%)'
                : 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.12) 0%, rgba(14, 165, 233, 0.04) 60%, transparent 80%)',
            }}
          />

          {/* Stream of 24 Diagonal Raindrops */}
          {Array.from({ length: 24 }).map((_, i) => {
            const leftPercent = 3 + (i * 4.1);
            const delay = ((i * 0.14) % 1.6).toFixed(2);
            const dur = (0.75 + (i % 5) * 0.1).toFixed(2);
            const height = 14 + (i % 4) * 4;
            const opacity = 0.45 + (i % 3) * 0.15;

            return (
              <div
                key={i}
                className="absolute top-0 w-[1.5px] rounded-full pointer-events-none"
                style={{
                  left: `${leftPercent}%`,
                  height: `${height}px`,
                  opacity,
                  background: isNight
                    ? 'linear-gradient(to bottom, rgba(147, 197, 253, 0.8), rgba(96, 165, 250, 0))'
                    : 'linear-gradient(to bottom, rgba(56, 189, 248, 0.9), rgba(14, 165, 233, 0))',
                  animation: `weather-raindrop ${dur}s linear infinite ${delay}s`,
                }}
              />
            );
          })}

          {/* Water Ripple Splash Rings along floor */}
          {[
            { left: '12%', delay: '0.2s', dur: '1.8s' },
            { left: '34%', delay: '0.9s', dur: '1.7s' },
            { left: '55%', delay: '0.4s', dur: '2.0s' },
            { left: '72%', delay: '1.3s', dur: '1.6s' },
            { left: '88%', delay: '0.7s', dur: '1.9s' },
          ].map((rip, i) => (
            <div
              key={i}
              className="absolute bottom-1.5 w-6 h-2 rounded-full border border-sky-400/40 dark:border-sky-300/30 pointer-events-none"
              style={{
                left: rip.left,
                animation: `weather-water-ripple ${rip.dur} ease-out infinite ${rip.delay}`,
              }}
            />
          ))}

          {/* Subtle Ground Mist Wash */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-sky-400/10 to-transparent pointer-events-none" />
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. THUNDERSTORM ANIMATION (Rain + lightning flash + bolt)      */}
      {/* ============================================================== */}
      {activeType === 'thunderstorm' && (
        <div className="absolute inset-0">
          {/* Dark Stormy Atmosphere Base */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 60% 40%, rgba(79, 70, 229, 0.14) 0%, rgba(30, 27, 75, 0.08) 60%, transparent 85%)',
            }}
          />

          {/* Realistic Double-Pulse Sheet Lightning Flash Overlay */}
          <div
            className="absolute inset-0 bg-white/40 dark:bg-indigo-100/30 pointer-events-none"
            style={{ animation: 'weather-lightning-flash 7.5s ease-out infinite 1.5s' }}
          />

          {/* Electric Lightning Bolt Vector in top-right */}
          <div
            className="absolute top-2 right-12 md:right-20 pointer-events-none"
            style={{ animation: 'weather-bolt-flash 7.5s ease-out infinite 1.5s' }}
          >
            <svg
              className="w-10 h-16 text-yellow-300 dark:text-yellow-200 drop-shadow-[0_0_10px_rgba(253,224,71,0.9)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>

          {/* Heavier, Faster Raindrops (30 streaks) */}
          {Array.from({ length: 30 }).map((_, i) => {
            const leftPercent = 2 + (i * 3.3);
            const delay = ((i * 0.09) % 1.2).toFixed(2);
            const dur = (0.55 + (i % 4) * 0.08).toFixed(2);
            const height = 18 + (i % 3) * 5;

            return (
              <div
                key={i}
                className="absolute top-0 w-[1.8px] rounded-full pointer-events-none"
                style={{
                  left: `${leftPercent}%`,
                  height: `${height}px`,
                  background: 'linear-gradient(to bottom, rgba(147, 197, 253, 0.95), rgba(59, 130, 246, 0))',
                  animation: `weather-raindrop ${dur}s linear infinite ${delay}s`,
                }}
              />
            );
          })}

          {/* Active Water Ripples */}
          {[
            { left: '10%', delay: '0.1s', dur: '1.4s' },
            { left: '28%', delay: '0.6s', dur: '1.5s' },
            { left: '46%', delay: '0.3s', dur: '1.3s' },
            { left: '64%', delay: '0.8s', dur: '1.6s' },
            { left: '82%', delay: '0.2s', dur: '1.4s' },
          ].map((rip, i) => (
            <div
              key={i}
              className="absolute bottom-1 w-7 h-2.5 rounded-full border border-sky-300/60 pointer-events-none"
              style={{
                left: rip.left,
                animation: `weather-water-ripple ${rip.dur} ease-out infinite ${rip.delay}`,
              }}
            />
          ))}
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. CLOUD / OVERCAST / FOG ANIMATION (Soft drifting clouds)     */}
      {/* ============================================================== */}
      {activeType === 'cloud' && (
        <div className="absolute inset-0">
          {/* Subtle Ambient Soft Wash */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isNight
                ? 'radial-gradient(circle at 70% 30%, rgba(148, 163, 184, 0.12) 0%, transparent 70%)'
                : 'radial-gradient(circle at 70% 30%, rgba(203, 213, 225, 0.16) 0%, transparent 70%)',
            }}
          />

          {/* Peek-a-boo Sun / Moon behind clouds */}
          {isNight ? (
            <div className="absolute top-2 right-12 w-12 h-12 flex items-center justify-center opacity-70">
              <svg className="w-8 h-8 text-yellow-100 drop-shadow-[0_0_8px_rgba(254,240,138,0.4)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
          ) : (
            <div className="absolute top-2 right-12 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 opacity-60 blur-[1px] shadow-[0_0_18px_rgba(245,158,11,0.35)]" />
          )}

          {/* Layer 1: Slow Background Cloud */}
          <div
            className="absolute top-2 left-0 w-56 h-20 opacity-30 dark:opacity-20 pointer-events-none"
            style={{ animation: 'weather-cloud-drift-slow 44s linear infinite' }}
          >
            <svg viewBox="0 0 200 80" fill="currentColor" className="w-full h-full text-stone-400 dark:text-stone-300">
              <path d="M20,60 Q20,40 40,35 Q50,15 80,18 Q100,5 130,15 Q155,10 165,30 Q185,35 180,60 Z" />
            </svg>
          </div>

          {/* Layer 2: Medium Midground Cloud */}
          <div
            className="absolute top-8 left-0 w-64 h-24 opacity-40 dark:opacity-25 pointer-events-none"
            style={{ animation: 'weather-cloud-drift-med 30s linear infinite 5s' }}
          >
            <svg viewBox="0 0 220 85" fill="currentColor" className="w-full h-full text-stone-300 dark:text-stone-200">
              <path d="M15,65 Q10,42 35,38 Q48,16 80,20 Q105,8 135,18 Q165,12 178,35 Q205,40 195,65 Z" />
            </svg>
          </div>

          {/* Layer 3: Soft Low Fog / Mist Band */}
          <div
            className="absolute bottom-2 left-0 right-0 h-10 pointer-events-none opacity-40"
            style={{
              background: 'linear-gradient(to top, rgba(203, 213, 225, 0.35) 0%, transparent 100%)',
              animation: 'weather-fog-pulse 7s ease-in-out infinite',
            }}
          />
        </div>
      )}
    </div>
  );
};
