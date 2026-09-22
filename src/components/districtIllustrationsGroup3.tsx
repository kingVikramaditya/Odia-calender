import React from 'react';

/**
 * Recognizable minimal illustration art for Odisha districts 21-30:
 * 21. Deogarh (Pradhanpat Cascading Waterfalls & Bamanda Royal Palace)
 * 22. Subarnapur / Sonepur (Mahanadi & Tel River Confluence / Sureswari Temple)
 * 23. Boudh (Ancient Star-shaped Ramanath Temples & Colossal Buddha Statue)
 * 24. Nayagarh (Sharanakula Ladubaba Shiva Peetha & Rukuni Hills)
 * 25. Kandhamal (Daringbadi Hill Resort, Pine Groves, Mist & Waterfalls)
 * 26. Rayagada (Maa Majhighariani Temple & Nagavali Suspension Bridge)
 * 27. Nabarangpur (Indravati River Basin & Maa Bhandargharani)
 * 28. Malkangiri (Balimela Dam Reservoir & Bonda Tribal Ghats)
 * 29. Nuapada (Patora Yogeswar Shiva Temple & Sunabeda High Plateau)
 * 30. Kalahandi & Gajapati:
 *     - Kalahandi (Manikeswari Chhatar Yatra & Asurgarh Fort)
 *     - Gajapati (Mythological Mount Mahendragiri & Parala Maharaja Palace)
 */

interface DistrictArtProps {
  className?: string;
}

// 21. Deogarh
export const DeogarhArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Pradhanpat Multi-tiered Waterfall on dramatic cliff */}
    <path d="M0 220L100 80L210 170L320 75L440 160L540 85V220H0Z" fill="#F8D8B6" opacity="0.45" />

    {/* Grand Pradhanpat Water Cascade */}
    <path d="M165 78V155C165 175 175 195 185 220H150V78H165Z" fill="#FFF2DC" opacity="0.95" />
    <path d="M155 100H180V125H155V100Z" fill="#F4BC7C" opacity="0.55" />

    {/* Bamanda Royal Palace & Pavilion */}
    <g transform="translate(250, 45)">
      <path d="M40 175V115H170V175H40Z" fill="#B54047" />
      <path d="M30 115H180L105 80L30 115Z" fill="#8A2C31" />
      {/* Palace Domes */}
      <circle cx="105" cy="74" r="10" fill="#F4BC7C" />
      <circle cx="60" cy="108" r="8" fill="#F4BC7C" />
      <circle cx="150" cy="108" r="8" fill="#F4BC7C" />
      {[50, 85, 120, 155].map((x, i) => (
        <path key={i} d={`M${x} 175V145C${x} 138 ${x + 14} 138 ${x + 14} 145V175H${x}Z`} fill="#FEECC8" />
      ))}
    </g>

    {/* Dense Greenery / Pine / Sal foliage */}
    <g fill="#D76B66" opacity="0.8">
      {[20, 60, 100].map((x, i) => (
        <circle key={i} cx={x + 15} cy="180" r="20" />
      ))}
    </g>
  </svg>
);

// 22. Subarnapur (Sonepur)
export const SubarnapurArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Twin River Confluence (Mahanadi & Tel River) */}
    <path d="M0 220V155H220V220H0Z" fill="#E2897C" />
    {[15, 45, 75, 105, 135, 165, 195].map((x, i) => (
      <path key={i} d={`M${x} 220V182C${x} 174 ${x + 18} 174 ${x + 18} 182V220H${x}Z`} fill="#B9484F" />
    ))}

    {/* Revered Sureswari Temple & Second Varanasi Spire */}
    <g transform="translate(250, 35)">
      <path d="M40 185V85C40 48 62 22 85 10C108 22 130 48 130 85V185H40Z" fill="#B54047" />
      <path d="M54 185V65C65 50 74 38 85 28C96 38 105 50 116 65V185H54Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="85" cy="8" rx="16" ry="5" fill="#F4BC7C" />
      <path d="M85 2L102 6L85 10V2Z" fill="#E53E3E" />
      {/* Front Hall */}
      <path d="M130 185V130H200V185H130Z" fill="#8A2C31" />
    </g>

    {/* Confluence Waters with Boita silhouettes */}
    <path d="M380 220C410 210 445 210 475 220H380Z" fill="#B54047" opacity="0.7" />
    <path d="M460 220C485 212 515 212 535 220H460Z" fill="#E2897C" opacity="0.6" />
  </svg>
);

