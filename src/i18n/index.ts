export type Language = 'en' | 'am';

export const en = {
  appName: 'Sint?',
  appNameAmharic: 'ስንት?',
  tagline: 'How much?',
  subtitle: 'Quick everyday calculations for Ethiopia',
  tabs: {
    home: 'Home',
    history: 'History',
    settings: 'Settings',
  },
  calculators: {
    salary: {
      title: 'Salary',
      subtitle: 'Tax, pension, and take-home',
    },
    loan: {
      title: 'Loan',
      subtitle: 'Monthly payment and interest',
    },
    vat: {
      title: 'VAT',
      subtitle: 'Add or remove 15% VAT',
    },
    savings: {
      title: 'Savings',
      subtitle: 'See what you can set aside',
    },
  },
  common: {
    share: 'Share',
    cancel: 'Cancel',
    copied: 'Copied to clipboard',
    etb: 'ETB',
    months: 'Months',
    years: 'Years',
    optional: 'Optional',
    estimateNote: 'Estimates only. Not tax or financial advice.',
    results: 'Results',
    inputs: 'Inputs',
  },
  salary: {
    title: 'Salary calculator',
    grossLabel: 'Gross monthly salary',
    incomeTax: 'Income tax',
    employeePension: 'Employee pension',
    employerPension: 'Employer pension',
    netTakeHome: 'Estimated net take-home',
    effectiveRate: 'Effective tax rate',
    disclaimer:
      'Uses current Ethiopian employment tax bands and a 7% employee pension on the amount entered. Employer pension (11%) is shown for context and is not deducted from take-home.',
  },
  loan: {
    title: 'Loan calculator',
    amountLabel: 'Loan amount',
    rateLabel: 'Annual interest rate',
    durationLabel: 'Duration',
    monthlyPayment: 'Monthly payment',
    totalRepayment: 'Total repayment',
    totalInterest: 'Total interest',
  },
  vat: {
    title: 'VAT calculator',
    amountLabel: 'Amount',
    rateLabel: 'VAT rate',
    add: 'Add VAT',
    remove: 'Remove VAT',
    net: 'Amount without VAT',
    vat: 'VAT',
    gross: 'Amount with VAT',
  },
  savings: {
    title: 'Savings calculator',
    initialLabel: 'Initial amount',
    monthlyLabel: 'Monthly saving',
    durationLabel: 'Duration',
    returnLabel: 'Annual return',
    finalAmount: 'Final amount',
    totalContributed: 'Total contributed',
    estimatedGain: 'Estimated gain',
  },
  history: {
    title: 'History',
    empty: 'No calculations yet',
    emptyHint: 'Your recent answers stay on this device.',
    clear: 'Clear history',
    clearConfirm: 'Remove all saved calculations from this device?',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    english: 'English',
    amharic: 'አማርኛ',
    defaults: 'Defaults',
    defaultVat: 'Default VAT rate',
    about: 'About rates',
    aboutBody:
      'Employment tax bands follow Proclamation No. 1395/2025. Employee pension is 7%. VAT defaults to 15%. Update these in src/config/ethiopia.ts when the law changes.',
    localNote: 'Sint? is local-first. Nothing is sent to a server, and there is no account.',
  },
  notFound: {
    title: 'Page not found',
    back: 'Back home',
  },
} as const;

export type TranslationDict = {
  [K in keyof typeof en]: (typeof en)[K] extends string
    ? string
    : {
        [P in keyof (typeof en)[K]]: (typeof en)[K][P] extends string
          ? string
          : { [Q in keyof (typeof en)[K][P]]: string };
      };
};

