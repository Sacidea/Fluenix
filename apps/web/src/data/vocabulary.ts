export interface VocabWord {
  id: string
  word: string
  phonetic: string
  type: 'Noun' | 'Verb' | 'Adjective' | 'Adverb'
  definition: string
  turkishMeaning: string
  contextSentence: string
  difficulty: 'Intermediate' | 'Advanced' | 'Expert'
}

export const mockVocabulary: VocabWord[] = [
  {
    id: 'vocab_1',
    word: 'Idempotent',
    phonetic: '/ˌaɪdɛmˈpoʊtənt/',
    type: 'Adjective',
    definition: 'Denoting an operation that can be applied multiple times without changing the result beyond the initial application.',
    turkishMeaning: 'Birden fazla kez uygulandığında sonucu değiştirmeyen (işlem)',
    contextSentence: 'We must ensure the payment webhook is idempotent to avoid double-charging the client during automatic retries.',
    difficulty: 'Advanced'
  },
  {
    id: 'vocab_2',
    word: 'Deprecate',
    phonetic: '/ˈdɛprɪkeɪt/',
    type: 'Verb',
    definition: 'To mark a feature or API as obsolete and discourage its use, usually before removing it entirely.',
    turkishMeaning: 'Eski işaretlemek, kullanımdan kaldırmak',
    contextSentence: 'We plan to deprecate the v1 authentication endpoint by Q3, so please migrate your services to v2.',
    difficulty: 'Intermediate'
  },
  {
    id: 'vocab_3',
    word: 'Bottleneck',
    phonetic: '/ˈbɒtlnɛk/',
    type: 'Noun',
    definition: 'A point of congestion in a system that slows down the overall process or reduces throughput.',
    turkishMeaning: 'Darboğaz, sistemin yavaşlayan noktası',
    contextSentence: 'Database write locks became the primary bottleneck during the Black Friday traffic surge.',
    difficulty: 'Intermediate'
  },
  {
    id: 'vocab_4',
    word: 'Heuristic',
    phonetic: '/hjʊˈrɪstɪk/',
    type: 'Noun',
    definition: 'A practical, non-optimal approach to problem-solving that is sufficient for immediate goals.',
    turkishMeaning: 'Sezgisel yöntem, pratik çözüm yaklaşımı',
    contextSentence: 'Since calculating the exact shortest path takes too long, we use a heuristic approach to estimate it in real-time.',
    difficulty: 'Advanced'
  },
  {
    id: 'vocab_5',
    word: 'Throughput',
    phonetic: '/ˈθruːpʊt/',
    type: 'Noun',
    definition: 'The amount of data processed by a system or the rate of production in a given time period.',
    turkishMeaning: 'Verim, birim zamanda işlenen veri miktarı',
    contextSentence: 'By switching from a monolithic architecture to microservices, we increased our system throughput by 400%.',
    difficulty: 'Advanced'
  },
  {
    id: 'vocab_6',
    word: 'Latency',
    phonetic: '/ˈleɪtnsi/',
    type: 'Noun',
    definition: 'The delay before a transfer of data begins following an instruction for its transfer.',
    turkishMeaning: 'Gecikme süresi, veri iletim gecikmesi',
    contextSentence: 'To reduce network latency for our European users, we deployed edge caching nodes in Frankfurt and Paris.',
    difficulty: 'Intermediate'
  },
  {
    id: 'vocab_7',
    word: 'Polyglot',
    phonetic: '/ˈpɒlɪɡlɒt/',
    type: 'Adjective',
    definition: 'In software, a system that uses multiple programming languages or storage technologies.',
    turkishMeaning: 'Çokdilli, birden fazla dil veya teknoloji kullanan',
    contextSentence: 'Our microservices architecture is truly polyglot; we use Go for the routing layer and Python for data processing.',
    difficulty: 'Advanced'
  },
  {
    id: 'vocab_8',
    word: 'Frictionless',
    phonetic: '/ˈfrɪkʃənləs/',
    type: 'Adjective',
    definition: 'Achieved with or involving little difficulty; a seamless user experience.',
    turkishMeaning: 'Sürtünmesiz, akıcı, engelsiz kullanıcı deneyimi',
    contextSentence: 'The goal of this redesign is to make the onboarding process completely frictionless for new enterprise clients.',
    difficulty: 'Intermediate'
  },
  {
    id: 'vocab_9',
    word: 'Dogfooding',
    phonetic: '/ˈdɒɡˌfuːdɪŋ/',
    type: 'Verb',
    definition: 'The practice of an organization using its own product to test it before making it available to the public.',
    turkishMeaning: 'Kendi ürününü bizzat kullanarak test etme pratiği',
    contextSentence: "We'll be dogfooding the new beta release internally for two weeks before we roll it out to external users.",
    difficulty: 'Intermediate'
  },
  {
    id: 'vocab_10',
    word: 'Ephemeral',
    phonetic: '/ɪˈfɛmərəl/',
    type: 'Adjective',
    definition: 'Lasting for a very short time; in computing, referring to temporary resources like short-lived containers.',
    turkishMeaning: 'Geçici, kısa ömürlü (container, kaynak)',
    contextSentence: 'Serverless functions are ephemeral by nature, meaning you cannot rely on local state persisting between invocations.',
    difficulty: 'Expert'
  },
  {
    id: 'vocab_11',
    word: 'Technical Debt',
    phonetic: '/ˈtɛknɪkəl dɛt/',
    type: 'Noun',
    definition: 'The implied cost of additional rework caused by choosing an easy solution now instead of a better approach.',
    turkishMeaning: 'Teknik borç, kısa yol seçiminin ileriki maliyeti',
    contextSentence: 'If we skip writing unit tests to meet this deadline, we will accumulate massive technical debt next quarter.',
    difficulty: 'Intermediate'
  },
  {
    id: 'vocab_12',
    word: 'Obfuscate',
    phonetic: '/ˈɒbfʌskeɪt/',
    type: 'Verb',
    definition: 'To make something obscure, unclear, or unintelligible; in code, to prevent reverse engineering.',
    turkishMeaning: 'Karartmak, anlaşılmaz hale getirmek (kodu gizlemek)',
    contextSentence: 'Before deploying the client-side bundle to production, make sure the build script obfuscates the source code.',
    difficulty: 'Expert'
  },
  {
    id: 'vocab_13',
    word: 'Resilience',
    phonetic: '/rɪˈzɪliəns/',
    type: 'Noun',
    definition: 'The capacity of a system to maintain acceptable service levels in the face of faults.',
    turkishMeaning: 'Esneklik, hataya dayanıklılık',
    contextSentence: 'We implemented the circuit breaker pattern to improve the resilience of our downstream microservice calls.',
    difficulty: 'Advanced'
  },
  {
    id: 'vocab_14',
    word: 'Coupling',
    phonetic: '/ˈkʌplɪŋ/',
    type: 'Noun',
    definition: 'The degree of interdependence between software modules; tight coupling makes systems harder to maintain.',
    turkishMeaning: 'Bağımlılık derecesi, modüller arası sıkı bağlantı',
    contextSentence: 'The tight coupling between the billing service and the user database makes it extremely difficult to scale them independently.',
    difficulty: 'Advanced'
  },
  {
    id: 'vocab_15',
    word: 'Concomitant',
    phonetic: '/kənˈkɒmɪtənt/',
    type: 'Adjective',
    definition: 'Naturally accompanying or associated with something else.',
    turkishMeaning: 'Eşzamanlı, beraberinde gelen, eşlik eden',
    contextSentence: 'The migration to the cloud resulted in significant scalability improvements and a concomitant reduction in hardware maintenance costs.',
    difficulty: 'Expert'
  },
  {
    id: 'vocab_16',
    word: 'Graceful Degradation',
    phonetic: '/ˈɡreɪsfl ˌdɛɡrəˈdeɪʃn/',
    type: 'Noun',
    definition: 'The ability of a system to maintain limited functionality even when a portion of it fails.',
    turkishMeaning: 'Zarif bozulma, kısmi arızada sınırlı işlevselliği koruyabilme',
    contextSentence: "Our search feature uses graceful degradation — if the AI ranking model is down, it falls back to simple keyword matching.",
    difficulty: 'Advanced'
  },
  {
    id: 'vocab_17',
    word: 'Leverage',
    phonetic: '/ˈliːvərɪdʒ/',
    type: 'Verb',
    definition: 'To use something to maximum advantage; commonly used in engineering contexts to mean utilizing existing tools or infrastructure.',
    turkishMeaning: 'Kaldıraç olarak kullanmak, avantajlı biçimde yararlanmak',
    contextSentence: "We can leverage our existing Kafka infrastructure to build the real-time notification pipeline without reinventing the wheel.",
    difficulty: 'Intermediate'
  },
  {
    id: 'vocab_18',
    word: 'Proliferate',
    phonetic: '/prəˈlɪfəreɪt/',
    type: 'Verb',
    definition: 'To increase rapidly in number; in software, to describe the rapid spread of services, dependencies, or configs.',
    turkishMeaning: 'Hızla çoğalmak, yayılmak (servis, bağımlılık)',
    contextSentence: "Without clear ownership boundaries, microservices tend to proliferate uncontrollably, making the system nearly impossible to debug.",
    difficulty: 'Advanced'
  },
  {
    id: 'vocab_19',
    word: 'Granular',
    phonetic: '/ˈɡrænjʊlər/',
    type: 'Adjective',
    definition: 'Including small details; in software, referring to fine-grained control or permissions.',
    turkishMeaning: 'Ayrıntılı, ince taneli, detaylı düzeyde',
    contextSentence: "The new RBAC system gives us granular control over which teams can deploy to which environments.",
    difficulty: 'Intermediate'
  },
  {
    id: 'vocab_20',
    word: 'Orthogonal',
    phonetic: '/ɔːrˈθɒɡənəl/',
    type: 'Adjective',
    definition: 'In software design, features or components that have no effect on each other — changing one does not impact the other.',
    turkishMeaning: 'Birbirinden bağımsız, dik (tasarımda bağlantısız özellikler)',
    contextSentence: "Good API design keeps authentication and authorization orthogonal — they should be independently configurable.",
    difficulty: 'Expert'
  },
  {
    id: 'vocab_21',
    word: 'Actionable',
    phonetic: '/ˈækʃənəbl/',
    type: 'Adjective',
    definition: 'Able to be acted on; providing clear steps or insights that can be directly applied.',
    turkishMeaning: 'Uygulanabilir, harekete geçirilebilir (somut adımlar sunan)',
    contextSentence: "The post-mortem report must include actionable items with clear owners and deadlines, not just a description of what went wrong.",
    difficulty: 'Intermediate'
  },
  {
    id: 'vocab_22',
    word: 'Synchronous',
    phonetic: '/ˈsɪŋkrənəs/',
    type: 'Adjective',
    definition: 'Occurring at the same time or requiring one operation to complete before the next begins.',
    turkishMeaning: 'Eşzamanlı, senkron (bir işlem bitince diğeri başlar)',
    contextSentence: "Switching from synchronous database calls to async patterns reduced our API response time by 60%.",
    difficulty: 'Intermediate'
  },
  {
    id: 'vocab_23',
    word: 'Propagate',
    phonetic: '/ˈprɒpəɡeɪt/',
    type: 'Verb',
    definition: 'To spread or transmit; in distributed systems, to spread data or changes across nodes.',
    turkishMeaning: 'Yaymak, iletmek (değişikliği veya veriyi sisteme dağıtmak)',
    contextSentence: "It can take up to 30 seconds for a configuration change to propagate across all regional data centers.",
    difficulty: 'Advanced'
  },
  {
    id: 'vocab_24',
    word: 'Abstraction',
    phonetic: '/æbˈstrækʃn/',
    type: 'Noun',
    definition: 'The process of hiding complex implementation details and exposing only the necessary interface.',
    turkishMeaning: 'Soyutlama, karmaşıklığı gizleyip sade bir arayüz sunma',
    contextSentence: "The payment gateway SDK provides a clean abstraction so our backend engineers never have to deal with raw banking APIs.",
    difficulty: 'Intermediate'
  },
  {
    id: 'vocab_25',
    word: 'Mandate',
    phonetic: '/ˈmændeɪt/',
    type: 'Verb',
    definition: 'To officially require or order something; to make something compulsory.',
    turkishMeaning: 'Zorunlu kılmak, resmi olarak şart koşmak',
    contextSentence: "Engineering leadership mandated that all new services must have at least 80% unit test coverage before merging to main.",
    difficulty: 'Intermediate'
  }
]

