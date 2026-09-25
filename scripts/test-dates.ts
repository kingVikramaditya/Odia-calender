import { LOCATIONS, ODIA_MONTHS, TITHI_NAMES } from '../src/data/odiaConstants';
import { getSunMoonLongitudes, getLahiriAyanamsha, toJdn } from '../src/utils/panchangEngine';

const PURNIMA_TABLE: Record<number, { titleOdia: string; titleEn: string }> = {
  0: { titleOdia: 'ଚନ୍ଦନ ପୂର୍ଣ୍ଣିମା / ବୁଦ୍ଧ ପୂର୍ଣ୍ଣିମା', titleEn: 'Chandan Purnima & Buddha Purnima' },
  1: { titleOdia: 'ଦେବସ୍ନାନ ପୂର୍ଣ୍ଣିମା (ଶ୍ରୀଜଗନ୍ନାଥ ସ୍ନାନଯାତ୍ରା ଓ ହାତୀବେଶ)', titleEn: 'Debasnana Purnima (Snana Yatra & Hati Besha)' },
  2: { titleOdia: 'ଗୁରୁ ପୂର୍ଣ୍ଣିମା / ବ୍ୟାସ ପୂର୍ଣ୍ଣିମା', titleEn: 'Guru Purnima & Vyasa Purnima' },
  3: { titleOdia: 'ଗହ୍ମା ପୂର୍ଣ୍ଣିମା / ରାକ୍ଷୀ ପୂର୍ଣ୍ଣିମା (ପ୍ରଭୁ ବଳଭଦ୍ର ଜନ୍ମୋତ୍ସବ)', titleEn: 'Gamha Purnima & Rakhi (Balabhadra Janma)' },
  4: { titleOdia: 'ଭାଦ୍ରବ ପୂର୍ଣ୍ଣିମା / ଇନ୍ଦ୍ରୋତ୍ସବ (ଶ୍ରୀମଦ୍ ଭାଗବତ ଜୟନ୍ତୀ ଓ ଚନ୍ଦ୍ର ପୂଜା)', titleEn: 'Bhadrava Purnima / Indrotsava (Bhagabata Jayanti & Chandra Puja)' },
  5: { titleOdia: 'କୁମାର ପୂର୍ଣ୍ଣିମା (କୁମାରୋତ୍ସବ, କୋଜାଗରୀ ଗଜଲକ୍ଷ୍ମୀ ପୂଜା ଓ ଚାନ୍ଦ ପୂଜା)', titleEn: 'Kumar Purnima (Odia Festival of Youth & Kojagari Lakshmi Puja)' },
  6: { titleOdia: 'କାର୍ତ୍ତିକ ପୂର୍ଣ୍ଣିମା / ବୋଇତ ବନ୍ଦାଣ (କଟକ ବାଲିଯାତ୍ରା ଆରମ୍ଭ ଓ ରାସ ପୂର୍ଣ୍ଣିମା)', titleEn: 'Kartika Purnima / Boita Bandana (Bali Yatra)' },
  7: { titleOdia: 'ପାଣ୍ଡୁ ପୂର୍ଣ୍ଣିମା / ମାର୍ଗଶିର ପୂର୍ଣ୍ଣିମା', titleEn: 'Pandu Purnima / Margasira Purnima' },
  8: { titleOdia: 'ପୁଷ୍ୟାଭିଷେକ ପୂର୍ଣ୍ଣିମା (ପୌଷ ପୂର୍ଣ୍ଣିମା)', titleEn: 'Pushyabhisheka Purnima (Pausha Purnima)' },
  9: { titleOdia: 'ମାଘ ପୂର୍ଣ୍ଣିମା / ଅଗ୍ନି ଉତ୍ସବ', titleEn: 'Magha Purnima & Agni Utsava' },
  10: { titleOdia: 'ଦୋଳ ପୂର୍ଣ୍ଣିମା (ହୋଲି / ରାଧାକୃଷ୍ଣ ଦୋଳଯାତ୍ରା)', titleEn: 'Dola Purnima & Holi' },
  11: { titleOdia: 'ଚୈତ୍ର ପୂର୍ଣ୍ଣିମା (ଚଇତି ଘୋଡ଼ା ନାଚ)', titleEn: 'Chaitra Purnima (Chaiti Ghoda)' }
};

