import { PanchangDay } from '../types';
import { toOdiaNumber } from '../data/odiaConstants';

export interface SankalpaData {
  // Cosmic & Temporal Coordinates
  kalpa: string;
  manvantara: string;
  mahayuga: string;
  kaliyugaCharana: string;
  deshaKshetra: string;
  samvatsaraName: string;
  sakabda: number;
  vikramSamvat: number;
  ayanaOdia: string;
  ayanaSanskrit: string;
  rutuOdia: string;
  rutuSanskrit: string;
  solarMonthOdia: string;
  solarDayOdia: string;
  lunarMonthOdia: string;
  pakshaOdia: string;
  pakshaSanskrit: string;
  tithiOdia: string;
  tithiSanskrit: string;
  varaOdia: string;
  varaSanskrit: string;
  nakshatraOdia: string;
  nakshatraSanskrit: string;
  yogaOdia: string;
  yogaSanskrit: string;
  karanaOdia: string;
  karanaSanskrit: string;

  // Rendered Texts
  laghuSanskrit: string;
  laghuOdiaMeaning: string;
  vistrutSanskrit: string;
  vistrutOdiaMeaning: string;
}

// Map Tithi to Sanskrit locative case for Sankalpa
function getTithiSanskrit(tithiNumber: number, tithiNameOdia: string): string {
  const map: Record<number, string> = {
    1: 'ପ୍ରତିପଦାୟାଂ',
    2: 'ଦ୍ୱିତୀୟାୟାଂ',
    3: 'ତୃତୀୟାୟାଂ',
    4: 'ଚତୁର୍ଥ୍ୟାଂ',
    5: 'ପଞ୍ଚମ୍ୟାଂ',
    6: 'ଷଷ୍ଠ୍ୟାଂ',
    7: 'ସପ୍ତମ୍ୟାଂ',
    8: 'ଅଷ୍ଟମ୍ୟାଂ',
    9: 'ନବମ୍ୟାଂ',
    10: 'ଦଶମ୍ୟାଂ',
    11: 'ଏକାଦଶ୍ୟାଂ',
    12: 'ଦ୍ୱାଦଶ୍ୟାଂ',
    13: 'ତ୍ରୟୋଦଶ୍ୟାଂ',
    14: 'ଚତୁର୍ଦ୍ଦଶ୍ୟାଂ',
    15: 'ପୂର୍ଣ୍ଣିମାୟାଂ', // Or Amavasyayam
  };
  if (tithiNameOdia.includes('ଅମାବାସ୍ୟା')) return 'ଅମାବାସ୍ୟାୟାଂ';
  return map[tithiNumber] || `${tithiNameOdia} ତିଥୌ`;
}

// Map Weekday to Sanskrit locative
function getVaraSanskrit(dayOfWeek: number): string {
  const map: Record<number, string> = {
    0: 'ଭାନୁବାସରେ (ଆଦିତ୍ୟବାସରେ)',
    1: 'ଇନ୍ଦୁବାସରେ (ସୋମବାସରେ)',
    2: 'ଭୌମବାସରେ (ମଙ୍ଗଳବାସରେ)',
    3: 'ସୌମ୍ୟବାସରେ (ବୁଧବାସରେ)',
    4: 'ବୃହସ୍ପତିବାସରେ (ଗୁରୁବାସରେ)',
    5: 'ଭୃଗୁବାସରେ (ଶୁକ୍ରବାସରେ)',
    6: 'ସ୍ଥିରବାସରେ (ଶନିବାସରେ)',
  };
  return map[dayOfWeek] || 'ବାସରେ';
}

// Get Ayana based on solar month (10 = Makara to 3 = Mithuna is Uttarayana; 4 = Karkata to 9 = Dhanu is Dakshinayana)
function getAyana(gMonth: number, gDay: number): { odia: string; sanskrit: string } {
  // Approximate: Jan 15 to July 15 is Uttarayana, July 16 to Jan 14 is Dakshinayana
  const isUttarayana = (gMonth > 0 && gMonth < 6) || (gMonth === 0 && gDay >= 15) || (gMonth === 6 && gDay <= 15);
  if (isUttarayana) {
    return {
      odia: 'ଉତ୍ତରାୟଣ',
      sanskrit: 'ଉତ୍ତରାୟଣେ',
    };
  }
  return {
    odia: 'ଦକ୍ଷିଣାୟନ',
    sanskrit: 'ଦକ୍ଷିଣାୟନେ',
  };
}