export const am: TranslationDict = {
  appName: 'ስንት?',
  appNameAmharic: 'Sint?',
  tagline: 'ስንት ነው?',
  subtitle: 'ለዕለት ተዕለት የኢትዮጵያ ስሌቶች',
  tabs: {
    home: 'መነሻ',
    history: 'ታሪክ',
    settings: 'ቅንብሮች',
  },
  calculators: {
    salary: {
      title: 'ደመወዝ',
      subtitle: 'ግብር፣ ጡረታ እና የሚቀረው',
    },
    loan: {
      title: 'ብድር',
      subtitle: 'ወርሃዊ ክፍያ እና ወለድ',
    },
    vat: {
      title: 'ተ.እ.ታ',
      subtitle: '15% ተ.እ.ታ ጨምር ወይም አውጣ',
    },
    savings: {
      title: 'ቁጠባ',
      subtitle: 'ምን እንደምታስቀምጡ ይመልከቱ',
    },
  },
  common: {
    share: 'አጋራ',
    cancel: 'ተወው',
    copied: 'ወደ ቅንጥብ ሰሌዳ ተቀድቷል',
    etb: 'ብር',
    months: 'ወራት',
    years: 'ዓመታት',
    optional: 'አማራጭ',
    estimateNote: 'ግምቶች ብቻ ናቸው። የግብር ወይም የገንዘብ ምክር አይደለም።',
    results: 'ውጤቶች',
    inputs: 'ግብዓቶች',
  },
  salary: {
    title: 'የደመወዝ ማስያ',
    grossLabel: 'ጠቅላላ ወርሃዊ ደመወዝ',
    incomeTax: 'የገቢ ግብር',
    employeePension: 'የሰራተኛ ጡረታ',
    employerPension: 'የአሰሪ ጡረታ',
    netTakeHome: 'የሚቀረው ደመወዝ',
    effectiveRate: 'ውጤታማ የግብር መጠን',
    disclaimer:
      'አሁን ያሉ የኢትዮጵያ የደመወዝ ግብር ባንዶችን እና በገባው መጠን ላይ 7% የሰራተኛ ጡረታን ይጠቀማል። የአሰሪ ጡረታ (11%) ለማብራሪያ ብቻ ነው የሚታየው።',
  },
  loan: {
    title: 'የብድር ማስያ',
    amountLabel: 'የብድር መጠን',
    rateLabel: 'ዓመታዊ የወለድ መጠን',
    durationLabel: 'ጊዜ',
    monthlyPayment: 'ወርሃዊ ክፍያ',
    totalRepayment: 'ጠቅላላ ክፍያ',
    totalInterest: 'ጠቅላላ ወለድ',
  },
  vat: {
    title: 'የተ.እ.ታ ማስያ',
    amountLabel: 'መጠን',
    rateLabel: 'የተ.እ.ታ መጠን',
    add: 'ተ.እ.ታ ጨምር',
    remove: 'ተ.እ.ታ አውጣ',
    net: 'ያለ ተ.እ.ታ',
    vat: 'ተ.እ.ታ',
    gross: 'ከተ.እ.ታ ጋር',
  },
  savings: {
    title: 'የቁጠባ ማስያ',
    initialLabel: 'የመጀመሪያ መጠን',
    monthlyLabel: 'ወርሃዊ ቁጠባ',
    durationLabel: 'ጊዜ',
    returnLabel: 'ዓመታዊ ትርፍ',
    finalAmount: 'የመጨረሻ መጠን',
    totalContributed: 'ጠቅላላ አስተዋጽኦ',
    estimatedGain: 'የሚገመት ትርፍ',
  },
  history: {
    title: 'ታሪክ',
    empty: 'እስካሁን ስሌት የለም',
    emptyHint: 'የቅርብ ጊዜ መልሶችዎ በዚህ መሣሪያ ላይ ይቀመጣሉ።',
    clear: 'ታሪክ አጽዳ',
    clearConfirm: 'ሁሉም የተቀመጡ ስሌቶች ከዚህ መሣሪያ ይወገዱ?',
  },
  settings: {
    title: 'ቅንብሮች',
    language: 'ቋንቋ',
    english: 'English',
    amharic: 'አማርኛ',
    defaults: 'ነባሪዎች',
    defaultVat: 'ነባሪ የተ.እ.ታ መጠን',
    about: 'ስለ ተመኖች',
    aboutBody:
      'የደመወዝ ግብር ባንዶች ከአዋጅ ቁጥር 1395/2025 ይከተላሉ። የሰራተኛ ጡረታ 7% ነው። ተ.እ.ታ ነባሪው 15% ነው። ሕጉ ሲቀየር src/config/ethiopia.ts ውስጥ ያዘምኑ።',
    localNote: 'ስንት? በመሣሪያዎ ላይ ብቻ ይሰራል። ወደ ሰርቨር ምንም አይላክም፣ መለያም የለም።',
  },
  notFound: {
    title: 'ገጹ አልተገኘም',
    back: 'ወደ መነሻ ተመለስ',
  },
};

export const dictionaries: Record<Language, TranslationDict> = { en, am };
