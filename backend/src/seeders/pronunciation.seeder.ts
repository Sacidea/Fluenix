import { Prisma } from '@prisma/client'

/**
 * Veritabanı boşken eklenecek varsayılan telaffuz kelimeleri.
 * Bu veri iş mantığına (PronunciationService) değil, seed katmanına aittir (SRP).
 */
export const DEFAULT_PRONUNCIATION_WORDS: Prisma.PronunciationWordCreateInput[] = [
  { word: 'Kubernetes',       category: 'DevOps',        phonetic: 'koo-ber-NET-eez' },
  { word: 'PostgreSQL',       category: 'Database',      phonetic: 'POST-gres-Q-L' },
  { word: 'asynchronous',     category: 'Programming',   phonetic: 'ay-SINK-ruh-nus' },
  { word: 'algorithm',        category: 'Programming',   phonetic: 'AL-go-rith-um' },
  { word: 'deprecated',       category: 'Programming',   phonetic: 'DEP-ruh-kay-ted' },
  { word: 'repository',       category: 'Git',           phonetic: 'reh-POZ-ih-tor-ee' },
  { word: 'microservices',    category: 'Architecture',  phonetic: 'MY-kro-SUR-vi-sez' },
  { word: 'authentication',   category: 'Security',      phonetic: 'aw-then-tih-KAY-shun' },
  { word: 'bandwidth',        category: 'Network',       phonetic: 'BAND-width' },
  { word: 'recursion',        category: 'Programming',   phonetic: 'reh-KUR-zhun' },
  { word: 'infrastructure',   category: 'DevOps',        phonetic: 'IN-fra-struk-chur' },
  { word: 'polymorphism',     category: 'OOP',           phonetic: 'pol-ee-MOR-fiz-um' },
  { word: 'synchronization',  category: 'Programming',   phonetic: 'sin-kruh-nih-ZAY-shun' },
  { word: 'refactoring',      category: 'Programming',   phonetic: 'ree-FAK-tor-ing' },
  { word: 'middleware',       category: 'Backend',       phonetic: 'MID-ul-wair' },
  { word: 'scalability',      category: 'Architecture',  phonetic: 'skay-luh-BIL-ih-tee' },
  { word: 'encapsulation',    category: 'OOP',           phonetic: 'en-kap-syoo-LAY-shun' },
  { word: 'throughput',       category: 'Network',       phonetic: 'THROO-put' },
  { word: 'idempotent',       category: 'API',           phonetic: 'eye-DEM-poh-tent' },
  { word: 'concatenate',      category: 'Programming',   phonetic: 'kon-KAT-en-ayt' },
]