// Get Ritu in Sanskrit locative
function getRituSanskrit(rutuOdia: string): string {
  if (rutuOdia.includes('ବସନ୍ତ')) return 'ବସନ୍ତ ଋତୌ';
  if (rutuOdia.includes('ଗ୍ରୀଷ୍ମ')) return 'ଗ୍ରୀଷ୍ମ ଋତୌ';
  if (rutuOdia.includes('ବର୍ଷା')) return 'ବର୍ଷା ଋତୌ';
  if (rutuOdia.includes('ଶରତ')) return 'ଶରଦ୍ ଋତୌ';
  if (rutuOdia.includes('ହେମନ୍ତ')) return 'ହେମନ୍ତ ଋତୌ';
  if (rutuOdia.includes('ଶୀତ')) return 'ଶିଶିର ଋତୌ';
  return `${rutuOdia} ଋତୌ`;
}

// 60 Jovian Samvatsaras cycle
const SAMVATSARAS = [
  'ପ୍ରଭବ', 'ବିଭବ', 'ଶୁକ୍ଳ', 'ପ୍ରମୋଦ', 'ପ୍ରଜାପତି', 'ଅଙ୍ଗିରା', 'ଶ୍ରୀମୁଖ', 'ଭାବ', 'ଯୁବା', 'ଧାତା',
  'ଈଶ୍ୱର', 'ବହୁଧାନ୍ୟ', 'ପ୍ରମାଥୀ', 'ବିକ୍ରମ', 'ବୃଷପ୍ରଜା', 'ଚିତ୍ରଭାନୁ', 'ସୁଭାନୁ', 'ତାରଣ', 'ପାର୍ଥିବ', 'ବ୍ୟୟ',
  'ସର୍ବଜିତ', 'ସର୍ବଧାରୀ', 'ବିରୋଧୀ', 'ବିକୃତ', 'ଖର', 'ନନ୍ଦନ', 'ବିଜୟ', 'ଜୟ', 'ମନ୍ମଥ', 'ଦୁର୍ମୁଖ',
  'ହେମଲମ୍ବ', 'ବିଳମ୍ବ', 'ବିକାରୀ', 'ଶାର୍ବରୀ', 'ପ୍ଲବ', 'ଶୁଭକୃତ', 'ଶୋଭକୃତ', 'କ୍ରୋଧୀ', 'ବିଶ୍ୱାବସୁ', 'ପରାଭବ',
  'ପ୍ଲବଙ୍ଗ', 'କୀଳକ', 'ସୌମ୍ୟ', 'ସାଧାରଣ', 'ବିରୋଧକୃତ', 'ପରିଧାବୀ', 'ପ୍ରମାଦୀ', 'ଆନନ୍ଦ', 'ରାକ୍ଷସ', 'ଅନଳ',
  'ପିଙ୍ଗଳ', 'କାଳଯୁକ୍ତ', 'ସିଦ୍ଧାର୍ଥ', 'ରୌଦ୍ର', 'ଦୁର୍ମତି', 'ଦୁନ୍ଦୁଭି', 'ରୁଧିରୋଦ୍ଗାରୀ', 'ରକ୍ତାକ୍ଷୀ', 'କ୍ରୋଧନ', 'ଅକ୍ଷୟ'
];

