# Prompt pro Claude Code terminal – Satelitní mapa s okruhy Stupno XC

---

Potřebuji vygenerovat satelitní mapu oblasti Stupna (u Rokycan) s vyznačenými 4 závodními okruhy pro stupnobike.cz. Výstupem bude JPG soubor v maximální kvalitě.

## Co udělej:

### 1. Najdi GPX soubory
Prohledej celý projekt a najdi všechny GPX soubory s trasami okruhů. Pravděpodobně jsou v `public/`, `data/`, `assets/` nebo `gpx/` složce. Vypiš co najdeš a pokračuj.

### 2. Stáhni satelitní podklad
Použij Python (matplotlib, Pillow, contextily nebo staticmaps). Stáhni satelitní/letecký mapový podklad (tile server) pro oblast kolem GPS bounding boxu všech 4 tras + padding 15%. Použij některý z těchto tile serverů:
- ESRI World Imagery: `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`
- Nebo jiný volně dostupný satelitní tile server

Zoom level zvol tak, aby rozlišení bylo co nejvyšší (min. zoom 16-17) a výsledný obraz měl alespoň 3000px na delší straně.

### 3. Vykresli 4 okruhy
Parsuj GPX soubory a vykresli každý okruh jinou barvou přesně podle souřadnic:
- **Červená** (`#FF0000`, tloušťka 3-4px) – hlavní/nejdelší okruh
- **Modrá/cyan** (`#00BFFF`, tloušťka 3-4px) – střední okruh  
- **Žlutá** (`#FFD700`, tloušťka 3-4px) – krátký okruh
- **4. barva** – podle toho co najdeš v GPX souborech (pokud je zelená, použij `#00CC00`)

Linie musí být anti-aliased, smooth, bez artefaktů. Žádné markery, žádné popisky, žádná legenda – čistě jen trasy na satelitním podkladu.

### 4. Ulož výstup
- Formát: **JPEG, kvalita 95-100%**
- Rozlišení: co nejvyšší (ideálně 4000x3000 nebo víc)
- Ulož do: `public/images/mapa-okruhy-satelit.jpg`
- Pokud složka neexistuje, vytvoř ji

### 5. Technické poznámky
- GPS souřadnice převeď na pixel pozice podle tile gridu
- Zajisti přesné zarovnání tras na satelitní podklad (Web Mercator projekce, EPSG:3857)
- Nepoužívej žádné API klíče – jen volně dostupné tile servery
- Pokud contextily nefunguje, stáhni tiles ručně přes requests a slož je Pillow
- Výsledek NESMÍ mít žádné GUI okno – jen uložení souboru

### Ověření
Po vygenerování mi ukaž:
- Rozlišení výsledného JPG
- Velikost souboru
- Cestu kam byl uložen