// 23. Boudh
export const BoudhArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Mahanadi Riverbank Horizon */}
    <path d="M0 220C70 150 180 150 250 220H0Z" fill="#F8D8B6" opacity="0.5" />
    
    {/* Colossal Meditating Buddha Statue */}
    <g transform="translate(80, 55)">
      {/* Lotus Pedestal */}
      <ellipse cx="60" cy="145" rx="45" ry="12" fill="#B54047" />
      {/* Seated Buddha Silhouette in Padmasana */}
      <path d="M30 145C30 115 45 95 60 95C75 95 90 115 90 145H30Z" fill="#9E353B" />
      {/* Head & Ushnisha Crown */}
      <circle cx="60" cy="82" r="14" fill="#9E353B" />
      <ellipse cx="60" cy="65" rx="5" ry="7" fill="#F4BC7C" />
      {/* Prabhavali (Halo) */}
      <circle cx="60" cy="82" r="24" stroke="#F4BC7C" strokeWidth="2.5" fill="none" />
    </g>

    {/* Unique 8-Pointed Star-shaped Ramanath Temple Shikhara */}
    <g transform="translate(290, 30)">
      <path d="M40 190V90L60 70L80 90L100 70L120 90V190H40Z" fill="#B54047" />
      <path d="M52 190V75C62 58 70 42 80 30C90 42 98 58 108 75V190H52Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="80" cy="12" rx="16" ry="5" fill="#F4BC7C" />
      {/* Trishul */}
      <line x1="80" y1="12" x2="80" y2="-4" stroke="#F4BC7C" strokeWidth="2.5" />
      <path d="M74 0C77 4 83 4 86 0" stroke="#F4BC7C" strokeWidth="2" fill="none" />
      {/* Mandapa */}
      <path d="M120 190V135H180V190H120Z" fill="#8A2C31" />
    </g>
  </svg>
);

// 24. Nayagarh
export const NayagarhArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Rukuni Hills & Green Countryside */}
    <path d="M0 220L80 110L180 180L300 90L420 170L540 100V220H0Z" fill="#F8D8B6" opacity="0.45" />

    {/* Sharanakula Ladubaba Shiva Temple */}
    <g transform="translate(220, 35)">
      <path d="M40 185V85C40 50 62 25 85 12C108 25 130 50 130 85V185H40Z" fill="#B54047" />
      <path d="M54 185V65C65 52 74 40 85 30C96 40 105 52 116 65V185H54Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="85" cy="10" rx="16" ry="5" fill="#F4BC7C" />
      {/* Trishul */}
      <line x1="85" y1="10" x2="85" y2="-4" stroke="#F4BC7C" strokeWidth="2.5" />
      <path d="M79 0C82 4 88 4 91 0" stroke="#F4BC7C" strokeWidth="2" fill="none" />
      
      {/* Front Jagamohan */}
      <path d="M130 185V125L165 95H205L230 125V185H130Z" fill="#8A2C31" />
      <rect x="145" y="130" width="70" height="7" fill="#F4BC7C" />
    </g>

    {/* Chenapoda earthen kiln emblem / motif */}
    <g transform="translate(60, 130)">
      <ellipse cx="50" cy="55" rx="35" ry="12" fill="#B54047" />
      <path d="M25 55C25 40 36 28 50 28C64 28 75 40 75 55H25Z" fill="#8A2C31" />
      <circle cx="50" cy="22" r="6" fill="#F4BC7C" />
    </g>
  </svg>
);

