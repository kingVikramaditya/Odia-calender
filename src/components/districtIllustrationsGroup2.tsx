import React from 'react';

/**
 * Recognizable minimal illustration art for Odisha districts 11-20:
 * 11. Bargarh (Gandhamardan Hills & Nrusinghanath / Dhanu Yatra)
 * 12. Balangir (Harishankar Waterfall & Patneswari)
 * 13. Angul (Satkosia Gorge on Mahanadi & Budhi Thakurani)
 * 14. Dhenkanal (Kapilash Mountain Temple & Joranda Mahima Gadi)
 * 15. Kendrapara (Bhitarkanika Mangroves & Tulasi Kshetra Baladevjew)
 * 16. Jagatsinghpur (Maa Sarala Temple at Jhankad & Paradip Lighthouse)
 * 17. Jajpur (Biraja Temple & Baitarani River Ghats)
 * 18. Bhadrak (Baba Akhandalamani Aradi & Maa Bhadrakali)
 * 19. Keonjhar (Sanaghagara / Badaghagara Falls & Maa Tarini Ghatagaon)
 * 20. Jharsuguda (Jhadeswar Shiva & Ib River Valley)
 */

interface DistrictArtProps {
  className?: string;
}

// 11. Bargarh
export const BargarhArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Gandhamardan Mountain silhouette */}
    <path d="M0 220L100 110L220 180L340 90L460 170L540 120V220H0Z" fill="#F8D8B6" opacity="0.45" />
    <path d="M60 220L170 130L290 190L410 115L510 175V220H60Z" fill="#EAA580" opacity="0.4" />
    
    {/* Dhanu Yatra Royal Gateway / Palace set */}
    <path d="M0 220V155H190V220H0Z" fill="#E2897C" />
    {[10, 36, 62, 88, 114, 140, 166].map((x, i) => (
      <path key={i} d={`M${x} 220V180C${x} 172 ${x + 18} 172 ${x + 18} 180V220H${x}Z`} fill="#B54047" />
    ))}

    {/* Nrusinghanath Temple Shikhara */}
    <g transform="translate(230, 40)">
      <path d="M40 180V80C40 48 60 22 80 10C100 22 120 48 120 80V180H40Z" fill="#B54047" />
      <path d="M52 180V60C62 48 70 38 80 28C90 38 98 48 108 60V180H52Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="80" cy="8" rx="14" ry="4" fill="#F4BC7C" />
      <path d="M80 2L96 6L80 10V2Z" fill="#E53E3E" />
      {/* Stream at foothills */}
      <path d="M120 180V140L160 110H200L225 140V180H120Z" fill="#D76B66" />
    </g>

    {/* Lush Green Paddy stalks representation */}
    <g fill="#A8373E" opacity="0.85">
      {[420, 445, 470, 495, 520].map((x, i) => (
        <path key={i} d={`M${x} 220L${x + 8} 165L${x + 16} 220H${x}Z`} />
      ))}
    </g>
  </svg>
);

// 12. Balangir
export const BalangirArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Harishankar waterfall rushing down rocky Gandhamardan cliff */}
    <path d="M20 220L90 100L180 170L300 85L430 160L540 105V220H20Z" fill="#F8D8B6" opacity="0.5" />
    
    {/* Perennial Waterfall cascade */}
    <path d="M150 95V170C150 185 160 200 170 220H140V95H150Z" fill="#FFF2DC" opacity="0.85" />
    <path d="M142 110H160V130H142V110Z" fill="#F4BC7C" opacity="0.6" />

    {/* Ancient Patneswari / Harishankar Shrine */}
    <g transform="translate(230, 45)">
      <path d="M40 175V90C40 60 58 35 75 22C92 35 110 60 110 90V175H40Z" fill="#B54047" />
      <path d="M52 175V70C60 56 68 45 75 35C82 45 90 56 98 70V175H52Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="75" cy="20" rx="14" ry="4" fill="#F4BC7C" />
      <path d="M75 14L90 18L75 22V14Z" fill="#E53E3E" />
      {/* Front Mandapa */}
      <path d="M110 175V125L145 95H180L205 125V175H110Z" fill="#D76B66" />
      <rect x="130" y="130" width="55" height="6" fill="#F4BC7C" />
    </g>

    {/* Medicinal Herbal Grove / Sal Trees */}
    <g fill="#D76B66" opacity="0.75">
      {[10, 45, 80, 115].map((x, i) => (
        <circle key={i} cx={x + 12} cy="180" r="18" />
      ))}
    </g>
  </svg>
);

