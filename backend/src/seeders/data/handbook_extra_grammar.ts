export const handbook_extra_grammar = [
  {
    "category": "Conditionals",
    "title": "Unless — Negative Condition",
    "explanation": "'Unless' means 'if not'. It introduces a negative condition without using 'not'. Do NOT use 'unless ... not' — that creates a double negative. Common in error handling logic.",
    "correctExample": "The deployment will fail unless all tests pass.",
    "wrongExample": "The deployment will fail unless all tests don't pass.",
    "level": "B2",
    "lessonContent": "# Unless (Eğer ... Olmazsa)\n\nYazılımda \"If Not\" bloklarının İngilizce karşılığıdır. Cümleye \"If\" koyup arkasından \"not\" demek yerine, doğrudan \"Unless\" kullanmak kodu kısaltmak (refactor) gibidir.\n\n## Nerede Kullanılır?\n*   ✅ *\"**Unless** you specify a port, it will use 8080.\"* (Port belirtmezsen, 8080'i kullanacak.)\n*   ❌ *\"If you don't specify a port...\"* (Doğrudur ama Unless daha profesyoneldir.)"
  },
  {
    "category": "Conditionals",
    "title": "Provided That / As Long As — Strong Conditions",
    "explanation": "'Provided that' and 'as long as' mean 'only if this condition is met'. They are more formal and emphatic than 'if'. Common in SLAs, contracts, and technical requirements.",
    "correctExample": "The system will scale automatically, provided that the auto-scaling policy is configured correctly.",
    "wrongExample": "The system will scale automatically, providing the auto-scaling policy is configured correctly.",
    "level": "C1",
    "lessonContent": "# Provided That / As Long As (Şartıyla / Sürece)\n\nBir API anahtarının veya bir güvenlik önleminin olmazsa olmaz olduğunu belirtirken \"If\" kelimesi zayıf kalır. Bu gibi \"Kesin Şart\" belirten durumlarda kullanılır.\n\n## Nerede Kullanılır?\n*   ✅ *\"You can use the API **provided that** you send the auth token.\"* \n*   (Auth token'ı göndermen şartıyla API'yi kullanabilirsin.)\n*   ✅ *\"The system is safe **as long as** the firewall is active.\"*"
  },
  {
    "category": "Conditionals",
    "title": "Inverted Conditionals — Formal Writing",
    "explanation": "In formal writing, conditionals can be inverted by omitting 'if' and placing the auxiliary first. 'If you should need help' → 'Should you need help'. Common in RFCs, technical specs, and documentation.",
    "correctExample": "Should the primary server fail, the load balancer will route traffic to the backup.",
    "wrongExample": "If should the primary server fail, the load balancer will route traffic to the backup.",
    "level": "C1",
    "lessonContent": "# Inverted Conditionals (Devrik Şart Cümleleri)\n\nResmi dokümantasyonlarda \"If\" kelimesini atıp devrik cümle kurmak çok havalı (FAANG seviyesi) bir yöntemdir. Özellikle \"Should\" ve \"Had\" ile başlar.\n\n## Formül\n*   *If you should need help...* -> **Should you need help...**\n*   ✅ *\"**Should** the primary database fail, the replica takes over.\"* (Eğer ana veritabanı çökecek olursa...)"
  },
  {
    "category": "Modal Verbs",
    "title": "Would — Polite Requests & Offers",
    "explanation": "'Would' makes requests and offers more polite. In professional emails and standups, 'would' softens directives and sounds more collaborative than 'will'.",
    "correctExample": "Would you be able to review this PR before EOD?",
    "wrongExample": "Can you review this PR before EOD? (less polite in formal context)",
    "level": "B2",
    "lessonContent": "# Would (Nazik Ricalar)\n\nMüşteri destek maillerinde veya takım içi rica mesajlarında \"Can you\" demek yerine \"Would you\" demek profesyonel nezakettir.\n\n*   ❌ *\"Fix this bug.\"* (Emir)\n*   ✅ *\"**Would** you mind taking a look at this bug?\"* (Bu hataya bir göz atman mümkün mü?)"
  },
  {
    "category": "Modal Verbs",
    "title": "Should Have — Criticism of Past Actions",
    "explanation": "'Should have + past participle' expresses that something was expected but didn't happen — used in retrospectives and postmortems. 'Shouldn't have' means something happened but was a mistake.",
    "correctExample": "We should have added rate limiting before launching the public API.",
    "wrongExample": "We should add rate limiting before launching the public API.",
    "level": "B2",
    "lessonContent": "# Should Have (Geçmişteki Hataları Eleştirme)\n\n\"Yapmalıydın ama yapmadın\" anlamı taşır. Geçmişte yapılan bir hata için takım arkadaşınıza veya kendinize yönelik hafif eleştiri barındırır.\n\n## Formül\n`should have + V3`\n\n*   ✅ *\"We **should have written** unit tests for this module.\"*\n*   (Bu modül için birim testleri yazmalıydık - *ama yazmadık ve çöktü.*)"
  },
  {
    "category": "Modal Verbs",
    "title": "Could Have — Missed Opportunity in the Past",
    "explanation": "'Could have + past participle' means something was possible in the past but didn't happen. It expresses a missed opportunity — very useful in retrospectives.",
    "correctExample": "We could have caught this bug earlier if we had better test coverage.",
    "wrongExample": "We could catch this bug earlier if we had better test coverage.",
    "level": "C1",
    "lessonContent": "# Could Have (Geçmişte Kaçan Fırsatlar)\n\n\"Yapabilirdik ama yapmadık.\" Teknolojik seçimleri veya kaçırılmış alternatif senaryoları tartışırken kullanılır.\n\n## Formül\n`could have + V3`\n\n*   ✅ *\"We **could have used** GraphQL here, but we chose REST.\"*\n*   (Burada GraphQL kullanabilirdik, ama REST'i seçtik.)"
  },
  {
    "category": "Modal Verbs",
    "title": "Must Have — Logical Deduction About the Past",
    "explanation": "'Must have + past participle' is used when you are almost certain something happened in the past based on evidence. Common in debugging sessions.",
    "correctExample": "The cache must have been cleared during the maintenance window — that's why response times dropped.",
    "wrongExample": "The cache must cleared during the maintenance window.",
    "level": "C1",
    "lessonContent": "# Must Have (Geçmişe Dair Mantıksal Çıkarım)\n\nBir hatanın loglarına baktınız ve %100 eminsiniz ki sunucu hafıza dolduğu için çökmüş. Bunu takıma \"Kesin böyle olmuştur\" diye aktarırken kullanılır.\n\n## Formül\n`must have + V3`\n\n*   ✅ *\"The server **must have run** out of memory.\"*\n*   (Sunucunun kesinlikle belleği tükenmiş olmalı - *Loglara bakarak çıkardığım kesin sonuç.*)"
  },
  {
    "category": "Passive Voice",
    "title": "Future Passive — Planned Changes",
    "explanation": "Used in release notes and roadmaps for planned changes. Structure: will + be + past participle.",
    "correctExample": "The legacy endpoint will be deprecated in version 4.0.",
    "wrongExample": "The legacy endpoint will deprecate in version 4.0.",
    "level": "B2",
    "lessonContent": "# Future Passive (Gelecekte Planlanan Değişiklikler)\n\nGelecekte yapılacak bir mimari değişikliği takıma duyururken işlemi kimin yapacağı önemli değilse kullanılır.\n\n*   ✅ *\"The legacy API **will be deprecated** next month.\"*\n*   (Eski API önümüzdeki ay kullanımdan kaldırılacak.)"
  },
  {
    "category": "Passive Voice",
    "title": "Perfect Passive — Recently Completed Actions",
    "explanation": "Used in status updates and changelogs. Structure: have/has + been + past participle.",
    "correctExample": "The memory leak has been identified and patched in the latest commit.",
    "wrongExample": "The memory leak has identified and patched in the latest commit.",
    "level": "B2",
    "lessonContent": "# Perfect Passive (Yeni Biten Eylemler)\n\nBir sorunun henüz yeni çözüldüğünü (Present Perfect) pasif bir dille aktarmak.\n*   ✅ *\"The vulnerability **has been patched**.\"*\n*   (Güvenlik açığı kapatıldı -> Şu an sistem güvende.)"
  },
  {
    "category": "Passive Voice",
    "title": "Passive with By-Agent — When the Doer Matters",
    "explanation": "In passive sentences, use 'by + agent' only when the doer of the action is important or surprising. Omit it when the doer is unknown, unimportant, or obvious.",
    "correctExample": "The new caching strategy was proposed by the infrastructure team.",
    "wrongExample": "The bug was fixed by someone.",
    "level": "C1",
    "lessonContent": "# Passive with By-Agent (Yapan Kişi Önemliyse)\n\nGenelde pasif cümlelerde özne (işi yapan) gizlenir. Ancak işi yapan sistem/algoritma çok önemliyse, onu \"by\" ile ekleriz.\n\n*   ✅ *\"The load balancing is managed **by Kubernetes**.\"*\n*   (Yük dengeleme Kubernetes tarafından yönetilir.)"
  },
  {
    "category": "Prepositions",
    "title": "Responsible For — Not Responsible Of",
    "explanation": "Always use 'responsible for' — not 'responsible of'. This phrase is used constantly in job descriptions and ownership discussions.",
    "correctExample": "The platform team is responsible for maintaining the CI/CD pipeline.",
    "wrongExample": "The platform team is responsible of maintaining the CI/CD pipeline.",
    "level": "B1",
    "lessonContent": "# Responsible For (Sorumlu Olmak)\n\nÇok sık yapılan bir hatadır. Bir modülden sorumlu olduğunuzu söylerken edat \"of\" değil \"for\" olmalıdır.\n\n*   ❌ *\"I am responsible of the backend.\"*\n*   ✅ *\"I am responsible **for** the backend.\"*"
  },
  {
    "category": "Prepositions",
    "title": "Integrate With — Not Integrate To",
    "explanation": "When two systems connect, we say they 'integrate with' each other. 'Integrate into' means to embed something into a whole.",
    "correctExample": "Our service integrates with Stripe for payment processing.",
    "wrongExample": "Our service integrates to Stripe for payment processing.",
    "level": "B2",
    "lessonContent": "# Integrate With (Entegre Etmek)\n\nBir sistemi diğeriyle konuştururken (entegrasyon) aralarındaki ilişki \"birlikte çalışmak\" olduğu için edat \"with\" olur.\n\n*   ❌ *\"We integrated the app to Stripe.\"*\n*   ✅ *\"We integrated the app **with** Stripe.\"*"
  },
  {
    "category": "Prepositions",
    "title": "At Scale — Common Tech Phrase",
    "explanation": "'At scale' means operating at a large volume. Do not use 'in scale' or 'on scale'. Other important fixed phrases: 'at runtime', 'at compile time', 'at rest' (data), 'in transit' (data).",
    "correctExample": "This approach works well in development but breaks at scale.",
    "wrongExample": "This approach works well in development but breaks in scale.",
    "level": "B2",
    "lessonContent": "# At Scale (Ölçekte / Büyük Çaplı)\n\nYazılım dünyasının en havalı kelimelerinden biridir. Bir uygulamanın çok büyük veri veya kullanıcı sayısıyla başa çıkabilmesi demektir. Daima \"at\" ile kullanılır.\n\n*   ✅ *\"This algorithm doesn't work well **at scale**.\"*\n*   (Bu algoritma büyük ölçekte (çok veri gelince) iyi çalışmıyor.)"
  },
  {
    "category": "Articles",
    "title": "A/An with Abbreviations & Acronyms",
    "explanation": "Use 'an' before abbreviations and acronyms that start with a vowel SOUND: an API, an MVP, an SQL query, an HTTP request, an IDE. Use 'a' before consonant sounds: a URL, a CI/CD pipeline, a PR.",
    "correctExample": "We need an MVP before we can pitch to investors.",
    "wrongExample": "We need a MVP before we can pitch to investors.",
    "level": "B1",
    "lessonContent": "# A/An (Kısaltmalarda Sese Göre Seçim)\n\nBunu daha önce görmüştük. \"A\" ve \"An\", kelimenin ilk harfine değil, ilk harfin **okunuşuna** göre değişir.\n\n*   ✅ **An** API (Okunuşu: *ey*-pi-ay)\n*   ✅ **An** SQL query (Okunuşu: *es*-ku-el)\n*   ✅ **A** URL (Okunuşu: *yu*-ar-el)"
  },
  {
    "category": "Articles",
    "title": "The — First vs. Second Mention",
    "explanation": "When introducing something for the first time, use 'a/an'. When referring to the same thing again, use 'the'. This is the core logic behind article choice.",
    "correctExample": "We built a new caching layer. The caching layer reduced latency by 40%.",
    "wrongExample": "We built a new caching layer. A caching layer reduced latency by 40%.",
    "level": "B2",
    "lessonContent": "# The (İlk ve İkinci Kez Bahsetme)\n\nBir objeyi kodda ilk kez deklare ederken (const) \"A\" kullanırsınız. Ama aynı objeyi ikinci kez (update) kullanırken artık bilinen bir obje olduğu için \"The\" kullanırsınız.\n\n*   ✅ *\"We received **an** error. **The** error was related to auth.\"*\n    *   (Bir hata aldık. Hata kimlik doğrulama ile ilgiliydi.)"
  },
  {
    "category": "Subject-Verb Agreement",
    "title": "None Of — Singular or Plural?",
    "explanation": "'None of + plural noun' can take either singular or plural verb. However, in formal American English, singular is preferred. 'None of the tests pass/passes'. In practice, plural is widely accepted.",
    "correctExample": "None of the unit tests is passing after the refactor.",
    "wrongExample": "None of the unit tests are passing. (acceptable but informal)",
    "level": "C1",
    "lessonContent": "# None Of (Hiçbiri)\n\n\"None of\" yapısından sonra genelde çoğul bir kelime (the servers) gelse de, fiil resmi dilde **tekil (is/has)** olur. Ancak günlük dilde çoğul (are/have) kabul edilir. Yazılım dokümanlarında tekil kullanmak daha güvenlidir.\n\n*   ✅ *\"None of the tests **has** passed.\"* (Resmi)\n*   ✅ *\"None of the tests **have** passed.\"* (Günlük, Slack)"
  },
  {
    "category": "Subject-Verb Agreement",
    "title": "There Is vs. There Are",
    "explanation": "The verb agrees with the noun that follows. Use 'there is' for singular and uncountable nouns. Use 'there are' for plural nouns. Do not use 'there's' with plural in formal writing.",
    "correctExample": "There are three endpoints that need to be documented.",
    "wrongExample": "There is three endpoints that need to be documented.",
    "level": "B1",
    "lessonContent": "# There Is vs. There Are (Varlık Bildirme)\n\n\"There is/are\" (Var) yapısından sonra gelen **ilk ismin** tekil mi çoğul mu olduğuna göre \"is\" veya \"are\" seçilir. Sonrasındaki isimler sayılmaz.\n\n*   ✅ *\"There **is** a bug and two typos in the file.\"* (İlk kelime \"a bug\" tekil olduğu için \"is\".)\n*   ✅ *\"There **are** two typos and a bug.\"* (İlk kelime \"two typos\" çoğul olduğu için \"are\".)"
  },
  {
    "category": "Gerunds & Infinitives",
    "title": "Stop + Gerund vs. Stop + Infinitive",
    "explanation": "'Stop + gerund' means to quit doing something. 'Stop + infinitive' means to pause in order to do something. The meaning changes completely depending on the form.",
    "correctExample": "We stopped deploying on Fridays to reduce the risk of weekend incidents.",
    "wrongExample": "We stopped to deploy on Fridays to reduce risk. (means we paused to deploy)",
    "level": "B2",
    "lessonContent": "# Stop doing vs. Stop to do (Bırakmak vs. Durup Yapmak)\n\nKritik bir farktır!\n1. **Stop + V-ing:** O eylemi artık tamamen bırakmak.\n   * ✅ *\"We **stopped using** jQuery.\"* (jQuery kullanmayı bıraktık.)\n2. **Stop + to V1:** Başka bir şey yapmak için durmak (mola vermek).\n   * ✅ *\"I **stopped to use** the bathroom.\"* (Tuvalete gitmek için işi bıraktım/durdum.)"
  },
  {
    "category": "Gerunds & Infinitives",
    "title": "Remember + Gerund vs. Remember + Infinitive",
    "explanation": "'Remember + gerund' refers to a past action (you remember doing it). 'Remember + infinitive' refers to a duty or future task (remember to do it). Critical in documentation and task management.",
    "correctExample": "Remember to push your changes before the build runs.",
    "wrongExample": "Remember pushing your changes before the build runs.",
    "level": "B2",
    "lessonContent": "# Remember doing vs. Remember to do\n\n1. **Remember to V1:** İleriye dönük yapılması gereken bir şeyi hatırlamak (TODO list).\n   * ✅ *\"**Remember to push** your code.\"* (Kodunu pushlamayı unutma/hatırla.)\n2. **Remember V-ing:** Geçmişte yapılan bir olayı (anıyı) hatırlamak.\n   * ✅ *\"I **remember fixing** this bug last year.\"* (Bu hatayı geçen sene çözdüğümü hatırlıyorum.)"
  },
  {
    "category": "Gerunds & Infinitives",
    "title": "Subject Position — Gerund as Subject",
    "explanation": "When using a verb as the subject of a sentence, use the gerund (-ing) form — not the infinitive. This is common in engineering principles and best practices.",
    "correctExample": "Writing unit tests before implementation is the core of TDD.",
    "wrongExample": "To write unit tests before implementation is the core of TDD.",
    "level": "B2",
    "lessonContent": "# Gerund as Subject (-ing ile İsimleştirme)\n\nİngilizcede bir eylemi cümlenin öznesi yapmak istiyorsanız, o fiile mutlaka \"-ing\" takısı getirmelisiniz.\n\n*   ❌ *\"Refactor the code takes time.\"* (Fiil özne olamaz)\n*   ✅ *\"**Refactoring** the code takes time.\"* (Kodu refactor etmek zaman alır.)"
  },
  {
    "category": "Relative Clauses",
    "title": "Whom — Formal Object Pronoun",
    "explanation": "'Whom' is the object form of 'who'. Use 'whom' when the relative pronoun is the object of the verb in the clause. A trick: if you can substitute 'him/her', use 'whom'. Common in job descriptions and formal emails.",
    "correctExample": "The engineer whom we interviewed last week has accepted the offer.",
    "wrongExample": "The engineer who we interviewed last week has accepted the offer.",
    "level": "C1",
    "lessonContent": "# Whom (Kimi / Kime)\n\nNesne (Object) durumundaki kişiler için resmi dokümantasyonlarda \"Who\" yerine \"Whom\" kullanılır. En çok \"To whom\" yapısında görülür.\n\n*   ✅ *\"The manager **to whom** I reported the issue is on leave.\"*\n*   (Sorunu bildirdiğim yönetici izinde.)"
  },
  {
    "category": "Relative Clauses",
    "title": "Whose — Possessive Relative Pronoun",
    "explanation": "'Whose' shows possession in relative clauses. It can refer to both people and things. Common when describing systems and services.",
    "correctExample": "We need to rewrite the module whose dependencies are outdated.",
    "wrongExample": "We need to rewrite the module who's dependencies are outdated.",
    "level": "B2",
    "lessonContent": "# Whose (Kimin / Ki Onun)\n\nBir nesnenin veya sistemin aitlik/sahiplik durumunu belirtmek için kullanılır.\n\n*   ✅ *\"We use AWS, **whose** documentation is excellent.\"*\n*   (Dokümantasyonu mükemmel olan AWS'i kullanıyoruz.)"
  },
  {
    "category": "Reported Speech",
    "title": "Reporting Modal Verbs — Will, Can, May",
    "explanation": "Modal verbs also shift in reported speech: will → would, can → could, may → might, shall → should, must → had to/must (depending on meaning). Important for meeting minutes.",
    "correctExample": "The CTO said that the team would complete the migration by Q3.",
    "wrongExample": "The CTO said that the team will complete the migration by Q3.",
    "level": "B2",
    "lessonContent": "# Reporting Modal Verbs (Kipleri Geçmişe Kaydırma)\n\nBir toplantıda söylenen sözü raporlarken (Backshift), kipler de bir adım geriye gider.\n*   **Will -> Would**\n*   **Can -> Could**\n*   **May -> Might**\n\n*   ✅ *\"The DevOps team said they **would** deploy the fix today.\"*"
  },
  {
    "category": "Reported Speech",
    "title": "Reporting Requests & Commands",
    "explanation": "Reported commands use 'told/asked + object + to + base verb'. Negative commands use 'told/asked + object + not + to + base verb'.",
    "correctExample": "The tech lead told the team to freeze all non-critical deployments.",
    "wrongExample": "The tech lead told the team that freeze all non-critical deployments.",
    "level": "B2",
    "lessonContent": "# Reporting Requests (Ricaları Raporlama)\n\nBirinin bizden yapmamızı istediği (emir veya rica) şeyleri raporlarken \"ask/tell someone **to do** something\" yapısı kullanılır.\n\n*   ✅ *\"My tech lead asked me **to review** the PR.\"*\n*   (Takım liderim benden PR'ı incelememi istedi.)"
  },
  {
    "category": "Comparatives & Superlatives",
    "title": "As ... As — Equality Comparisons",
    "explanation": "Use 'as + adjective/adverb + as' to show that two things are equal. Use 'not as ... as' for inequality. Common when benchmarking systems and tools.",
    "correctExample": "Redis is as fast as Memcached for simple key-value lookups.",
    "wrongExample": "Redis is as fast than Memcached for simple key-value lookups.",
    "level": "B1",
    "lessonContent": "# As ... As (Eşitlik Karşılaştırmaları)\n\nİki teknolojinin birbirine \"kadar\" benzediğini (eşit düzeyde olduğunu) belirtmek için kullanılır.\n\n*   ✅ *\"Python is not **as fast as** Go.\"*\n*   (Python, Go kadar hızlı değildir.)"
  },
  {
    "category": "Comparatives & Superlatives",
    "title": "Much / Far / Significantly — Intensifying Comparatives",
    "explanation": "Intensify comparative adjectives with: much, far, significantly, considerably, slightly, a bit, a little. Never use 'very' with comparatives.",
    "correctExample": "The new indexing strategy is significantly faster than the previous one.",
    "wrongExample": "The new indexing strategy is very faster than the previous one.",
    "level": "B2",
    "lessonContent": "# Intensifiers (Karşılaştırmayı Şiddetlendirme)\n\nSadece \"daha hızlı\" demek yetmez, \"çok daha hızlı\" demek için \"much\", \"far\" veya \"significantly\" kullanılır. \"Very\" karşılaştırmalarda KULLANILMAZ.\n\n*   ❌ *\"This is very better.\"*\n*   ✅ *\"This is **much better**.\"* Veya *\"This is **significantly faster**.\"*"
  },
  {
    "category": "Word Order",
    "title": "Only — Placement Changes Meaning",
    "explanation": "'Only' should be placed directly before the word it modifies. Its position completely changes the meaning of the sentence. This is a critical precision skill in technical writing.",
    "correctExample": "Only the admin can delete user accounts. (no one else can) / The admin can only delete user accounts. (can't do other things)",
    "wrongExample": "The admin can delete only user accounts. (ambiguous placement)",
    "level": "C1",
    "lessonContent": "# Only (Yerine Göre Anlam Değişimi)\n\n\"Only\" kelimesi nereye konursa o kelimeyi sınırlar.\n*   ✅ *\"I **only** tested the backend.\"* (Sadece test ettim, kodu yazmadım.)\n*   ✅ *\"I tested **only** the backend.\"* (Sadece backend'i test ettim, frontend'i değil.)"
  },
  {
    "category": "Word Order",
    "title": "However / Therefore / Moreover — Sentence Connectors",
    "explanation": "Connectors like 'however', 'therefore', 'moreover', 'consequently', and 'furthermore' connect ideas between sentences. They come at the start of the new sentence, followed by a comma.",
    "correctExample": "The API response time exceeded the SLA threshold. Therefore, we triggered the incident response protocol.",
    "wrongExample": "The API response time exceeded the SLA threshold, therefore we triggered the incident response protocol.",
    "level": "B2",
    "lessonContent": "# Connectors (Bağlaçlar)\n\nKurumsal e-posta veya Slack mesajlarında cümleleri bağlamanın profesyonel yoludur. Noktalama işaretlerine dikkat edin (Noktalı virgülden sonra gelir, ardından virgül alır).\n\n*   ✅ *\"The system crashed; **therefore,** we lost some data.\"* (Bu nedenle...)\n*   ✅ *\"The API is fast; **however,** it lacks documentation.\"* (Ancak...)"
  },
  {
    "category": "Professional Phrasing",
    "title": "Nominalization — Turning Verbs into Nouns",
    "explanation": "Technical writing often uses nouns instead of verbs (nominalization). This creates a more formal, impersonal tone. 'We decided' → 'The decision was made'. Use it selectively — overuse makes text heavy.",
    "correctExample": "The implementation of the new caching layer resulted in a 40% reduction in latency.",
    "wrongExample": "We implemented new cache and this made latency 40% less.",
    "level": "C1",
    "lessonContent": "# Nominalization (İsimleştirme)\n\nÜst düzey teknik dokümanlarda fiil yerine \"Fiilin İsim Hali\" kullanılır. Bu dili daha profesyonel ve resmi (formal) yapar.\n\n*   *Normal (Slack):* *\"We failed because we didn't communicate.\"*\n*   ✅ *Resmi (Report):* *\"The failure was due to a **lack of communication**.\"* (İletişim eksikliği)"
  },
  {
    "category": "Professional Phrasing",
    "title": "Standup — Blocked On vs. Waiting For",
    "explanation": "'Blocked on' means you cannot proceed because something is in your way. 'Waiting for' is softer and means you are expecting something. Use 'blocked on' for impediments that need immediate attention.",
    "correctExample": "I am blocked on the security review — can someone prioritize it?",
    "wrongExample": "I am waiting for the security review. (doesn't communicate urgency)",
    "level": "B1",
    "lessonContent": "# Blocked On vs. Waiting For (Stand-up Jargonu)\n\n*   **Blocked On:** Tamamen tıkandım, bu sorun çözülmeden başka hiçbir iş yapamıyorum demek. (Çok güçlü bir kırmızı bayraktır).\n    *   ✅ *\"I am **blocked on** the database migration.\"*\n*   **Waiting For:** Bekliyorum ama o sırada başka ufak tefek işler (refactor vb.) yapıyorum.\n    *   ✅ *\"I am **waiting for** John's PR review.\"*"
  },
  {
    "category": "Professional Phrasing",
    "title": "LGTM — Written Approval Phrases",
    "explanation": "In international teams, clear approval phrases matter. 'LGTM' (Looks Good To Me), 'Approved with nits', 'Request changes' are standard. When writing full sentences, be explicit about your stance.",
    "correctExample": "This looks good to me. I have left a couple of minor suggestions, but they are non-blocking.",
    "wrongExample": "Ok I think it's maybe fine but you should check the other stuff.",
    "level": "B2",
    "lessonContent": "# LGTM & Code Review Kısaltmaları\n\nOpen Source (Açık Kaynak) ve kurumsal kültürde Code Review yaparken kısaltmalar hayat kurtarır.\n*   ✅ **LGTM:** *Looks Good To Me* (Benim için uygun, bir sorun görmüyorum -> Onaylıyorum)\n*   ✅ **WIP:** *Work In Progress* (Hala üzerinde çalışıyorum, merge etmeyin)\n*   ✅ **PTAL:** *Please Take A Look* (Lütfen bir göz atın)"
  }
]