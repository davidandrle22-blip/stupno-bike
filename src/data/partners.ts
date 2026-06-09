export type PartnerTier = 'general' | 'main' | 'partner';

export interface Partner {
  id: string;
  name: string;
  tier: PartnerTier;
  url: string;
  logo: string;
  description: string;
  order: number;
}

export const partners: Partner[] = [
  // --- GENERÁLNÍ PARTNEŘI ---
  {
    id: 'cube',
    name: 'CUBE Bikes',
    tier: 'general',
    url: 'https://www.cube.eu',
    logo: '/images/partners/01-cube.png',
    description: 'Německá cyklistická značka založená v roce 1993 v bavorském Waldershofu. Jeden z největších výrobců kol a e-biků v Evropě – prodává ve více než 67 zemích světa. CUBE je synonymem inovace, precizního německého inženýrství a vášně pro cyklistiku.',
    order: 1,
  },
  {
    id: 'plzensky-kraj',
    name: 'Plzeňský kraj',
    tier: 'general',
    url: 'https://www.plzensky-kraj.cz',
    logo: '/images/partners/06-plzensky-kraj.png',
    description: 'Plzeňský kraj aktivně podporuje sportovní akce a rozvoj cyklistiky v regionu. Díky záštitě kraje mohou na Rokycany a okolí proudit akce mezinárodního formátu. Třetí největší kraj ČR je domovem překrásné přírody od Šumavy po Brdy – ideální terén pro mountain biking.',
    order: 2,
  },
  // --- HLAVNÍ PARTNEŘI ---
  {
    id: 'obec-brasy',
    name: 'Obec Břasy',
    tier: 'main',
    url: 'https://www.obecbrasy.cz',
    logo: '/images/partners/11-obec-brasy.png',
    description: 'Obec Břasy, pod kterou spadá i Stupno – místo konání závodu. Obec s bohatou historií sahající do roku 1379, dnes domov více než 2 200 obyvatel. Břasy aktivně podporují sportovní a komunitní život v regionu a jsou hrdým hostitelem UCI C1 XCO závodu.',
    order: 3,
  },
  {
    id: 'raben',
    name: 'Raben Logistics Czech',
    tier: 'main',
    url: 'https://ceskarepublika.raben-group.com',
    logo: '/images/partners/07-raben.svg',
    description: 'Přední evropský poskytovatel logistických služeb s více než 90 lety zkušeností. V ČR provozuje 10 strategických dep a nabízí vnitrostátní i mezinárodní přepravu, skladování a logistiku čerstvých potravin. Přes 12 200 zaměstnanců ve 170+ lokalitách v 17 zemích.',
    order: 4,
  },
  {
    id: 'primalex',
    name: 'Primalex',
    tier: 'main',
    url: 'https://www.primalex.cz',
    logo: '/images/partners/12-primalex.png',
    description: 'Tradiční česká značka barev a nátěrů, součást globálního koncernu PPG. Výrobní závod sídlí přímo v Břasích! Primalex je synonymem kvality v oblasti interiérových i exteriérových nátěrů – od legendárního Primalex Plus po profesionální řady. Prostor pro nápad.',
    order: 5,
  },
  {
    id: 'ppg',
    name: 'PPG',
    tier: 'main',
    url: 'https://www.ppg.com',
    logo: '/images/partners/13-ppg.png',
    description: 'PPG Industries je globální lídr v oblasti nátěrových hmot a speciálních materiálů. Působí ve více než 70 zemích, zaměstnává přes 50 000 lidí a je mateřskou společností značky Primalex. Přináší barvu a ochranu do průmyslu i domácností po celém světě.',
    order: 6,
  },
  // --- PARTNEŘI ---
  {
    id: 'amond',
    name: 'AMOND',
    tier: 'partner',
    url: 'https://www.amond.cz',
    logo: '/images/partners/02-amond.png',
    description: 'Autorizovaný dealer vozů Škoda a Volkswagen se sídlem v Kladně. Nabízí prodej nových i ojetých vozů, kompletní autorizovaný servis, půjčovnu vozidel a široké portfolio služeb pro motoristy. Spolehlivý partner na silnici i mimo ni.',
    order: 7,
  },
  {
    id: 'segway',
    name: 'Segway',
    tier: 'partner',
    url: 'https://cz-cs.segway.com',
    logo: '/images/partners/03-segway.png',
    description: 'Segway-Ninebot je světový lídr v oblasti osobní elektromobility. Od ikonických elektrokoloběžek přes terénní čtyřkolky Segway Powersports až po revoluční robotické sekačky Navimow. Inovace, která mění způsob, jakým se pohybujeme.',
    order: 8,
  },
  {
    id: 'asp-group',
    name: 'ASP Group',
    tier: 'partner',
    url: 'https://www.aspgroup.eu',
    logo: '/images/partners/08-asp-group.png',
    description: 'Jeden z největších distributorů ATV, UTV a moto příslušenství ve střední a východní Evropě. Se sídlem v Letkově u Plzně a distribučním centrem přes 22 000 m². Oficiální dovozce značek Segway Powersports, Linhai, TGB. 25 let zkušeností, 400+ dealerů.',
    order: 9,
  },
  {
    id: 'cyklostar',
    name: 'Cyklostar',
    tier: 'partner',
    url: 'https://www.cyklostar.cz',
    logo: '/images/partners/14-cyklostar.png',
    description: 'Česká značka profesionální cyklistické kosmetiky. Čističe rámů, maziva řetězů a kompletní péče o kolo. Cyklostar Original je volbou závodníků i hobby cyklistů, kteří chtějí mít své kolo vždy v top kondici.',
    order: 10,
  },
  {
    id: 'efektit',
    name: 'Efektit',
    tier: 'partner',
    url: 'https://www.efektit.cz',
    logo: '/images/partners/04-efektit.png',
    description: 'IT společnost z Plzně zaměřená na efektivní řešení v oblasti infrastruktury, sítí, AV systémů a kybernetické bezpečnosti. Od roku 2014 poskytuje komplexní IT služby s 20+ lety zkušeností v oboru.',
    order: 11,
  },
  {
    id: 'vif',
    name: 'VIF Sports',
    tier: 'partner',
    url: 'https://www.vifsports.cz',
    logo: '/images/partners/19-vif.svg',
    description: 'VIF Sports je česká sportovní značka zaměřená na výkonnostní sportovce. Kvalitní sportovní výživa, doplňky a vybavení pro cyklisty i další sportovce, kteří chtějí posouvat své výkony na maximum.',
    order: 12,
  },
  {
    id: 'winth3000',
    name: 'Winth 3000',
    tier: 'partner',
    url: 'https://www.winth.cz',
    logo: '/images/partners/05-winth3000.png',
    description: 'Rokycanská firma specializující se na instalatérství, topenářství a kompletní rekonstrukce. Prodej instalačního materiálu v maloobchodní i velkoobchodní prodejně. Lokální partner, který zná region jako své boty.',
    order: 13,
  },
  {
    id: 'helas-kovo',
    name: 'HELAS Kovo',
    tier: 'partner',
    url: 'https://www.helaskovo.cz',
    logo: '/images/partners/09-helas-kovo.png',
    description: 'Česká společnost z Všenic u Břas vyrábějící přesné kovové komponenty pro průmysl. Laserové řezání na strojích TRUMPF, ohraňování, svařování a prášková lakovna. Na trhu od roku 1999, certifikace ISO 9001.',
    order: 14,
  },
  {
    id: 'ploty-kodl',
    name: 'Ploty Kodl',
    tier: 'partner',
    url: 'https://www.kodl-ploty.cz',
    logo: '/images/partners/16-ploty-kodl.png',
    description: 'Plotové centrum pro Rokycany, Plzeň a celý Plzeňský kraj. Od roku 1995 prodej, stavba a montáž oplocení – od rodinných domů po průmyslové areály. Pletivo, brány, sloupky a kompletní realizace na klíč.',
    order: 15,
  },
  {
    id: 'ac-heating',
    name: 'AC Heating',
    tier: 'partner',
    url: 'https://www.ac-heating.cz',
    logo: '/images/partners/10-ac-heating.png',
    description: 'Český výrobce tepelných čerpadel a fotovoltaických systémů. Řada Convert nabízí špičková řešení vytápění a chlazení pro rodinné i komerční objekty. Úspora až 70 % nákladů za vytápění. Tiché, spolehlivé a vyrobené v ČR.',
    order: 16,
  },
  {
    id: 'lawi',
    name: 'LAWI',
    tier: 'partner',
    url: 'https://www.lawi.cz',
    logo: '/images/partners/15-lawi.png',
    description: 'Česká značka sportovního a cyklistického oblečení. Dresy, kraťasy, bundy a doplňky navržené pro výkon, pohodlí a styl. Nabízí i zakázkovou výrobu dresů s vlastním designem. Vše vyráběno s pečlivostí v České republice.',
    order: 17,
  },
  {
    id: 'recovera',
    name: 'Recovera by Veolia',
    tier: 'partner',
    url: 'https://www.recovera.cz',
    logo: '/images/partners/17-recovera.png',
    description: 'Recovera by Veolia je přední česká společnost v oblasti odpadového hospodářství a cirkulární ekonomiky. Zajišťuje sběr, třídění a recyklaci odpadů pro firmy i obce. Součást globální skupiny Veolia – světového lídra v ekologické transformaci průmyslu.',
    order: 18,
  },
  {
    id: 'grillvlek',
    name: 'Grill Vlek',
    tier: 'partner',
    url: 'https://www.grillvlek.cz',
    logo: '/images/partners/18-grillvlek.png',
    description: 'Indická restaurace přímo v areálu Ultramarinka v Břasích — domovském závodišti MČR XCO Stupno. Autentická indická kuchyně v srdci přírody Brd. Ideální místo pro posílení před závodem i po něm.',
    order: 19,
  },
];

export const getPartnersByTier = (tier: PartnerTier) =>
  partners.filter(p => p.tier === tier).sort((a, b) => a.order - b.order);