// 13. Angul
export const AngulArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Majestic Satkosia Gorge Mountain ridge */}
    <path d="M0 220L90 90L200 175L310 80L430 160L540 90V220H0Z" fill="#F8D8B6" opacity="0.5" />
    
    {/* Deep Mahanadi Gorge Canyon */}
    <path d="M100 220L190 160C250 170 320 160 380 220H100Z" fill="#EAA580" opacity="0.6" />
    
    {/* Wildlife & River Valley flora */}
    <g fill="#B54047" opacity="0.75">
      {[20, 60, 100, 140].map((x, i) => (
        <path key={i} d={`M${x} 220L${x + 12} 160L${x + 24} 220H${x}Z`} />
      ))}
    </g>

    {/* Budhi Thakurani Hilltop Shrine */}
    <g transform="translate(290, 40)">
      <path d="M30 180V100C30 70 48 40 68 28C88 40 106 70 106 100V180H30Z" fill="#B54047" />
      <ellipse cx="68" cy="26" rx="14" ry="4" fill="#F4BC7C" />
      <path d="M68 20L84 24L68 28V20Z" fill="#E53E3E" />
      <path d="M106 180V135H180V180H106Z" fill="#8A2C31" />
      {[115, 140, 165].map((x, i) => (
        <path key={i} d={`M${x} 180V155C${x} 148 ${x + 14} 148 ${x + 14} 155V180H${x}Z`} fill="#FEECC8" />
      ))}
    </g>

    {/* Flying Birds over the gorge */}
    <path d="M150 60Q160 50 170 60Q180 50 190 60" stroke="#B54047" strokeWidth="2.5" fill="none" />
    <path d="M210 45Q218 37 226 45Q234 37 242 45" stroke="#B54047" strokeWidth="2" fill="none" />
  </svg>
);

// 14. Dhenkanal
export const DhenkanalArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Kapilash Mountain High Peak */}
    <path d="M30 220L150 70L280 185L410 80L520 170V220H30Z" fill="#F8D8B6" opacity="0.45" />

    {/* Joranda Mahima Gadi Sacred Dhuni Mandir & Flag */}
    <g transform="translate(40, 90)">
      <path d="M10 130V65H80V130H10Z" fill="#D76B66" />
      <path d="M0 65H90L45 20L0 65Z" fill="#B54047" />
      <rect x="42" y="5" width="6" height="18" fill="#F4BC7C" />
      <path d="M48 5L68 10L48 15V5Z" fill="#E53E3E" />
    </g>

    {/* Kapilash Lord Chandrasekhar Peak Temple */}
    <g transform="translate(260, 30)">
      <path d="M40 190V90C40 55 60 25 80 12C100 25 120 55 120 90V190H40Z" fill="#B54047" />
      <path d="M52 190V65C62 50 70 38 80 28C90 38 98 50 108 65V190H52Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="80" cy="10" rx="15" ry="4" fill="#F4BC7C" />
      {/* Trishul atop Shiva Temple */}
      <line x1="80" y1="10" x2="80" y2="-4" stroke="#F4BC7C" strokeWidth="2.5" />
      <path d="M74 0C77 4 83 4 86 0" stroke="#F4BC7C" strokeWidth="2" fill="none" />
      {/* 1352 Pilgrim Steps Silhouette */}
      <path d="M120 190V135L160 100H200L230 135V190H120Z" fill="#8A2C31" />
    </g>
  </svg>
);

// 15. Kendrapara
export const KendraparaArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Bhitarkanika Mangrove Tidal Creeks & Estuary */}
    <path d="M0 220C90 170 190 200 290 160C380 120 460 160 540 130V220H0Z" fill="#F8D8B6" opacity="0.5" />
    
    {/* Dense Mangrove aerial roots & trees */}
    <g fill="#D76B66" opacity="0.85">
      {[15, 55, 95, 135, 175].map((x, i) => (
        <circle key={i} cx={x + 15} cy="175" r="22" />
      ))}
    </g>

    {/* Tulasi Kshetra Baladevjew Temple */}
    <g transform="translate(270, 35)">
      <path d="M40 185V85C40 50 62 25 85 12C108 25 130 50 130 85V185H40Z" fill="#B54047" />
      <path d="M54 185V65C64 50 74 38 85 28C96 38 106 50 116 65V185H54Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="85" cy="10" rx="16" ry="5" fill="#F4BC7C" />
      <path d="M85 4L102 8L85 12V4Z" fill="#E53E3E" />
      
      {/* Front Jagamohan */}
      <path d="M130 185V125L165 90H210L235 125V185H130Z" fill="#8A2C31" />
      <rect x="150" y="130" width="70" height="7" fill="#F4BC7C" />
    </g>

    {/* Estuarine Crocodile / Water Ripple Silhouette */}
    <path d="M70 205C90 198 120 198 140 205H70Z" fill="#8A2C31" opacity="0.75" />
  </svg>
);