// 25. Kandhamal
export const KandhamalArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Daringbadi (Kashmir of Odisha) Rolling Mountain Ridges */}
    <path d="M0 220L90 85L190 170L300 70L410 160L540 80V220H0Z" fill="#F8D8B6" opacity="0.4" />
    <path d="M50 220L150 110L260 180L360 95L470 175V220H50Z" fill="#EAA580" opacity="0.5" />

    {/* Tall Pine Forest Trees of Daringbadi */}
    <g fill="#B54047">
      {[25, 70, 115, 160, 205].map((x, i) => (
        <g key={i}>
          <rect x={x + 10} y="150" width="4" height="70" fill="#782329" />
          <polygon points={`${x + 12},85 ${x - 4},130 ${x + 28},130`} fill="#B54047" />
          <polygon points={`${x + 12},115 ${x - 8},160 ${x + 32},160`} fill="#8A2C31" />
        </g>
      ))}
    </g>

    {/* Midori / Hill resort cottages & Watch tower */}
    <g transform="translate(320, 50)">
      <path d="M30 170L40 70H65L75 170H30Z" fill="#B54047" />
      <rect x="25" y="65" width="55" height="12" rx="2" fill="#F4BC7C" />
      <rect x="32" y="50" width="41" height="15" fill="#8A2C31" />
      <path d="M32 50L52.5 30L73 50H32Z" fill="#B54047" />

      {/* Hilltop Cottage */}
      <path d="M90 170V120H150V170H90Z" fill="#8A2C31" />
      <polygon points="120,95 85,120 155,120" fill="#F4BC7C" />
    </g>

    {/* Soft Mist ribbons */}
    <path d="M120 80Q200 65 280 80" stroke="#FFF2DC" strokeWidth="3" opacity="0.6" fill="none" />
    <path d="M250 95Q320 85 400 95" stroke="#FFF2DC" strokeWidth="2.5" opacity="0.5" fill="none" />
  </svg>
);

// 26. Rayagada
export const RayagadaArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Nagavali River Valley & Mountain ridge */}
    <path d="M0 220L90 100L210 180L330 85L450 170L540 100V220H0Z" fill="#F8D8B6" opacity="0.45" />

    {/* Famous Nagavali River Suspension Bridge (Jhula Pola) */}
    <g transform="translate(20, 105)">
      {/* Left Tower */}
      <rect x="10" y="20" width="12" height="95" fill="#B54047" />
      {/* Right Tower */}
      <rect x="190" y="20" width="12" height="95" fill="#B54047" />
      {/* Suspension Cable */}
      <path d="M16 20Q106 85 196 20" stroke="#F4BC7C" strokeWidth="3.5" fill="none" />
      {/* Bridge Deck */}
      <rect x="0" y="70" width="220" height="7" fill="#8A2C31" />
      {/* Vertical suspenders */}
      {[40, 70, 106, 140, 170].map((x, i) => (
        <line key={i} x1={x} y1="46" x2={x} y2="70" stroke="#F4BC7C" strokeWidth="2" />
      ))}
    </g>

    {/* Maa Majhighariani Revered Shrine */}
    <g transform="translate(270, 35)">
      <path d="M40 185V85C40 50 62 25 85 12C108 25 130 50 130 85V185H40Z" fill="#B54047" />
      <path d="M54 185V65C65 50 74 38 85 28C96 38 105 50 116 65V185H54Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="85" cy="10" rx="16" ry="5" fill="#F4BC7C" />
      <path d="M85 4L102 8L85 12V4Z" fill="#E53E3E" />
      {/* Mandapa */}
      <path d="M130 185V130H210V185H130Z" fill="#8A2C31" />
      {[140, 165, 190].map((x, i) => (
        <rect key={i} x={x} y="145" width="12" height="30" rx="1" fill="#FEECC8" />
      ))}
    </g>

    {/* River Waves below */}
    <path d="M20 220C60 210 110 210 150 220H20Z" fill="#8A2C31" opacity="0.7" />
  </svg>
);

