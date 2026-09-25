import { LOCATIONS } from '../src/data/odiaConstants';
import { calculatePanchang } from '../src/utils/panchangEngine';

const location = LOCATIONS[0]; // Puri

const datesToTest = [
  '2026-09-25', // Ananta Brata / Chaturdashi
  '2026-09-26', // Bhadrava Purnima (Today!)
  '2026-10-10', // Mahalaya Amavasya
  '2026-10-18', // Durga Puja / Ashtami
  '2026-10-20', // Dussehra / Vijaya Dashami
  '2026-10-25', // Kumar Utsav Eve
  '2026-10-26', // Kumar Purnima
  '2026-11-08', // Diwali / Kali Puja
  '2026-11-24', // Kartika Purnima / Boita Bandana
];

console.log('=== REAL ENGINE TEST RESULTS ===\n');

for (const d of datesToTest) {
  const [y, m, dayNum] = d.split('-').map(Number);
  const date = new Date(y, m - 1, dayNum, 6, 0, 0); // 6 AM
  const p = calculatePanchang(date, location);
  
  console.log(`Date: ${p.dateStr} (${p.varaOdia})`);
  console.log(`Solar: ${p.solarMonthNameOdia || p.odiaMonthNameOdia} ${p.odiaDayOfSolarMonthOdia} ଦିନ`);
  console.log(`Lunar: ${p.lunarMonthNameOdia || p.odiaMonthNameOdia} (${p.tithi.pakshaOdia})`);
  console.log(`Tithi: ${p.tithi.nameOdia} (End: ${p.tithi.endTime})`);
  console.log(`Nakshatra: ${p.nakshatra.nameOdia}`);
  console.log(`Events (${p.events.length}):`);
  p.events.forEach(e => console.log(`  - [${e.type}] ${e.titleOdia}`));
  if (p.isGovtHoliday) {
    console.log(`  ★ GOVT HOLIDAY: ${p.govtHolidayInfo?.nameOdia} (${p.govtHolidayInfo?.type})`);
  }
  console.log('--------------------------------------------------\n');
}