export function generateSankalpa(
  day: PanchangDay,
  gotra: string = 'କାଶ୍ୟପ',
  name: string = 'ଅମୁକ ଶର୍ମା/ଦାସ'
): SankalpaData {
  const gYear = day.gregorianYear;
  const gMonth = day.gregorianMonth;
  const gDay = day.gregorianDay;

  // Samvatsara index approximation
  const samvatsaraIndex = (day.sakabda + 11) % 60;
  const samvatsaraName = SAMVATSARAS[samvatsaraIndex] || 'ପାର୍ଥିବ';

  const ayana = getAyana(gMonth, gDay);
  const rutuSanskrit = getRituSanskrit(day.rutuOdia);
  const pakshaSanskrit = day.tithi.pakshaOdia.includes('ଶୁକ୍ଳ') ? 'ଶୁକ୍ଳପକ୍ଷେ' : 'କୃଷ୍ଣପକ୍ଷେ';
  const tithiSanskrit = getTithiSanskrit(day.tithi.number, day.tithi.nameOdia);
  const varaSanskrit = getVaraSanskrit(day.dayOfWeek);
  const nakshatraSanskrit = `${day.nakshatra.nameOdia} ନକ୍ଷତ୍ର ଯୁକ୍ତାୟାଂ`;
  const yogaSanskrit = `${day.yoga.nameOdia} ଯୋଗେ`;
  const karanaSanskrit = `${day.karana.nameOdia} କରଣେ`;

  // 1. Laghu Sankalpa (ଲଘୁ ସଂକଳ୍ପ) - Daily concise mantra for morning puja / home rituals
  const laghuSanskrit = `ଓଁ ବିଷ୍ଣୁର୍ବିଷ୍ଣୁର୍ବିଷ୍ଣୁଃ ଶ୍ରୀମଦ୍ ଭଗବତୋ ମହାପୁରୁଷସ୍ୟ ବିଷ୍ଣୋରାଜ୍ଞୟା ପ୍ରବର୍ତ୍ତମାନସ୍ୟ, ଅଦ୍ୟ ବ୍ରହ୍ମଣୋ ଦ୍ୱିତୀୟ ପରାର୍ଦ୍ଧେ ଶ୍ୱେତବାରାହ କଳ୍ପେ ବୈବସ୍ୱତ ମନ୍ୱନ୍ତରେ ଅଷ୍ଟାବିଂଶତିତମେ କଳିଯୁଗେ କଳିପ୍ରଥମ ଚରଣେ ଭାରତବର୍ଷେ ଉତ୍କଳ ପ୍ରଦେଶେ (ପୁରୁଷୋତ୍ତମ କ୍ଷେତ୍ରେ)...
${day.odiaMonthNameOdia} ମାସେ, ${pakshaSanskrit}, ${tithiSanskrit} ତିଥୌ, ${varaSanskrit}, ${nakshatraSanskrit}...
[${gotra}] ଗୋତ୍ରସ୍ୟ [${name}] ନାମାହଂ, ମମ ସମସ୍ତ ପାପକ୍ଷୟ ପୂର୍ବକ ଆୟୁ-ଆରୋଗ୍ୟ-ଐଶ୍ୱର୍ଯ୍ୟ ପ୍ରାପ୍ତ୍ୟର୍ଥେ, ଶ୍ରୀଜଗନ୍ନାଥ ମହାପ୍ରଭୁ ପ୍ରୀତ୍ୟର୍ଥେ ଶୁଭ କର୍ମ / ଦୈନିକ ପୂଜନଂ କରିଷ୍ୟେ ।`;

  const laghuOdiaMeaning = `ଓଁ ବିଷ୍ଣୁ, ବିଷ୍ଣୁ, ବିଷ୍ଣୁ! ପରମପୁରୁଷ ଶ୍ରୀବିଷ୍ଣୁଙ୍କ ଆଜ୍ଞାରେ ଏହି ସୃଷ୍ଟିର ଦ୍ୱିତୀୟ ପରାର୍ଦ୍ଧ, ଶ୍ୱେତବାରାହ କଳ୍ପ, ବୈବସ୍ୱତ ମନ୍ୱନ୍ତର ଓ କଳିଯୁଗର ପ୍ରଥମ ଚରଣରେ ପବିତ୍ର ଭାରତବର୍ଷର ଉତ୍କଳ ଭୂମି (ଶ୍ରୀକ୍ଷେତ୍ର) ରେ;
ଆଜି ସୌର ଓ ଚାନ୍ଦ୍ର ${day.odiaMonthNameOdia} ମାସ, ${day.tithi.pakshaOdia}, ${day.tithi.nameOdia} ତିଥି, ${day.varaOdia}, ${day.nakshatra.nameOdia} ନକ୍ଷତ୍ରରେ;
ମୁଁ [${gotra}] ଗୋତ୍ରର [${name}], ମୋର ସମସ୍ତ ପାପ ଓ ବାଧାବିଘ୍ନର ବିନାଶ ପୂର୍ବକ ଆୟୁ, ଉତ୍ତମ ସ୍ୱାସ୍ଥ୍ୟ, ଐଶ୍ୱର୍ଯ୍ୟ ଓ ପରିବାର ମଙ୍ଗଳ ନିମନ୍ତେ ପରମବ୍ରହ୍ମ ଶ୍ରୀଜଗନ୍ନାଥ ମହାପ୍ରଭୁ ଓ ଇଷ୍ଟଦେବଙ୍କ ପ୍ରୀତି ଅର୍ଥେ ଏହି ଶୁଭ କାର୍ଯ୍ୟ / ପୂଜାର ସଂକଳ୍ପ କରୁଅଛି ।`;

  // 2. Vistrut Sankalpa (ବିସ୍ତୃତ ସଂକଳ୍ପ) - Full classical temple / ceremonial ephemeris recitation
  const vistrutSanskrit = `ଓଁ ବିଷ୍ଣୁର୍ବିଷ୍ଣୁର୍ବିଷ୍ଣୁଃ ଶ୍ରୀମଦ୍ ଭଗବତୋ ମହାପୁରୁଷସ୍ୟ ବିଷ୍ଣୋରାଜ୍ଞୟା ପ୍ରବର୍ତ୍ତମାନସ୍ୟ ଅଦ୍ୟ ବ୍ରହ୍ମଣୋ ଦ୍ୱିତୀୟ ପରାର୍ଦ୍ଧେ ଶ୍ୱେତବାରାହ କଳ୍ପେ ବୈବସ୍ୱତ ମନ୍ୱନ୍ତରେ ଅଷ୍ଟାବିଂଶତିତମେ କଳିଯୁଗେ କଳିପ୍ରଥମ ଚରଣେ ଭାରତବର୍ଷେ ଭରତଖଣ୍ଡେ ଜମ୍ବୁଦ୍ୱୀପେ ଦଣ୍ଡକାରଣ୍ୟେ ପୁଣ୍ୟତମେ ଉତ୍କଳ ପ୍ରଦେଶେ (ପୁରୁଷୋତ୍ତମ ଧାମେ / ଶ୍ରୀକ୍ଷେତ୍ରେ) ବୌଦ୍ଧାବତାରେ ରାଜ୍ଞାଂ ପରମେଶ୍ୱରସ୍ୟ ଭୂମୌ,
ଶ୍ରୀମନ୍ ନୃପତେ ଶକାବ୍ଦେ ${toOdiaNumber(day.sakabda)}, ବିକ୍ରମ ସମ୍ବତ ${toOdiaNumber(day.vikramSamvat)}, ଓଡ଼ିଆ ସାଲ ${toOdiaNumber(day.odiaYearSal)}, ${samvatsaraName} ନାମ ସମ୍ବତ୍ସରେ,
${ayana.sanskrit}, ${rutuSanskrit},
ସୌରମାନେନ ${day.odiaMonthNameOdia} ମାସେ ${toOdiaNumber(day.odiaDayOfSolarMonth)} ଦିବସେ, ଚାନ୍ଦ୍ରମାନେନ ${day.odiaMonthNameOdia} ମାସେ,
${pakshaSanskrit}, ${tithiSanskrit},
${varaSanskrit}, ${nakshatraSanskrit},
${yogaSanskrit}, ${karanaSanskrit},
ଏବଂଗୁଣ ବିଶେଷଣ ବିଶିଷ୍ଟାୟାଂ ଶୁଭ ପୁଣ୍ୟତିଥୌ...
[${gotra}] ଗୋତ୍ରୋତ୍ପନ୍ନଃ [${name}] ନାମାହଂ,
ମମ ଆତ୍ମନଃ ଶ୍ରୁତି-ସ୍ମୃତି-ପୁରାଣୋକ୍ତ ଫଳପ୍ରାପ୍ତ୍ୟର୍ଥଂ, ସର୍ବାରିଷ୍ଟ ନିବାରଣାର୍ଥଂ, କାୟିକ-ବାଚିକ-ମାନସିକ ଜ୍ଞାତାଜ୍ଞାତ ପାପକ୍ଷୟାର୍ଥଂ, ଧର୍ମ-ଅର୍ଥ-କାମ-ମୋକ୍ଷ ଚତୁର୍ବିଧ ପୁରୁଷାର୍ଥ ସିଦ୍ଧ୍ୟର୍ଥଂ, ସପରିବାରସ୍ୟ ସର୍ବାଙ୍ଗୀଣ ଶାନ୍ତି ସମୃଦ୍ଧି ହେତୋ, ଶ୍ରୀଜଗନ୍ନାଥ ମହାପ୍ରଭୁ ସର୍ବଦେବ ଦେବୀ ପ୍ରୀତ୍ୟର୍ଥେ... ଏତତ୍ ଶୁଭ କର୍ମ / ଦେବାର୍ଚ୍ଚନଂ ମୟା କ୍ରିୟତେ । ତତ୍ସଦ୍ ଓଁ ନମୋ ବ୍ରହ୍ମଣ୍ୟଦେବାୟ ଗୋବ୍ରାହ୍ମଣ ହିତାୟ ଚ । ଜଗଦ୍ଧିତାୟ କୃଷ୍ଣାୟ ଗୋବିନ୍ଦାୟ ନମୋ ନମଃ ॥`;

  const vistrutOdiaMeaning = `ଏହି ମହାସଂକଳ୍ପ ସମଗ୍ର ବ୍ରହ୍ମାଣ୍ଡ ଓ କାଳଚକ୍ରରେ ଆପଣଙ୍କ ପୂଜାର ସଠିକ୍ ଅବସ୍ଥିତି ବର୍ଣ୍ଣନା କରେ:
• କଳ୍ପ ଓ ମନ୍ୱନ୍ତର: ଶ୍ୱେତବାରାହ କଳ୍ପ, ୭ମ ବୈବସ୍ୱତ ମନ୍ୱନ୍ତର
• ଯୁଗ ଓ ଚରଣ: ଅଷ୍ଟାବିଂଶତି (୨୮ଶ) କଳିଯୁଗ, ପ୍ରଥମ ଚରଣ
• ପବିତ୍ର ଭୂଗୋଳ: ଭାରତବର୍ଷ, ଭରତଖଣ୍ଡ, ଜମ୍ବୁଦ୍ୱୀପ, ଉତ୍କଳ ପ୍ରଦେଶ (ପୁରୁଷୋତ୍ତମ ଶ୍ରୀକ୍ଷେତ୍ର)
• କାଳ ଗଣନା: ${toOdiaNumber(day.sakabda)} ଶକାବ୍ଦ, ${toOdiaNumber(day.vikramSamvat)} ବିକ୍ରମ ସମ୍ବତ, ${toOdiaNumber(day.odiaYearSal)} ଓଡ଼ିଆ ସାଲ, ${samvatsaraName} ସମ୍ବତ୍ସର
• ଅୟନ ଓ ଋତୁ: ${ayana.odia}, ${day.rutuOdia} ଋତୁ
• ମାସ ଓ ଦିବସ: ସୌର ${day.odiaMonthNameOdia} ${toOdiaNumber(day.odiaDayOfSolarMonth)} ଦିନ, ଚାନ୍ଦ୍ର ${day.odiaMonthNameOdia} ମାସ
• ପକ୍ଷ ଓ ତିଥି: ${day.tithi.pakshaOdia}, ${day.tithi.nameOdia} (${day.tithi.endTime ? `ସମାପ୍ତ: ${toOdiaNumber(day.tithi.endTime)}` : ''})
• ବାର ଓ ନକ୍ଷତ୍ର: ${day.varaOdia}, ${day.nakshatra.nameOdia} (${day.nakshatra.pada} ପାଦ)
• ଯୋଗ ଓ କରଣ: ${day.yoga.nameOdia} ଯୋଗ, ${day.karana.nameOdia} କରଣ
• ସଂକଳ୍ପକର୍ତ୍ତା: [${gotra}] ଗୋତ୍ର, [${name}]
• ଉଦ୍ଦେଶ୍ୟ: ଚତୁର୍ବିଧ ପୁରୁଷାର୍ଥ (ଧର୍ମ, ଅର୍ଥ, କାମ, ମୋକ୍ଷ) ସିଦ୍ଧି, ପାପକ୍ଷୟ, ଆରୋଗ୍ୟ ତଥା ଶ୍ରୀଜଗନ୍ନାଥ ମହାପ୍ରଭୁଙ୍କ କୃପା ପ୍ରାପ୍ତି ନିମନ୍ତେ ।`;

  return {
    kalpa: 'ଶ୍ୱେତବାରାହ କଳ୍ପ',
    manvantara: 'ବୈବସ୍ୱତ ମନ୍ୱନ୍ତର',
    mahayuga: '୨୮ଶ କଳିଯୁଗ',
    kaliyugaCharana: 'ପ୍ରଥମ ଚରଣ',
    deshaKshetra: 'ଭାରତବର୍ଷ, ଉତ୍କଳ ପ୍ରଦେଶ (ପୁରୁଷୋତ୍ତମ ଶ୍ରୀକ୍ଷେତ୍ର)',
    samvatsaraName,
    sakabda: day.sakabda,
    vikramSamvat: day.vikramSamvat,
    ayanaOdia: ayana.odia,
    ayanaSanskrit: ayana.sanskrit,
    rutuOdia: day.rutuOdia,
    rutuSanskrit,
    solarMonthOdia: day.odiaMonthNameOdia,
    solarDayOdia: day.odiaDayOfSolarMonthOdia,
    lunarMonthOdia: day.odiaMonthNameOdia,
    pakshaOdia: day.tithi.pakshaOdia,
    pakshaSanskrit,
    tithiOdia: day.tithi.nameOdia,
    tithiSanskrit,
    varaOdia: day.varaOdia,
    varaSanskrit,
    nakshatraOdia: day.nakshatra.nameOdia,
    nakshatraSanskrit,
    yogaOdia: day.yoga.nameOdia,
    yogaSanskrit,
    karanaOdia: day.karana.nameOdia,
    karanaSanskrit,
    laghuSanskrit,
    laghuOdiaMeaning,
    vistrutSanskrit,
    vistrutOdiaMeaning,
  };
}