// 27. Nabarangpur
export const NabarangpurArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Indravati River & Highland Plateau */}
    <path d="M0 220L90 110L210 180L330 95L440 170L540 110V220H0Z" fill="#F8D8B6" opacity="0.5" />
    <path d="M60 220L170 120L280 185L390 110L490 175V220H60Z" fill="#EAA580" opacity="0.45" />

    {/* Maa Bhandargharani Temple Sanctuary */}
    <g transform="translate(180, 45)">
      <path d="M50 175V90C50 60 70 35 90 22C110 35 130 60 130 90V175H50Z" fill="#B54047" />
      <path d="M64 175V70C72 56 80 44 90 34C100 44 108 56 116 70V175H64Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="90" cy="20" rx="14" ry="4" fill="#F4BC7C" />
      <path d="M90 14L106 18L90 22V14Z" fill="#E53E3E" />
      {/* Front Entrance */}
      <path d="M130 175V125H200V175H130Z" fill="#8A2C31" />
    </g>

    {/* Fertile Highland Maize & Forest canopies */}
    <g fill="#B54047" opacity="0.8">
      {[15, 45, 75, 105, 135].map((x, i) => (
        <circle key={i} cx={x + 12} cy="180" r="16" />
      ))}
    </g>
    <g fill="#A8373E" opacity="0.85">
      {[410, 440, 470, 500].map((x, i) => (
        <path key={i} d={`M${x} 220L${x + 8} 165L${x + 16} 220H${x}Z`} />
      ))}
    </g>
  </svg>
);

// 28. Malkangiri
export const MalkangiriArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Balimela Reservoir Surrounded by Mist-Clad Bonda Hills */}
    <path d="M0 220L90 85L200 175L310 70L430 160L540 80V220H0Z" fill="#F8D8B6" opacity="0.45" />

    {/* Balimela Dam Dyke & Spillway Gates */}
    <path d="M0 220V165H260V220H0Z" fill="#E2897C" />
    {[10, 36, 62, 88, 114, 140, 166, 192, 218].map((x, i) => (
      <rect key={i} x={x} y="172" width="14" height="48" rx="2" fill="#B54047" />
    ))}

    {/* Satiguda Dam Tower & Reservoir Island Hills */}
    <g transform="translate(290, 45)">
      {/* High Rock Island */}
      <path d="M0 175C30 120 120 120 150 175H0Z" fill="#8A2C31" />
      {/* Lighthouse / Control Tower */}
      <rect x="68" y="70" width="14" height="60" fill="#B54047" />
      <rect x="64" y="65" width="22" height="6" fill="#F4BC7C" />
      <circle cx="75" cy="58" r="6" fill="#F4BC7C" />
    </g>

    {/* Bonda Valley tribal bamboo trees */}
    <g fill="#D76B66">
      {[440, 470, 500].map((x, i) => (
        <path key={i} d={`M${x} 220L${x + 6} 150L${x + 12} 220H${x}Z`} />
      ))}
    </g>
  </svg>
);

// 29. Nuapada
export const NuapadaArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Sunabeda High Plateau & Wildlife Ridge */}
    <path d="M0 220L90 100L200 175L310 85L430 165L540 95V220H0Z" fill="#F8D8B6" opacity="0.45" />

    {/* Patora Yogeswar Shiva Shrine & Dam */}
    <g transform="translate(230, 35)">
      <path d="M40 185V85C40 50 62 25 85 12C108 25 130 50 130 85V185H40Z" fill="#B54047" />
      <path d="M54 185V65C65 52 74 40 85 30C96 40 105 52 116 65V185H54Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="85" cy="10" rx="16" ry="5" fill="#F4BC7C" />
      {/* Trishul */}
      <line x1="85" y1="10" x2="85" y2="-4" stroke="#F4BC7C" strokeWidth="2.5" />
      <path d="M79 0C82 4 88 4 91 0" stroke="#F4BC7C" strokeWidth="2" fill="none" />
      
      {/* Front Hall */}
      <path d="M130 185V125H205V185H130Z" fill="#8A2C31" />
      {[140, 165, 190].map((x, i) => (
        <rect key={i} x={x} y="140" width="12" height="35" rx="1" fill="#FEECC8" />
      ))}
    </g>

    {/* Patora Dam reservoir spillway on left */}
    <path d="M0 220V165H180V220H0Z" fill="#E2897C" />
    {[10, 36, 62, 88, 114, 140].map((x, i) => (
      <path key={i} d={`M${x} 220V182C${x} 174 ${x + 18} 174 ${x + 18} 182V220H${x}Z`} fill="#B54047" />
    ))}
  </svg>
);

