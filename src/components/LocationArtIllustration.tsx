import React from 'react';
import {
  BargarhArt,
  BalangirArt,
  AngulArt,
  DhenkanalArt,
  KendraparaArt,
  JagatsinghpurArt,
  JajpurArt,
  BhadrakArt,
  KeonjharArt,
  JharsugudaArt,
} from './districtIllustrationsGroup2';
import {
  DeogarhArt,
  SubarnapurArt,
  BoudhArt,
  NayagarhArt,
  KandhamalArt,
  RayagadaArt,
  NabarangpurArt,
  MalkangiriArt,
  NuapadaArt,
  KalahandiArt,
  GajapatiArt,
} from './districtIllustrationsGroup3';

interface LocationArtProps {
  locationId: string;
  landscapeType?: string;
  className?: string;
}

/**
 * Minimal vector illustration art inspired by flat architectural posters.
 * Uses warm terracotta (#B54348, #9E353B), coral clay (#D86B67, #E48D75),
 * warm sand/gold (#F4BC7C, #FDE6C4), and soft backdrop silhouettes (#F6DCB8, #ECC199).
 */
export const LocationArtIllustration: React.FC<LocationArtProps> = ({
  locationId,
  landscapeType,
  className = '',
}) => {
  const normId = (locationId || '').toLowerCase();

  // 1. PURI (Sri Jagannath Temple, Singhadwara, Aruna Stambha, Nilachakra & Coast)
  if (normId.includes('puri')) {
    return (
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* Layer 1: Background Silhouette (Soft peach-sand tones) */}
        <path d="M20 220V120H55V220H20Z" fill="#F8D8B6" opacity="0.6" />
        <path d="M55 220V90H95V220H55Z" fill="#F8D8B6" opacity="0.5" />
        <path d="M95 220V135H135V220H95Z" fill="#F8D8B6" opacity="0.6" />
        <path d="M140 220V80H175V220H140Z" fill="#F8D8B6" opacity="0.5" />
        
        {/* Distant Temple Spire Silhouettes */}
        <path d="M380 220V75L400 35L420 75V220H380Z" fill="#F4CCA4" opacity="0.5" />
        <circle cx="400" cy="30" r="5" fill="#E89E70" opacity="0.6" />
        <path d="M490 220V105H530V220H490Z" fill="#F4CCA4" opacity="0.55" />
        <path d="M440 220V120H485V220H440Z" fill="#F8D8B6" opacity="0.45" />

        {/* Layer 2: Arched Colonnade Gallery (Mecca/Heritage arcade style) */}
        <path d="M0 220V152H230V220H0Z" fill="#E2897C" />
        {/* Repeating Arched Openings */}
        {[10, 36, 62, 88, 114, 140, 166, 192].map((x, i) => (
          <path
            key={i}
            d={`M${x} 220V178C${x} 170 ${x + 18} 170 ${x + 18} 178V220H${x}Z`}
            fill="#B9484F"
            opacity="0.75"
          />
        ))}

        {/* Layer 3: Grand Jagamohana (Stepped Pyramidal Pidha Deula) */}
        <path d="M185 220V130L220 72H280L315 130V220H185Z" fill="#D76B66" />
        <path d="M198 128H302V136H198V128Z" fill="#B74448" />
        <path d="M210 108H290V116H210V108Z" fill="#B74448" />
        <path d="M222 88H278V96H222V88Z" fill="#B74448" />
        {/* Tiered Kalasa atop Jagamohana */}
        <path d="M242 72L250 56L258 72H242Z" fill="#F7BB6B" />
        <circle cx="250" cy="52" r="4" fill="#B74448" />

        {/* Layer 4: Soaring Puri Jagannath Temple Shikhara (Rekha Deula) */}
        {/* Main Tower Body */}
        <path
          d="M275 220V110C275 75 295 38 315 24C335 38 355 75 355 110V220H275Z"
          fill="#B54047"
        />
        {/* Vertical Fluted Pilasters */}
        <path d="M291 220V60C299 50 307 40 315 32C323 40 331 50 339 60V220H333V63C327 53 321 44 315 38C309 44 303 53 297 63V220H291Z" fill="#F4BB74" opacity="0.85" />
        <path d="M309 220V42H321V220H309Z" fill="#F8E5CE" opacity="0.35" />

        {/* Amalaka (Ribbed Stone Disc) */}
        <ellipse cx="315" cy="22" rx="19" ry="6" fill="#F6BC6D" />
        <ellipse cx="315" cy="18" rx="14" ry="4" fill="#D76B66" />
        <ellipse cx="315" cy="14" rx="9" ry="3" fill="#F6BC6D" />
        
        {/* Neela Chakra (Divine Blue-Gold Wheel) */}
        <circle cx="315" cy="6" r="6" stroke="#2B6CB0" strokeWidth="2.5" fill="#FDF3DA" />
        <circle cx="315" cy="6" r="2" fill="#2B6CB0" />
        
        {/* Patitapabana Flag fluttering in oceanic breeze */}
        <path d="M315 0L338 6L315 12V0Z" fill="#E53E3E" />
        <line x1="315" y1="0" x2="315" y2="12" stroke="#B74448" strokeWidth="2" />

        {/* Singhadwara (Lion's Gate Gateway Box) */}
        <rect x="360" y="125" width="85" height="95" rx="3" fill="#A8373E" />
        <rect x="368" y="132" width="69" height="10" fill="#F6BC6D" />
        <path d="M382 220V165C382 154 422 154 422 165V220H382Z" fill="#FDF3DA" />
        {/* Inner sanctum door slit */}
        <path d="M393 220V176C393 170 411 170 411 176V220H393Z" fill="#4A191C" />

        {/* Aruna Stambha (Sun Pillar of Puri) */}
        <rect x="462" y="55" width="8" height="165" fill="#B54047" />
        <rect x="459" y="50" width="14" height="6" rx="2" fill="#F6BC6D" />
        {/* Idol topper */}
        <circle cx="466" cy="42" r="5" fill="#F6BC6D" />
        <path d="M464 36L466 31L468 36H464Z" fill="#B54047" />

        {/* Coastal Nature / Waves Accent at base right */}
        <path d="M495 220C502 210 514 210 521 220H495Z" fill="#E2897C" opacity="0.6" />
        <path d="M515 220C522 208 534 208 540 220H515Z" fill="#D76B66" opacity="0.7" />
        
        {/* Coastal Palm Silhouette */}
        <path d="M508 220C508 190 512 165 522 145" stroke="#9E353B" strokeWidth="3" strokeLinecap="round" />
        <path d="M522 145C510 135 498 140 492 146" stroke="#B54047" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M522 145C524 130 520 120 516 115" stroke="#B54047" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M522 145C534 132 542 135 548 142" stroke="#B54047" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 2. KONARK (Sun Temple Chariot Wheel & Tiered Jagamohana)
  if (normId.includes('konark')) {
    return (
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* Layer 1: Background Silhouette - Radiant Sun Disk & Sky */}
        <circle cx="160" cy="90" r="65" fill="#F8DAB8" opacity="0.45" />
        <path d="M20 220V140H70V220H20Z" fill="#F8D8B6" opacity="0.5" />
        <path d="M70 220V110H120V220H70Z" fill="#F8D8B6" opacity="0.45" />
        
        {/* Layer 2: Konark Chariot Platform & Arches */}
        <path d="M0 220V160H260V220H0Z" fill="#E2897C" />
        {[15, 45, 75, 105, 135, 165, 195, 225].map((x, i) => (
          <path
            key={i}
            d={`M${x} 220V182C${x} 174 ${x + 18} 174 ${x + 18} 182V220H${x}Z`}
            fill="#B9484F"
            opacity="0.8"
          />
        ))}

        {/* Layer 3: Iconic Konark Sun Chariot Wheel (Chakra) */}
        <g transform="translate(180, 120)">
          {/* Outer Wheel Rim */}
          <circle cx="0" cy="0" r="68" stroke="#B54047" strokeWidth="12" fill="#FEECC8" />
          <circle cx="0" cy="0" r="58" stroke="#F4BC7C" strokeWidth="3" fill="none" />
          <circle cx="0" cy="0" r="22" fill="#B54047" />
          <circle cx="0" cy="0" r="14" fill="#F4BC7C" />
          <circle cx="0" cy="0" r="6" fill="#782329" />
          {/* 8 Primary Carved Spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2={60 * Math.cos((deg * Math.PI) / 180)}
              y2={60 * Math.sin((deg * Math.PI) / 180)}
              stroke="#B54047"
              strokeWidth="5"
            />
          ))}
          {/* 8 Secondary Narrow Spokes */}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2={56 * Math.cos((deg * Math.PI) / 180)}
              y2={56 * Math.sin((deg * Math.PI) / 180)}
              stroke="#D76B66"
              strokeWidth="2.5"
            />
          ))}
        </g>

        {/* Layer 4: Konark Jagamohana (Grand Tiered Stepped Sanctuary) */}
        <path d="M270 220V125L325 45H405L460 125V220H270Z" fill="#B54047" />
        {/* Tiered horizontal cornices */}
        <rect x="290" y="138" width="150" height="8" fill="#F4BC7C" />
        <rect x="306" y="112" width="118" height="7" fill="#F4BC7C" />
        <rect x="322" y="86" width="86" height="7" fill="#F4BC7C" />
        <rect x="338" y="60" width="54" height="6" fill="#F4BC7C" />
        
        {/* Double Kalasa & Crown */}
        <ellipse cx="365" cy="40" rx="26" ry="6" fill="#F4BC7C" />
        <ellipse cx="365" cy="32" rx="18" ry="5" fill="#D76B66" />
        <ellipse cx="365" cy="24" rx="12" ry="4" fill="#F4BC7C" />
        <path d="M362 20L365 10L368 20H362Z" fill="#A8373E" />

        {/* Galloping Sun Chariot Horse Silhouette on the right */}
        <path
          d="M455 220V175C465 170 472 155 480 152C488 150 495 142 498 135C502 140 500 150 495 158C505 160 515 170 520 185C522 195 528 208 535 220H455Z"
          fill="#8E2D33"
        />
        <circle cx="490" cy="144" r="3" fill="#F4BC7C" />
      </svg>
    );
  }

  // 3. BHUBANESWAR (Lingaraj Temple Spire & Mukteshwar Torana Arch)
  if (normId.includes('bhubaneswar')) {
    return (
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* Layer 1: Background Silhouette - Old Town Temples */}
        <path d="M20 220V135L40 90L60 135V220H20Z" fill="#F8D8B6" opacity="0.6" />
        <path d="M80 220V110H130V220H80Z" fill="#F8D8B6" opacity="0.5" />
        <path d="M420 220V120L450 70L480 120V220H420Z" fill="#F4CCA4" opacity="0.55" />
        <path d="M490 220V100H530V220H490Z" fill="#F8D8B6" opacity="0.5" />

        {/* Layer 2: Heritage Colonnade Base */}
        <path d="M0 220V155H210V220H0Z" fill="#E2897C" />
        {[10, 38, 66, 94, 122, 150, 178].map((x, i) => (
          <path
            key={i}
            d={`M${x} 220V180C${x} 172 ${x + 18} 172 ${x + 18} 180V220H${x}Z`}
            fill="#B9484F"
            opacity="0.8"
          />
        ))}

        {/* Layer 3: Iconic Mukteshwar Torana (Curvilinear Arched Gateway) */}
        <g transform="translate(195, 85)">
          {/* Left Pillar */}
          <rect x="0" y="45" width="14" height="90" fill="#B54047" />
          <rect x="-3" y="40" width="20" height="7" rx="1" fill="#F4BC7C" />
          {/* Right Pillar */}
          <rect x="95" y="45" width="14" height="90" fill="#B54047" />
          <rect x="92" y="40" width="20" height="7" rx="1" fill="#F4BC7C" />
          {/* Iconic Half-Circular Torana Arch */}
          <path
            d="M5 40C5 -5 104 -5 104 40"
            stroke="#B54047"
            strokeWidth="14"
            fill="none"
          />
          <path
            d="M5 40C5 -5 104 -5 104 40"
            stroke="#F4BC7C"
            strokeWidth="3"
            fill="none"
          />
          {/* Central Medallion */}
          <circle cx="54.5" cy="5" r="9" fill="#F4BC7C" />
          <circle cx="54.5" cy="5" r="4" fill="#B54047" />
        </g>

        {/* Layer 4: Grand Lingaraj Temple 180-ft Shikhara */}
        <path
          d="M320 220V110C320 70 342 32 365 16C388 32 410 70 410 110V220H320Z"
          fill="#B54047"
        />
        {/* Vertical Rekha flutings */}
        <path d="M338 220V60C348 48 358 36 365 26C372 36 382 48 392 60V220H384V64C376 52 370 42 365 34C360 42 354 52 346 64V220H338Z" fill="#F4BB74" opacity="0.85" />
        {/* Lingaraj Pinaka & Trishul Trident Topper */}
        <ellipse cx="365" cy="14" rx="18" ry="5" fill="#F4BC7C" />
        <ellipse cx="365" cy="9" rx="11" ry="3" fill="#D76B66" />
        {/* Trishul & Pinaka Bow */}
        <line x1="365" y1="9" x2="365" y2="-4" stroke="#F4BC7C" strokeWidth="2.5" />
        <path d="M358 0C362 5 368 5 372 0" stroke="#F4BC7C" strokeWidth="2" fill="none" />

        {/* Side Mandapa (Bhogamandapa) */}
        <path d="M410 220V145L445 105H490L520 145V220H410Z" fill="#D76B66" />
        <rect x="425" y="150" width="80" height="6" fill="#F4BC7C" />
        <rect x="438" y="130" width="54" height="6" fill="#F4BC7C" />
      </svg>
    );
  }

  // 4. CUTTACK (Barabati Fort Gateway, Mahanadi River & Maritime Boita)
  if (normId.includes('cuttack')) {
    return (
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* Layer 1: Background Silhouette - Mahanadi River Horizon */}
        <path d="M20 220V150H70V220H20Z" fill="#F8D8B6" opacity="0.5" />
        <path d="M80 220V120H135V220H80Z" fill="#F8D8B6" opacity="0.45" />

        {/* Layer 2: Barabati Fort Massive Stone Ramparts */}
        <path d="M0 220V140H190V220H0Z" fill="#E2897C" />
        {/* Battlements / Merlons along top */}
        {[0, 24, 48, 72, 96, 120, 144, 168].map((x, i) => (
          <rect key={i} x={x} y="130" width="14" height="12" fill="#B54047" />
        ))}
        {/* Arched openings in rampart */}
        {[20, 65, 110, 155].map((x, i) => (
          <path
            key={i}
            d={`M${x} 220V175C${x} 165 ${x + 22} 165 ${x + 22} 175V220H${x}Z`}
            fill="#8A2C31"
          />
        ))}

        {/* Layer 3: Grand Barabati Fort 9-Storey Gateway (Historic Stone Torana) */}
        <g transform="translate(190, 60)">
          {/* Main Tower */}
          <rect x="0" y="40" width="115" height="120" fill="#B54047" />
          <rect x="-6" y="32" width="127" height="10" fill="#F4BC7C" />
          {/* Decorative arched niches */}
          <path d="M35 160V95C35 75 80 75 80 95V160H35Z" fill="#FEECC8" />
          <path d="M45 160V105C45 92 70 92 70 105V160H45Z" fill="#4C171A" />
          {/* Upper battlements */}
          {[6, 28, 50, 72, 94].map((x, i) => (
            <rect key={i} x={x} y="22" width="14" height="12" fill="#8A2C31" />
          ))}
        </g>

        {/* Layer 4: Heritage Boita (Odisha's Maritime Trading Ship with Sails) */}
        <g transform="translate(325, 95)">
          {/* Wooden Boat Hull */}
          <path
            d="M10 100C40 120 120 120 150 100C165 92 175 80 185 68H0C5 80 8 92 10 100Z"
            fill="#8A2C31"
          />
          <path d="M5 70H175V76H5V70Z" fill="#F4BC7C" />
          
          {/* Main Mast & Billowing White/Cream Sail */}
          <line x1="85" y1="70" x2="85" y2="5" stroke="#F4BC7C" strokeWidth="3" />
          <path d="M85 8C130 18 135 55 85 64V8Z" fill="#FEECC8" />
          <path d="M85 10C50 20 45 55 85 62V10Z" fill="#F7D4A8" />
          {/* Flag at mast top */}
          <path d="M85 0L102 5L85 10V0Z" fill="#E53E3E" />
        </g>

        {/* Mahanadi River Wave Ripples */}
        <path d="M300 220C320 214 340 214 360 220H300Z" fill="#D76B66" opacity="0.6" />
        <path d="M370 220C390 212 420 212 440 220H370Z" fill="#B54047" opacity="0.7" />
        <path d="M450 220C475 210 510 210 535 220H450Z" fill="#E2897C" opacity="0.6" />
      </svg>
    );
  }

  // 5. SAMBALPUR (Maa Samaleswari Shrine & Hirakud Dam Dyke)
  if (normId.includes('sambalpur')) {
    return (
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* Layer 1: Background Silhouette - Mahanadi reservoir hills */}
        <path d="M30 220C70 160 140 160 180 220H30Z" fill="#F8D8B6" opacity="0.5" />
        <path d="M160 220C210 140 290 140 340 220H160Z" fill="#F8D8B6" opacity="0.4" />

        {/* Layer 2: Hirakud Dam Dyke & Sluice Gates (Longest earthen dam in world) */}
        <path d="M0 220V168H280V220H0Z" fill="#E2897C" />
        {/* Repeating Sluice Crest Arches */}
        {[10, 34, 58, 82, 106, 130, 154, 178, 202, 226, 250].map((x, i) => (
          <rect key={i} x={x} y="174" width="14" height="46" rx="2" fill="#B54047" />
        ))}
        {/* Observation Tower (Gandhi Minar silhouette) */}
        <rect x="70" y="85" width="18" height="85" fill="#B54047" />
        <rect x="66" y="80" width="26" height="7" rx="2" fill="#F4BC7C" />
        <circle cx="79" cy="74" r="6" fill="#F4BC7C" />

        {/* Layer 3: Sacred Maa Samaleswari Temple Sanctum */}
        <g transform="translate(290, 45)">
          {/* Main Shikhara Body */}
          <path
            d="M30 175V75C30 45 48 18 68 6C88 18 106 45 106 75V175H30Z"
            fill="#B54047"
          />
          {/* Sambalpuri Bandha Motif Horizontal Strips */}
          <rect x="42" y="85" width="52" height="7" fill="#F4BC7C" />
          <rect x="48" y="60" width="40" height="6" fill="#F4BC7C" />
          <rect x="54" y="38" width="28" height="5" fill="#F4BC7C" />
          
          {/* Golden Kalasa & Sacred Flag */}
          <ellipse cx="68" cy="5" rx="14" ry="4" fill="#F4BC7C" />
          <ellipse cx="68" cy="1" rx="8" ry="3" fill="#D76B66" />
          <path d="M68 -4L84 0L68 4V-4Z" fill="#E53E3E" />
          
          {/* Temple Porch (Jagmohan) */}
          <path d="M106 175V110L135 75H170L195 110V175H106Z" fill="#D76B66" />
          <rect x="120" y="115" width="60" height="6" fill="#F4BC7C" />
        </g>

        {/* Water Ripple on right */}
        <path d="M480 220C495 210 515 210 535 220H480Z" fill="#B54047" opacity="0.7" />
      </svg>
    );
  }

  // 6. KORAPUT (Sabara Srikhetra Hilltop Temple & Deomali Mountains Nature)
  if (normId.includes('koraput')) {
    return (
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* Layer 1: Rolling Eastern Ghats / Deomali Mountain Peaks */}
        <path d="M0 220L80 110L190 190L290 85L390 170L480 90L540 140V220H0Z" fill="#F8D8B6" opacity="0.45" />
        <path d="M40 220L150 120L250 180L340 100L430 165L520 110V220H40Z" fill="#EAA580" opacity="0.5" />

        {/* Layer 2: Pine Trees & Forest Hills */}
        <g fill="#B54047" opacity="0.8">
          {[20, 60, 100, 140, 180].map((x, i) => (
            <path key={i} d={`M${x} 220L${x + 12} 165L${x + 24} 220H${x}Z`} />
          ))}
        </g>

        {/* Layer 3: Hilltop Sabara Srikhetra Jagannath Temple */}
        <g transform="translate(230, 40)">
          {/* Hill Rock Base */}
          <path d="M0 180C40 135 180 135 220 180H0Z" fill="#9E353B" />
          
          {/* Temple Shikhara */}
          <path
            d="M80 145V70C80 42 94 20 110 10C126 20 140 42 140 70V145H80Z"
            fill="#D76B66"
          />
          <path d="M92 145V50C98 40 104 30 110 22C116 30 122 40 128 50V145H92Z" fill="#F4BC7C" opacity="0.8" />
          <ellipse cx="110" cy="8" rx="14" ry="4" fill="#F4BC7C" />
          <path d="M110 2L126 6L110 10V2Z" fill="#E53E3E" />
          
          {/* Porch */}
          <path d="M40 145V100L65 72H80V145H40Z" fill="#B54047" />
          {/* Entrance Door */}
          <path d="M52 145V115C52 108 68 108 68 115V145H52Z" fill="#FEECC8" />
        </g>

        {/* Foreground Mountain Slope & Coffee Plantation Trees */}
        <path d="M420 220C440 180 490 170 540 160V220H420Z" fill="#8A2C31" />
        <g fill="#F4BC7C">
          <circle cx="460" cy="180" r="10" />
          <circle cx="485" cy="172" r="14" />
          <circle cx="515" cy="165" r="12" />
        </g>
      </svg>
    );
  }

  // 7. BERHAMPUR / GANJAM (Tara Tarini Hilltop Shrine & Gopalpur Lighthouse)
  if (normId.includes('berhampur') || normId.includes('ganjam')) {
    return (
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* Layer 1: Background Silhouette - Purnagiri Hill & Coast */}
        <path d="M0 220C60 140 180 140 240 220H0Z" fill="#F8D8B6" opacity="0.5" />
        <path d="M180 220C240 120 380 120 440 220H180Z" fill="#EAA580" opacity="0.4" />

        {/* Layer 2: Hilltop Tara Tarini Twin Temples */}
        <g transform="translate(180, 50)">
          {/* Main Hill Crest */}
          <path d="M0 170C50 110 170 110 220 170H0Z" fill="#B54047" />
          {/* Pilgrim 999-Step Zig-zag path */}
          <path d="M30 170L70 150L45 135L85 120" stroke="#F4BC7C" strokeWidth="3" fill="none" />
          
          {/* Twin Spired Shrines of Maa Tara & Maa Tarini */}
          <path d="M85 125V65C85 45 98 28 110 20C122 28 135 45 135 65V125H85Z" fill="#D76B66" />
          <ellipse cx="110" cy="18" rx="12" ry="4" fill="#F4BC7C" />
          <path d="M110 12L124 16L110 20V12Z" fill="#E53E3E" />

          <path d="M135 125V75C135 58 146 42 155 35C164 42 175 58 175 75V125H135Z" fill="#8A2C31" />
          <ellipse cx="155" cy="33" rx="10" ry="3" fill="#F4BC7C" />
        </g>

        {/* Layer 3: Historic Gopalpur Lighthouse on the Coast */}
        <g transform="translate(430, 70)">
          {/* Striped Lighthouse Tower */}
          <path d="M20 150L26 40H44L50 150H20Z" fill="#FEECC8" />
          <rect x="22" y="115" width="26" height="18" fill="#B54047" />
          <rect x="24" y="70" width="22" height="18" fill="#B54047" />
          {/* Lantern Room & Gallery */}
          <rect x="22" y="32" width="26" height="8" rx="2" fill="#8A2C31" />
          <circle cx="35" cy="24" r="7" fill="#F4BC7C" />
          <path d="M35 15L40 22H30L35 15Z" fill="#8A2C31" />
        </g>

        {/* Coastal Waves */}
        <path d="M360 220C385 212 415 212 440 220H360Z" fill="#E2897C" opacity="0.7" />
        <path d="M440 220C465 210 505 210 530 220H440Z" fill="#B54047" opacity="0.6" />
      </svg>
    );
  }

  // 8. ROURKELA (Hanuman Vatika 75-ft Statue & Vedavyasa Confluence)
  if (normId.includes('rourkela')) {
    return (
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* Layer 1: Background Silhouette - Koel & Sankha River Valley */}
        <path d="M10 220C60 150 160 150 210 220H10Z" fill="#F8D8B6" opacity="0.5" />
        <path d="M190 220C250 130 360 130 420 220H190Z" fill="#F8D8B6" opacity="0.4" />

        {/* Layer 2: Vedavyasa Temple Gateway */}
        <path d="M0 220V155H190V220H0Z" fill="#E2897C" />
        {[10, 36, 62, 88, 114, 140, 166].map((x, i) => (
          <path
            key={i}
            d={`M${x} 220V180C${x} 172 ${x + 18} 172 ${x + 18} 180V220H${x}Z`}
            fill="#B54047"
          />
        ))}

        {/* Layer 3: Majestic 75-ft Hanuman Vatika Statue Silhouette */}
        <g transform="translate(230, 25)">
          {/* Pedestal */}
          <rect x="40" y="150" width="70" height="45" rx="3" fill="#B54047" />
          <rect x="34" y="145" width="82" height="7" fill="#F4BC7C" />
          
          {/* Giant Standing Figure Silhouette */}
          <path
            d="M62 145V90C55 85 50 78 50 68C50 55 60 45 75 45C90 45 100 55 100 68C100 78 95 85 88 90V145H62Z"
            fill="#9E353B"
          />
          {/* Crown (Mukuta) */}
          <path d="M66 45L75 25L84 45H66Z" fill="#F4BC7C" />
          <circle cx="75" cy="22" r="3" fill="#B54047" />
          {/* Gada (Mace) held upright */}
          <rect x="98" y="55" width="6" height="90" fill="#F4BC7C" />
          <ellipse cx="101" cy="52" rx="10" ry="12" fill="#B54047" />
        </g>

        {/* Layer 4: Kalinga Style Temple Shikhara */}
        <path
          d="M360 220V130C360 90 380 50 400 35C420 50 440 90 440 130V220H360Z"
          fill="#D76B66"
        />
        <rect x="375" y="135" width="50" height="7" fill="#F4BC7C" />
        <ellipse cx="400" cy="32" rx="15" ry="4" fill="#F4BC7C" />
        <path d="M400 26L415 30L400 34V26Z" fill="#E53E3E" />
      </svg>
    );
  }

  // 9. BALASORE (Chandipur Waves & Khirachora Gopinatha Temple)
  if (normId.includes('balasore')) {
    return (
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* Layer 1: Receding Chandipur Sea Horizon */}
        <path d="M0 220V165C80 150 160 180 240 165C320 150 400 180 540 160V220H0Z" fill="#F8D8B6" opacity="0.45" />

        {/* Layer 2: Casuarina Pine Forest Silhouette */}
        <g fill="#B54047" opacity="0.75">
          {[20, 50, 80, 110, 140, 170].map((x, i) => (
            <path key={i} d={`M${x} 220L${x + 8} 145L${x + 16} 220H${x}Z`} />
          ))}
        </g>

        {/* Layer 3: Khirachora Gopinatha Temple Shikhara */}
        <g transform="translate(250, 50)">
          <path
            d="M50 170V95C50 65 68 35 88 22C108 35 126 65 126 95V170H50Z"
            fill="#B54047"
          />
          <path d="M62 170V70C70 58 78 46 88 36C98 46 106 58 114 70V170H62Z" fill="#F4BC7C" opacity="0.8" />
          <ellipse cx="88" cy="20" rx="14" ry="4" fill="#F4BC7C" />
          <path d="M88 14L104 18L88 22V14Z" fill="#E53E3E" />
          
          {/* Stepped Porch */}
          <path d="M126 170V120L155 85H195L220 120V170H126Z" fill="#D76B66" />
          <rect x="145" y="125" width="60" height="6" fill="#F4BC7C" />
        </g>

        {/* Fishing Boat (Catamaran) silhouette on tide line */}
        <g transform="translate(180, 145)">
          <path d="M10 35C25 45 55 45 70 35H10Z" fill="#8A2C31" />
          <line x1="40" y1="35" x2="40" y2="10" stroke="#F4BC7C" strokeWidth="2" />
          <path d="M40 12L55 22H40V12Z" fill="#FEECC8" />
        </g>
      </svg>
    );
  }

  // 10. BARIPADA / MAYURBHANJ (Similipal Biosphere & Waterfall / Haribaldevjew)
  if (normId.includes('baripada') || normId.includes('mayurbhanj')) {
    return (
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
        preserveAspectRatio="xMaxYMax meet"
      >
        {/* Layer 1: Similipal Sal Tree Forest Canopy & Barehipani Waterfall */}
        <path d="M0 220L70 120L150 180L230 110L320 170L400 95L540 140V220H0Z" fill="#F8D8B6" opacity="0.45" />
        
        {/* Waterfall Stream */}
        <path d="M230 110V180C230 190 235 200 240 220H220V110H230Z" fill="#FEECC8" opacity="0.8" />

        {/* Dense Sal Forest Trees */}
        <g fill="#D76B66" opacity="0.8">
          {[20, 60, 100, 140, 175].map((x, i) => (
            <circle key={i} cx={x + 15} cy="175" r="22" />
          ))}
        </g>

        {/* Layer 2: Haribaldevjew Temple Shikhara */}
        <g transform="translate(280, 45)">
          <path
            d="M50 175V100C50 68 70 38 90 24C110 38 130 68 130 100V175H50Z"
            fill="#B54047"
          />
          <path d="M64 175V75C72 62 80 50 90 40C100 50 108 62 116 75V175H64Z" fill="#F4BC7C" opacity="0.85" />
          <ellipse cx="90" cy="22" rx="15" ry="4" fill="#F4BC7C" />
          <path d="M90 16L106 20L90 24V16Z" fill="#E53E3E" />
          
          {/* Mayurbhanj Royal Palace Arched Hall */}
          <path d="M130 175V130H220V175H130Z" fill="#8A2C31" />
          {[140, 165, 190].map((x, i) => (
            <path key={i} d={`M${x} 175V148C${x} 142 ${x + 16} 142 ${x + 16} 148V175H${x}Z`} fill="#FEECC8" />
          ))}
        </g>
      </svg>
    );
  }

  // 11. BARGARH (Gandhamardan Hills & Nrusinghanath / Dhanu Yatra)
  if (normId.includes('bargarh')) {
    return (
      <BargarhArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 12. BALANGIR (Harishankar Waterfall & Patneswari Shrine)
  if (normId.includes('balangir') || normId.includes('bolangir')) {
    return (
      <BalangirArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 13. ANGUL (Satkosia Gorge on Mahanadi & Budhi Thakurani)
  if (normId.includes('angul') || normId.includes('anugul')) {
    return (
      <AngulArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 14. DHENKANAL (Kapilash Mountain Temple & Joranda Mahima Gadi)
  if (normId.includes('dhenkanal')) {
    return (
      <DhenkanalArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 15. KENDRAPARA (Bhitarkanika Mangroves & Tulasi Kshetra Baladevjew)
  if (normId.includes('kendrapara')) {
    return (
      <KendraparaArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 16. JAGATSINGHPUR (Maa Sarala Jhankad Peetha & Paradip Lighthouse)
  if (normId.includes('jagatsinghpur') || normId.includes('paradip')) {
    return (
      <JagatsinghpurArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 17. JAJPUR (Biraja Temple & Baitarani River Dasaswamedha Ghat)
  if (normId.includes('jajpur') || normId.includes('biraja')) {
    return (
      <JajpurArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 18. BHADRAK (Baba Akhandalamani Aradi & Maa Bhadrakali)
  if (normId.includes('bhadrak') || normId.includes('aradi')) {
    return (
      <BhadrakArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 19. KEONJHAR (Sanaghagara / Badaghagara Falls & Ghatagaon Maa Tarini)
  if (normId.includes('keonjhar') || normId.includes('kendujhar') || normId.includes('tarini')) {
    return (
      <KeonjharArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 20. JHARSUGUDA (Jhadeswar Shiva Temple & Ib River Valley)
  if (normId.includes('jharsuguda')) {
    return (
      <JharsugudaArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 21. DEOGARH / DEBAGARH (Pradhanpat Waterfalls & Bamanda Royal Palace)
  if (normId.includes('deogarh') || normId.includes('debagarh')) {
    return (
      <DeogarhArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 22. SUBARNAPUR / SONEPUR (Mahanadi-Tel River Confluence & Sureswari Temple)
  if (normId.includes('subarnapur') || normId.includes('sonepur')) {
    return (
      <SubarnapurArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 23. BOUDH (Ancient Star-Shaped Ramanath Temples & Meditating Buddha)
  if (normId.includes('boudh') || normId.includes('baudh')) {
    return (
      <BoudhArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 24. NAYAGARH (Sharanakula Ladubaba Shiva Peetha & Rukuni Hills)
  if (normId.includes('nayagarh') || normId.includes('sharanakula')) {
    return (
      <NayagarhArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 25. KANDHAMAL (Daringbadi Hill Resort, Pine Groves, Mist & Waterfalls)
  if (normId.includes('kandhamal') || normId.includes('daringbadi') || normId.includes('phulbani')) {
    return (
      <KandhamalArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 26. RAYAGADA (Maa Majhighariani Shrine & Nagavali Suspension Bridge)
  if (normId.includes('rayagada')) {
    return (
      <RayagadaArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 27. NABARANGPUR (Indravati River Plateau & Maa Bhandargharani)
  if (normId.includes('nabarangpur') || normId.includes('nowrangpur')) {
    return (
      <NabarangpurArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 28. MALKANGIRI (Balimela Dam Reservoir & Bonda Valley Hills)
  if (normId.includes('malkangiri') || normId.includes('balimela')) {
    return (
      <MalkangiriArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 29. NUAPADA (Patora Yogeswar Shiva Temple & Sunabeda High Plateau)
  if (normId.includes('nuapada') || normId.includes('sunabeda')) {
    return (
      <NuapadaArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 30. KALAHANDI (Maa Manikeswari Chhatar Yatra & Asurgarh Fort)
  if (normId.includes('kalahandi') || normId.includes('bhawanipatna')) {
    return (
      <KalahandiArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // 31. GAJAPATI (Mount Mahendragiri Peak & Parala Palace)
  if (normId.includes('gajapati') || normId.includes('paralakhemundi') || normId.includes('mahendragiri')) {
    return (
      <GajapatiArt className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`} />
    );
  }

  // KHORDHA (If not caught by bhubaneswar)
  if (normId.includes('khordha') || normId.includes('khurda')) {
    return (
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
        preserveAspectRatio="xMaxYMax meet"
      >
        <path d="M20 220V135L40 90L60 135V220H20Z" fill="#F8D8B6" opacity="0.6" />
        <path d="M80 220V110H130V220H80Z" fill="#F8D8B6" opacity="0.5" />
        <path d="M0 220V155H210V220H0Z" fill="#E2897C" />
        {[10, 38, 66, 94, 122, 150, 178].map((x, i) => (
          <path key={i} d={`M${x} 220V180C${x} 172 ${x + 18} 172 ${x + 18} 180V220H${x}Z`} fill="#B9484F" opacity="0.8" />
        ))}
        {/* Mukteshwar Torana */}
        <g transform="translate(195, 85)">
          <rect x="0" y="45" width="14" height="90" fill="#B54047" />
          <rect x="95" y="45" width="14" height="90" fill="#B54047" />
          <path d="M5 40C5 -5 104 -5 104 40" stroke="#B54047" strokeWidth="14" fill="none" />
          <path d="M5 40C5 -5 104 -5 104 40" stroke="#F4BC7C" strokeWidth="3" fill="none" />
          <circle cx="54.5" cy="5" r="9" fill="#F4BC7C" />
        </g>
        {/* Lingaraj Shikhara */}
        <path d="M320 220V110C320 70 342 32 365 16C388 32 410 70 410 110V220H320Z" fill="#B54047" />
        <ellipse cx="365" cy="14" rx="18" ry="5" fill="#F4BC7C" />
        <line x1="365" y1="9" x2="365" y2="-4" stroke="#F4BC7C" strokeWidth="2.5" />
        <path d="M358 0C362 5 368 5 372 0" stroke="#F4BC7C" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  // SUNDARGARH (If not caught by rourkela)
  if (normId.includes('sundargarh')) {
    return (
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
        preserveAspectRatio="xMaxYMax meet"
      >
        <path d="M10 220C60 150 160 150 210 220H10Z" fill="#F8D8B6" opacity="0.5" />
        <path d="M190 220C250 130 360 130 420 220H190Z" fill="#F8D8B6" opacity="0.4" />
        <path d="M0 220V155H190V220H0Z" fill="#E2897C" />
        {[10, 36, 62, 88, 114, 140, 166].map((x, i) => (
          <path key={i} d={`M${x} 220V180C${x} 172 ${x + 18} 172 ${x + 18} 180V220H${x}Z`} fill="#B54047" />
        ))}
        {/* Hanuman Vatika 75ft Statue */}
        <g transform="translate(230, 25)">
          <rect x="40" y="150" width="70" height="45" rx="3" fill="#B54047" />
          <path d="M62 145V90C55 85 50 78 50 68C50 55 60 45 75 45C90 45 100 55 100 68C100 78 95 85 88 90V145H62Z" fill="#9E353B" />
          <path d="M66 45L75 25L84 45H66Z" fill="#F4BC7C" />
          <rect x="98" y="55" width="6" height="90" fill="#F4BC7C" />
          <ellipse cx="101" cy="52" rx="10" ry="12" fill="#B54047" />
        </g>
        {/* Vedavyasa Confluence Shikhara */}
        <path d="M360 220V130C360 90 380 50 400 35C420 50 440 90 440 130V220H360Z" fill="#D76B66" />
        <ellipse cx="400" cy="32" rx="15" ry="4" fill="#F4BC7C" />
      </svg>
    );
  }

  // DEFAULT ODISHA HERITAGE MONUMENT (Quintessential Kalinga Deula, Arcade & Sacred Palms)
  return (
    <svg
      viewBox="0 0 540 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full object-cover object-bottom select-none pointer-events-none ${className}`}
      preserveAspectRatio="xMaxYMax meet"
    >
      {/* Background Skylines */}
      <path d="M20 220V125H60V220H20Z" fill="#F8D8B6" opacity="0.6" />
      <path d="M60 220V95H105V220H60Z" fill="#F8D8B6" opacity="0.5" />
      <path d="M105 220V140H145V220H105Z" fill="#F8D8B6" opacity="0.6" />
      <path d="M460 220V110H505V220H460Z" fill="#F4CCA4" opacity="0.5" />

      {/* Arcade Gallery */}
      <path d="M0 220V152H240V220H0Z" fill="#E2897C" />
      {[10, 36, 62, 88, 114, 140, 166, 192].map((x, i) => (
        <path
          key={i}
          d={`M${x} 220V178C${x} 170 ${x + 18} 170 ${x + 18} 178V220H${x}Z`}
          fill="#B9484F"
          opacity="0.8"
        />
      ))}

      {/* Main Kalinga Temple Shikhara */}
      <path
        d="M260 220V105C260 70 282 35 305 22C328 35 350 70 350 105V220H260Z"
        fill="#B54047"
      />
      <path d="M276 220V60C285 48 295 38 305 30C315 38 325 48 334 60V220H276Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="305" cy="20" rx="16" ry="5" fill="#F4BC7C" />
      <path d="M305 14L322 18L305 22V14Z" fill="#E53E3E" />

      {/* Porch / Gateway */}
      <rect x="355" y="125" width="85" height="95" rx="3" fill="#A8373E" />
      <rect x="363" y="132" width="69" height="10" fill="#F6BC6D" />
      <path d="M378 220V165C378 154 418 154 418 165V220H378Z" fill="#FDF3DA" />

      {/* Sun Pillar on right */}
      <rect x="460" y="65" width="8" height="155" fill="#B54047" />
      <circle cx="464" cy="55" r="5" fill="#F6BC6D" />
    </svg>
  );
};