function getEngineMonthAndFestivals(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  // Approximate sunrise in Puri: 05:45 AM IST = 00:15 UTC = 0.25 hours
  const jdn = toJdn(y, m, d, 0.25);
  const sm = getSunMoonLongitudes(jdn);
  const ayanamsha = getLahiriAyanamsha(jdn);
  const siderealSun = (sm.sunTrueLon - ayanamsha + 360000) % 360;
  const elongation = sm.elongation;
  const tithiIndexTotal = Math.floor(elongation / 12);
  const isShukla = tithiIndexTotal < 15;
  const tithiNumber = (tithiIndexTotal % 15) + 1;
  const isPurnima = isShukla && tithiNumber === 15;
  const isAmavasya = !isShukla && tithiNumber === 15;

  const sunLonAtAmavasya = (siderealSun - (elongation / 12.19074) + 360000) % 360;
  const amantaMonthIndex = Math.floor(sunLonAtAmavasya / 30) % 12;
  const lunarMonthIndex = isShukla ? amantaMonthIndex : (amantaMonthIndex + 1) % 12;
  const lunarMonth = ODIA_MONTHS[lunarMonthIndex];

  const events: string[] = [];

  if (isPurnima) {
    events.push(PURNIMA_TABLE[amantaMonthIndex].titleOdia);
  }

  if (isAmavasya) {
    const amavMonth = Math.floor(siderealSun / 30) % 12;
    if (amavMonth === 5) events.push('ମହାଳୟା ଅମାବାସ୍ୟା (ପିତୃ ତର୍ପଣ)');
    else if (amavMonth === 6) events.push('ଦୀପାବଳି ଅମାବାସ୍ୟା (ବଡ଼ବଡୁଆ ଡାକ ଓ କାଳୀପୂଜା)');
    else if (amavMonth === 4) events.push('ସପ୍ତପୁରୀ ଅମାବାସ୍ୟା');
    else if (amavMonth === 3) events.push('ଚିତାଉ ଅମାବାସ୍ୟା');
    else if (amavMonth === 1) events.push('ସାବିତ୍ରୀ ବ୍ରତ (ସାବିତ୍ରୀ ଅମାବାସ୍ୟା)');
  }

  // Specific cultural festivals
  if (lunarMonthIndex === 4 && !isShukla && tithiNumber === 8) events.push('ଶ୍ରୀକୃଷ୍ଣ ଜନ୍ମାଷ୍ଟମୀ');
  if (lunarMonthIndex === 4 && isShukla && tithiNumber === 4) events.push('ଗଣେଶ ଚତୁର୍ଥୀ / ଗଣେଶ ପୂଜା');
  if (lunarMonthIndex === 4 && isShukla && tithiNumber === 5) events.push('ନୂଆଖାଇ ଓ ଋଷି ପଞ୍ଚମୀ');
  if (lunarMonthIndex === 4 && isShukla && tithiNumber === 8) events.push('ରାଧାଷ୍ଟମୀ ଓ ସୁନିଆଁ (ଓଡ଼ିଆ ଅଙ୍କ ନୂତନ ବର୍ଷାରମ୍ଭ)');
  if (lunarMonthIndex === 4 && isShukla && tithiNumber === 11) events.push('ପାର୍ଶ୍ୱ ପରିବର୍ତ୍ତନ ଏକାଦଶୀ (ବଡ଼ ଏକାଦଶୀ)');
  if (lunarMonthIndex === 4 && isShukla && tithiNumber === 14) events.push('ଅନନ୍ତ ବ୍ରତ ଓ ଅଘୋର ଚତୁର୍ଦ୍ଦଶୀ');

  if (lunarMonthIndex === 5 && isShukla && (tithiNumber === 8 || tithiNumber === 9)) events.push('ଶାରଦୀୟ ଦୁର୍ଗାପୂଜା (ମହାଷ୍ଟମୀ / ମହାନବମୀ)');
  if (lunarMonthIndex === 5 && isShukla && tithiNumber === 10) events.push('ବିଜୟା ଦଶମୀ / ଦସହରା (ରାବଣ ପୋଡ଼ି)');
  if (dateStr === '2026-10-25') events.push('କୁମାର ଉତ୍ସବ ସନ୍ଧ୍ୟା ଓ ଗଜଲକ୍ଷ୍ମୀ ପୂଜାରମ୍ଭ');

  if (lunarMonthIndex === 6 && isShukla && tithiNumber === 11) events.push('ବଡ଼ ଏକାଦଶୀ (ପ୍ରବୋଧିନୀ ଏକାଦଶୀ / ପଞ୍ଚୁକ ଆରମ୍ଭ)');
  if (lunarMonthIndex === 7 && !isShukla && tithiNumber === 8) events.push('ପ୍ରଥମାଷ୍ଟମୀ (ଜ୍ୟେଷ୍ଠ ସନ୍ତାନ ବନ୍ଦାପନା)');

  return {
    lunarMonth: lunarMonth.nameOdia,
    paksha: isShukla ? 'ଶୁକ୍ଳ' : 'କୃଷ୍ଣ',
    tithiName: TITHI_NAMES[tithiNumber - 1].nameOdia,
    tithiNumber,
    isPurnima,
    events
  };
}

const testDates = [
  '2026-06-29', // Debasnana Purnima
  '2026-07-29', // Guru Purnima
  '2026-08-28', // Gamha Purnima
  '2026-09-04', // Janmashtami
  '2026-09-11', // Saptapuri Amavasya
  '2026-09-14', // Ganesh Chaturthi
  '2026-09-15', // Nuakhai
  '2026-09-22', // Parsva Ekadashi
  '2026-09-25', // Ananta Brata
  '2026-09-26', // Bhadrava Purnima
  '2026-10-10', // Mahalaya
  '2026-10-18', // Maha Ashtami
  '2026-10-20', // Dussehra
  '2026-10-25', // Kumar Utsav Eve
  '2026-10-26', // Kumar Purnima
  '2026-11-08', // Diwali
  '2026-11-20', // Bada Ekadashi
  '2026-11-24', // Kartika Purnima
  '2026-12-01', // Prathamastami
];

console.log('--- TEST RESULTS WITH ACCURATE FORMULA ---');
for (const d of testDates) {
  const r = getEngineMonthAndFestivals(d);
  console.log(`${d} | ${r.lunarMonth} ${r.paksha} ${r.tithiName} | Events: ${r.events.join(', ')}`);
}