// 30. Kalahandi & Gajapati
export const KalahandiArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Asurgarh Fort & Eastern Ghats */}
    <path d="M0 220V150H210V220H0Z" fill="#E2897C" />
    {[0, 26, 52, 78, 104, 130, 156, 182].map((x, i) => (
      <rect key={i} x={x} y="140" width="14" height="12" fill="#B54047" />
    ))}

    {/* Maa Manikeswari Temple Sanctum (Bhawanipatna) */}
    <g transform="translate(230, 35)">
      <path d="M40 185V85C40 50 62 25 85 12C108 25 130 50 130 85V185H40Z" fill="#B54047" />
      <path d="M54 185V65C65 50 74 38 85 28C96 38 105 50 116 65V185H54Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="85" cy="10" rx="16" ry="5" fill="#F4BC7C" />
      <path d="M85 4L102 8L85 12V4Z" fill="#E53E3E" />
      
      {/* Chhatar (Sacred Ceremonial Umbrella) of Chhatar Yatra */}
      <g transform="translate(145, 60)">
        <ellipse cx="35" cy="20" rx="30" ry="12" fill="#F4BC7C" />
        <path d="M10 20C10 8 20 2 35 2C50 2 60 8 60 20H10Z" fill="#B54047" />
        <rect x="33" y="20" width="4" height="105" fill="#8A2C31" />
        {/* Hanging frills */}
        {[15, 25, 35, 45, 55].map((x, i) => (
          <circle key={i} cx={x} cy="24" r="2.5" fill="#FEECC8" />
        ))}
      </g>
    </g>

    {/* Tel River Waves */}
    <path d="M430 220C455 210 495 210 520 220H430Z" fill="#B54047" opacity="0.65" />
  </svg>
);

export const GajapatiArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Mythological Mount Mahendragiri (4,925 ft) Peaks */}
    <path d="M0 220L110 70L220 170L340 55L460 160L540 85V220H0Z" fill="#F8D8B6" opacity="0.4" />
    <path d="M50 220L160 95L270 180L380 75L490 165V220H50Z" fill="#EAA580" opacity="0.45" />

    {/* Ancient Stone Temple of Yudhisthira / Bhima atop Mahendragiri Peak */}
    <g transform="translate(80, 50)">
      <path d="M30 140V80L55 50H85L110 80V140H30Z" fill="#B54047" />
      <rect x="45" y="85" width="50" height="8" fill="#F4BC7C" />
      <ellipse cx="70" cy="46" rx="14" ry="5" fill="#F4BC7C" />
    </g>

    {/* Historic Paralakhemundi Royal Gajapati Palace Gateway & Colonnades */}
    <g transform="translate(240, 45)">
      <path d="M30 175V105H180V175H30Z" fill="#8A2C31" />
      <path d="M20 105H190L105 70L20 105Z" fill="#B54047" />
      <circle cx="105" cy="62" r="10" fill="#F4BC7C" />
      {/* European-Gothic hybrid palace arched windows */}
      {[45, 80, 115, 150].map((x, i) => (
        <path key={i} d={`M${x} 175V135C${x} 125 ${x + 16} 125 ${x + 16} 135V175H${x}Z`} fill="#FEECC8" />
      ))}
    </g>
  </svg>
);