// 16. Jagatsinghpur
export const JagatsinghpurArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Coastal Sea Horizon at Paradip Port */}
    <path d="M0 220V160C80 145 160 175 250 155C340 135 440 165 540 150V220H0Z" fill="#F8D8B6" opacity="0.5" />
    
    {/* Maa Sarala Jhankad Peetha Sanctum */}
    <g transform="translate(90, 45)">
      <path d="M40 175V85C40 55 60 28 80 16C100 28 120 55 120 85V175H40Z" fill="#B54047" />
      <path d="M52 175V65C62 52 70 40 80 30C90 40 98 52 108 65V175H52Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="80" cy="14" rx="14" ry="4" fill="#F4BC7C" />
      <path d="M80 8L96 12L80 16V8Z" fill="#E53E3E" />
      {/* Front Natamandapa */}
      <path d="M120 175V125H190V175H120Z" fill="#D76B66" />
      <rect x="130" y="132" width="50" height="6" fill="#F4BC7C" />
    </g>

    {/* Paradip Port Modern Lighthouse & Ocean Ships */}
    <g transform="translate(380, 50)">
      <path d="M20 170L30 35H55L65 170H20Z" fill="#FEECC8" />
      <rect x="23" y="130" width="39" height="20" fill="#B54047" />
      <rect x="27" y="80" width="31" height="20" fill="#B54047" />
      <circle cx="42.5" cy="20" r="10" fill="#F4BC7C" />
      <rect x="25" y="30" width="35" height="8" fill="#8A2C31" />
    </g>
  </svg>
);

// 17. Jajpur
export const JajpurArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Holy Baitarani River & Dasaswamedha Ghats */}
    <path d="M0 220V155H210V220H0Z" fill="#E2897C" />
    {[10, 38, 66, 94, 122, 150, 178].map((x, i) => (
      <path key={i} d={`M${x} 220V180C${x} 172 ${x + 18} 172 ${x + 18} 180V220H${x}Z`} fill="#B9484F" />
    ))}

    {/* Ancient Biraja Shakti Temple Shikhara */}
    <g transform="translate(230, 30)">
      <path d="M40 190V85C40 48 62 22 85 10C108 22 130 48 130 85V190H40Z" fill="#B54047" />
      <path d="M54 190V65C65 50 74 38 85 28C96 38 105 50 116 65V190H54Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="85" cy="8" rx="16" ry="5" fill="#F4BC7C" />
      <path d="M85 2L102 6L85 10V2Z" fill="#E53E3E" />
      
      {/* Subha Stambha (Garuda Pillar) */}
      <rect x="155" y="45" width="8" height="145" fill="#B54047" />
      <circle cx="159" cy="38" r="6" fill="#F4BC7C" />
      {/* Side Mandapa */}
      <path d="M175 190V130H245V190H175Z" fill="#D76B66" />
    </g>

    {/* River Wave Patterns */}
    <path d="M380 220C410 212 450 212 480 220H380Z" fill="#B54047" opacity="0.7" />
  </svg>
);

// 18. Bhadrak
export const BhadrakArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Salandi River bank silhouette */}
    <path d="M0 220V160H220V220H0Z" fill="#E2897C" />
    {[15, 45, 75, 105, 135, 165, 195].map((x, i) => (
      <path key={i} d={`M${x} 220V182C${x} 174 ${x + 18} 174 ${x + 18} 182V220H${x}Z`} fill="#B9484F" />
    ))}

    {/* Aradi Baba Akhandalamani Sacred Shiva Deula */}
    <g transform="translate(250, 35)">
      <path d="M40 185V85C40 50 62 25 85 12C108 25 130 50 130 85V185H40Z" fill="#B54047" />
      <path d="M54 185V65C65 52 74 40 85 30C96 40 105 52 116 65V185H54Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="85" cy="10" rx="16" ry="5" fill="#F4BC7C" />
      {/* Trishul & Damaru */}
      <line x1="85" y1="10" x2="85" y2="-4" stroke="#F4BC7C" strokeWidth="2.5" />
      <path d="M79 0C82 4 88 4 91 0" stroke="#F4BC7C" strokeWidth="2" fill="none" />

      {/* Bhadrakali Temple Canopy */}
      <path d="M140 185V120L180 85H225L255 120V185H140Z" fill="#8A2C31" />
      <rect x="160" y="125" width="70" height="7" fill="#F4BC7C" />
    </g>

    {/* Sacred Salandi Stream waves */}
    <path d="M430 220C455 210 495 210 520 220H430Z" fill="#B54047" opacity="0.6" />
  </svg>
);

// 19. Keonjhar
export const KeonjharArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Sanaghagara & Badaghagara Cascading Waterfalls & Plateau */}
    <path d="M10 220L90 90L200 170L320 80L440 160L540 95V220H10Z" fill="#F8D8B6" opacity="0.45" />

    {/* Twin Waterfall Rushes */}
    <path d="M140 90V165C140 180 148 195 155 220H130V90H140Z" fill="#FFF2DC" opacity="0.9" />

    {/* Ghatagaon Maa Tarini Temple with Sal tree forest */}
    <g transform="translate(240, 45)">
      {/* Sal Forest Backdrop */}
      <g fill="#D76B66" opacity="0.8">
        {[0, 30, 60].map((x, i) => (
          <circle key={i} cx={x + 15} cy="80" r="18" />
        ))}
      </g>
      
      {/* Maa Tarini Shrine */}
      <path d="M80 175V95C80 65 98 40 115 28C132 40 150 65 150 95V175H80Z" fill="#B54047" />
      <ellipse cx="115" cy="26" rx="14" ry="4" fill="#F4BC7C" />
      <path d="M115 20L131 24L115 28V20Z" fill="#E53E3E" />
      {/* Offering Mandapa */}
      <path d="M150 175V130H220V175H150Z" fill="#8A2C31" />
      {[160, 185, 210].map((x, i) => (
        <rect key={i} x={x} y="145" width="12" height="30" rx="1" fill="#FEECC8" />
      ))}
    </g>
  </svg>
);

// 20. Jharsuguda
export const JharsugudaArt: React.FC<DistrictArtProps> = ({ className }) => (
  <svg viewBox="0 0 540 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMaxYMax meet">
    {/* Ib River Valley & Open Plateaus */}
    <path d="M20 220C90 140 220 140 290 220H20Z" fill="#F8D8B6" opacity="0.5" />
    <path d="M240 220C320 120 440 120 520 220H240Z" fill="#EAA580" opacity="0.4" />

    {/* Colonnade gallery */}
    <path d="M0 220V155H180V220H0Z" fill="#E2897C" />
    {[10, 36, 62, 88, 114, 140].map((x, i) => (
      <path key={i} d={`M${x} 220V180C${x} 172 ${x + 18} 172 ${x + 18} 180V220H${x}Z`} fill="#B54047" />
    ))}

    {/* Historic Jhadeswar Shiva Temple */}
    <g transform="translate(240, 40)">
      <path d="M40 180V85C40 52 60 25 80 12C100 25 120 52 120 85V180H40Z" fill="#B54047" />
      <path d="M52 180V65C62 50 70 38 80 28C90 38 98 50 108 65V180H52Z" fill="#F4BC7C" opacity="0.85" />
      <ellipse cx="80" cy="10" rx="14" ry="4" fill="#F4BC7C" />
      {/* Trishul */}
      <line x1="80" y1="10" x2="80" y2="-4" stroke="#F4BC7C" strokeWidth="2.5" />
      <path d="M74 0C77 4 83 4 86 0" stroke="#F4BC7C" strokeWidth="2" fill="none" />
      {/* Front Entrance */}
      <path d="M120 180V130H195V180H120Z" fill="#8A2C31" />
    </g>

    {/* Ib River Waves */}
    <path d="M380 220C410 212 445 212 475 220H380Z" fill="#B54047" opacity="0.65" />
  </svg>
);
