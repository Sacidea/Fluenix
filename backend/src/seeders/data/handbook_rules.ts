export const handbook_rules = [
  {
    "category": "Conditionals",
    "title": "Zero Conditional — General Truths & Facts",
    "explanation": "Used for things that are always true — scientific facts, universal truths, and predictable outcomes in code. Structure: If + Present Simple, Present Simple.",
    "correctExample": "If you divide by zero, the program throws an error.",
    "wrongExample": "If you divide by zero, the program will throw an error.",
    "level": "B1",
    "lessonContent": "# Zero Conditional (Sıfırıncı Şart: Kesin Gerçekler)\n\nYazılımda **Pure Functions** (Saf Fonksiyonlar) kavramını düşünün: Aynı girdiyi verdiğinizde *her zaman* aynı çıktıyı alırsınız. İngilizcede bu kesinliği anlatan yapı **Zero Conditional**'dır.\n\nGelecekle ilgili bir tahmin yapmaz, tamamen doğa kanunları, sistem davranışları veya her zaman geçerli olan teknik gerçekleri ifade eder.\n\n## Formül\n`If + Present Simple`, `Present Simple`\n(İki taraf da geniş zaman)\n\n## Nerede Kullanılır?\n*   **Sistem Dokümantasyonu:** Sistemin nasıl tepki verdiğini anlatırken.\n    *   ✅ *\"If the memory usage **exceeds** 90%, the server **restarts** automatically.\"* (Eğer RAM kullanımı %90'ı geçerse, sunucu otomatik olarak yeniden başlar.)\n*   **Genel Geçer Teknik Doğrular:**\n    *   ✅ *\"If you **divide** by zero, it **throws** an exception.\"* (Sıfıra bölersen, hata fırlatır.)\n\n> **💡 Pro Tip:** Zero Conditional cümlelerinde \"If\" yerine \"When\" (ne zaman olursa) kullanabilirsiniz, anlam bozulmaz. \n> *\"When the memory usage exceeds 90%, the server restarts.\"*"
  },
  {
    "category": "Conditionals",
    "title": "First Conditional — Real & Possible Future",
    "explanation": "Used for real, likely situations in the future. Common in sprint planning and predictions. Structure: If + Present Simple, will + base verb.",
    "correctExample": "If we finish the API today, we will deploy it tomorrow.",
    "wrongExample": "If we will finish the API today, we will deploy it tomorrow.",
    "level": "B1",
    "lessonContent": "# First Conditional (Tip 1: Gerçekleşmesi Muhtemel Gelecek)\n\nYazılım dünyasında en çok kullanacağınız yapılardan biri **First Conditional**'dır. \n\nKod yazarken bir `if` bloğu yazdığınızı düşünün: *Eğer bu şart sağlanırsa, şu kodu çalıştır.* First conditional tam olarak budur. Gelecekte gerçekleşmesi **mümkün ve çok muhtemel** durumları anlatmak için kullanılır.\n\n## Formül\n`If + Present Simple (Geniş Zaman)`, `will + V1 (Gelecek Zaman)`\n\n## Ne Zaman Kullanılır?\n\n### 1. Sprint Planlama (Sprint Planning)\nGelecek haftanın planını yaparken olası senaryoları tartışırken kullanılır.\n*   ✅ *\"If we **finish** the API today, we **will deploy** it tomorrow.\"* \n*   (Eğer API'yi bugün bitirirsek, yarın canlıya alacağız.)\n\n### 2. Teknik Uyarılar ve Kod İnceleme (Code Reviews)\nBir koddaki potansiyel tehlikeyi takım arkadaşınıza söylerken kullanılır.\n*   ✅ *\"If you **remove** this index, the query **will be** extremely slow.\"*\n*   (Eğer bu indeksi silersen, sorgu aşırı derecede yavaşlayacak.)\n\n> **⚠️ En Çok Yapılan Hata (The 'Will' Trap)**\n> Türkçede \"Eğer yapacak isek\" gibi bir mantık kurduğumuz için İngilizcede `If` kısmına `will` getirme eğilimindeyiz. Bu **kesinlikle yanlıştır**. \n> *   ❌ Yanlış: If we **will** use React, we will need more frontend devs.\n> *   ✅ Doğru: If we **use** React, we will need more frontend devs."
  },
  {
    "category": "Conditionals",
    "title": "Second Conditional — Hypothetical Present/Future",
    "explanation": "Used for imaginary or unlikely situations. Great for brainstorming architecture decisions. Structure: If + Past Simple, would + base verb. Note: Use 'were' instead of 'was' for all subjects in formal English.",
    "correctExample": "If we used GraphQL, the frontend would be more flexible.",
    "wrongExample": "If we use GraphQL, the frontend would be more flexible.",
    "level": "B2",
    "lessonContent": "# Second Conditional (Tip 2: Hayali / Varsayımsal Durumlar)\n\nBir problemi çözerken bazen \"Öyle olmasaydı ne olurdu?\" diye beyin fırtınası yaparız. Şu anki gerçekliğin tam tersi olan **varsayımsal (hypothetical)** durumları konuşmak için **Second Conditional** kullanırız.\n\n## Formül\n`If + Past Simple`, `would + V1`\n(If kısmında geçmiş zaman kullanılır ama anlam **geçmiş değildir**, sadece \"hayali\" olduğunu belirtmek için bir adım geriye gidilir.)\n\n## Nerede Kullanılır?\n*   **Mimari Beyin Fırtınası (Brainstorming):** Farklı teknolojileri hayal ederken.\n    *   ✅ *\"If we **used** Redis, the cache **would be** much faster.\"* (Redis kullansaydık, önbellek çok daha hızlı olurdu - *ama şu an kullanmıyoruz.*)\n*   **Şu Anki Teknik Sınırları Konuşurken:**\n    *   ✅ *\"If we **had** more time, I **would refactor** this whole class.\"* (Daha fazla zamanımız olsaydı, bu sınıfın tamamını yeniden yazardım - *ama zamanımız yok.*)\n\n> **⚠️ En Çok Yapılan Hata**\n> Hayali durumları anlatırken \"If\" tarafına \"would\" getirmeyin!\n> ❌ Yanlış: If we **would use** Redis...\n> ✅ Doğru: If we **used** Redis..."
  },
  {
    "category": "Conditionals",
    "title": "Third Conditional — Hypothetical Past",
    "explanation": "Used for imagining a different past — things that didn't happen but could have. Common in post-mortems and retrospectives. Structure: If + Past Perfect, would have + past participle.",
    "correctExample": "If we had written unit tests, we would have caught the bug earlier.",
    "wrongExample": "If we wrote unit tests, we would have caught the bug earlier.",
    "level": "C1",
    "lessonContent": "# Third Conditional (Tip 3: Geçmişteki Pişmanlıklar ve Kaçan Fırsatlar)\n\nGeçmişte yaşanmış, bitmiş ve artık değiştirilemez olaylar hakkında konuşurken (Örn: Post-mortem toplantıları) kullanılır. \"Öyle yapmasaydık, böyle olmazdı\" anlamı taşır.\n\n## Formül\n`If + Past Perfect (had + V3)`, `would have + V3`\n\n## Nerede Kullanılır?\n*   **Post-Mortem (Hata Sonrası) Analizleri:** Neyi yanlış yaptığımızı tartışırken.\n    *   ✅ *\"If we **had tested** the API, the system **would not have crashed**.\"* (Eğer API'yi test etseydik, sistem çökmezdi - *ama test etmedik ve sistem çöktü.*)\n*   **Kaçan Fırsatlar:**\n    *   ✅ *\"If we **had migrated** to AWS earlier, we **would have saved** a lot of money.\"* (Eğer AWS'ye daha önce geçseydik, çok para tasarruf ederdik.)\n\n> **💡 İpucu:** Third conditional daima \"keşke\" veya \"tüh\" hissiyatı barındırır. Olup bitmiş olayların alternatif senaryolarıdır."
  },
  {
    "category": "Conditionals",
    "title": "Mixed Conditional — Past Cause, Present Result",
    "explanation": "Combines Third and Second Conditional. A past event affects the present situation. Structure: If + Past Perfect, would + base verb.",
    "correctExample": "If we had chosen TypeScript from the start, we would have fewer runtime errors now.",
    "wrongExample": "If we chose TypeScript from the start, we would have fewer runtime errors now.",
    "level": "C1",
    "lessonContent": "# Mixed Conditionals (Geçmişin Bugüne Etkisi)\n\nBazen geçmişte yaptığımız bir hatanın bedelini *şu an* öderiz. Veya geçmişte aldığımız iyi bir mimari kararın faydasını *bugün* görürüz. Zamanların birbirine karıştığı bu senaryoda **Mixed Conditional** kullanırız.\n\n## Formül\n`If + Past Perfect (had V3)`, `would + V1`\n\n## Ne Zaman Kullanılır?\n*   **Geçmişteki kararın şimdiki sonucu:**\n    *   ✅ *\"If we **had written** tests (geçmiş), the app **would not be** crashing now (bugün).\"*\n    *   (Eğer testleri yazmış olsaydık, uygulama şu an çökmüyor olurdu.)\n\n> **💡 Mantık:** If tarafı Third Conditional (geçmiş), sonuç tarafı Second Conditional (şu anki hayali durum)."
  },
  {
    "category": "Tenses — Present",
    "title": "Present Simple — Habits, Facts & Routines",
    "explanation": "Used for habitual actions, general truths, and schedules. In tech, it describes how systems work. Structure: Subject + base verb (add -s/-es for he/she/it). Negative: do/does + not + base verb.",
    "correctExample": "The load balancer distributes traffic across three servers.",
    "wrongExample": "The load balancer is distributing traffic across three servers.",
    "level": "B1",
    "lessonContent": "# Present Simple (Geniş Zaman: Rutinler ve Gerçekler)\n\nYazılım dünyasındaki cron job'lar gibidir. Sürekli tekrarlanan olayları, sistem mimarisinin değişmez gerçeklerini anlatmak için kullanılır.\n\n## Nerede Kullanılır?\n### 1. Sistem Tasarımı (System Design)\nSistemin mimari akışını açıklarken kullanılır.\n*   ✅ *\"The load balancer **routes** traffic to the healthy nodes.\"* (Yük dengeleyici, trafiği sağlıklı node'lara yönlendirir.)\n\n### 2. Stand-up (Günlük Rutinler)\n*   ✅ *\"I usually **review** PRs in the morning.\"* (Sabahları genelde PR'ları incelerim.)\n\n> **⚠️ En Çok Yapılan Hata:** \"Şu an çalışıyor\" demek isterken Present Simple kullanmak.\n> ❌ Yanlış: The database *fails* right now.\n> ✅ Doğru: The database *is failing* right now."
  },
  {
    "category": "Tenses — Present",
    "title": "Present Continuous — Actions Happening Now",
    "explanation": "Used for actions happening right now or temporary situations. In standups, it describes current work. Structure: am/is/are + verb-ing. Note: State verbs (know, believe, contain) are NOT used in continuous form.",
    "correctExample": "I am refactoring the authentication module this sprint.",
    "wrongExample": "I refactor the authentication module this sprint.",
    "level": "B1",
    "lessonContent": "# Present Continuous (Şimdiki Zaman: Şu An Devam Edenler)\n\nGeniş zamanın aksine, şu an aktif olarak üzerinde çalıştığımız taskları veya sistemin anlık durumunu anlatırken kullanılır. \n\n## Formül\n`am/is/are + V-ing`\n\n## Nerede Kullanılır?\n### 1. Stand-up Toplantıları (Bugün Ne Yapıyorsun?)\nŞu an aktif olarak üzerinde uğraştığınız bileşeni söylerken.\n*   ✅ *\"I **am currently debugging** the authentication module.\"* (Şu anda kimlik doğrulama modülünü debug ediyorum.)\n\n### 2. Sistem İzleme (Monitoring)\nGrafana ekranına bakarken anlık bir sorunu raporlarken.\n*   ✅ *\"The server CPU usage **is spiking** right now.\"* (Sunucu CPU kullanımı şu an fırlıyor.)"
  },
  {
    "category": "Tenses — Present",
    "title": "Present Perfect — Past Action, Present Relevance",
    "explanation": "Used when a past action has a result or relevance NOW. The exact time is not mentioned. Structure: have/has + past participle. Keywords: already, just, yet, ever, never, since, for.",
    "correctExample": "I have already merged the pull request.",
    "wrongExample": "I have merged the pull request yesterday.",
    "level": "B1",
    "lessonContent": "# Present Perfect (Etkisi Süren Geçmiş Zaman)\n\nYazılımcıların en çok kullanması gereken ama en az kullandığı zamandır. Olay geçmişte olmuştur ama bizim için **zamanı değil, şu anki durumu (sonucu)** önemlidir.\n\n## Formül\n`have/has + V3`\n\n## Nerede Kullanılır?\n### 1. Günlük Stand-up'lar\n\"Bugün ne yaptın?\" sorusuna verilecek en profesyonel cevaptır. Çünkü takım ne zaman yaptığınızla ilgilenmez, işin bitmiş olup kodun merge edilip edilmediğiyle ilgilenir.\n*   ✅ *\"I **have fixed** the memory leak.\"* (Bellek sızıntısını çözdüm -> Yani şu an sistem güvenli.)\n\n### 2. Sürüm Notları (Release Notes)\n*   ✅ *\"We **have added** support for dark mode.\"* (Dark mode desteği ekledik -> Gidip kullanabilirsiniz.)"
  },
  {
    "category": "Tenses — Present",
    "title": "Present Perfect Continuous — Duration Until Now",
    "explanation": "Emphasizes the DURATION of an action that started in the past and continues to now (or just stopped). Structure: have/has + been + verb-ing. Keywords: for, since, all day, lately.",
    "correctExample": "I have been debugging this issue for three hours.",
    "wrongExample": "I am debugging this issue for three hours.",
    "level": "B2",
    "lessonContent": "# Present Perfect Continuous (Geçmişten Bugüne Süregelen Eylemler)\n\nBir sorunu çözmeye geçmişte başladınız ve **hala daha uğraşıyorsunuz**. Bunu takıma söylemek için bu yapıyı kullanmalısınız.\n\n## Formül\n`have/has been + V-ing`\n\n## Nerede Kullanılır?\n### 1. Stand-up'ta Bloklanma Durumu (Blockers)\nTakıma ne kadardır aynı sorunla cebelleştiğinizi belirtmek için idealdir.\n*   ✅ *\"I **have been trying** to fix this bug for three hours.\"* (3 saattir bu hatayı çözmeye çalışıyorum -> Ve hala çözemedim, belki yardım edersiniz?)\n\n### 2. Sistem Kesintisi Analizi\n*   ✅ *\"The background job **has been failing** since yesterday.\"* (Arka plan görevi dünden beri hata veriyor -> Hala vermeye devam ediyor.)"
  },
  {
    "category": "Tenses — Past",
    "title": "Past Simple — Completed Actions",
    "explanation": "Used for actions completed at a specific time in the past. Structure: Subject + verb-ed (regular) or irregular form. Keywords: yesterday, last week, ago, in 2023.",
    "correctExample": "We deployed the hotfix last night.",
    "wrongExample": "We have deployed the hotfix last night.",
    "level": "B1",
    "lessonContent": "# Past Simple (Geçmiş Zaman: Biten Olaylar)\n\nGeçmişte olmuş, bitmiş ve özellikle **ne zaman olduğu (dün, 2022'de, geçen ay) belli olan** olayları anlatırken kullanılır.\n\n## Formül\n`V2 (Fiilin 2. Hali)`\n\n## Nerede Kullanılır?\n### 1. Post-Mortem (Incident Report) Zaman Çizelgeleri\nOlayın tam olarak ne zaman patladığını anlatırken.\n*   ✅ *\"The system **crashed** at 3:00 AM.\"* (Sistem saat 03:00'te çöktü.)\n\n### 2. Geçmiş Kararlar (ADR - Architecture Decision Records)\n*   ✅ *\"We **chose** PostgreSQL over MongoDB last year because of ACID compliance.\"* (Geçen yıl ACID uyumluluğu nedeniyle MongoDB yerine PostgreSQL'i seçtik.)"
  },
  {
    "category": "Tenses — Past",
    "title": "Past Continuous — Background Actions in the Past",
    "explanation": "Used for actions that were in progress at a specific time in the past, often interrupted by another action. Structure: was/were + verb-ing.",
    "correctExample": "I was running the test suite when the server crashed.",
    "wrongExample": "I ran the test suite when the server crashed.",
    "level": "B1",
    "lessonContent": "# Past Continuous (Geçmişte Devam Eden Eylemler)\n\nGeçmişte uzun süren bir olay devam ederken, o olayın arasına aniden giren başka bir olayı anlatmak için bir \"arka plan\" (background) çizmemiz gerekir. Past Continuous bu arka planı çizer.\n\n## Formül\n`was/were + V-ing`\n\n## Nerede Kullanılır?\n### 1. Hata (Bug) Raporu Yazarken (Steps to Reproduce)\nHata tam olarak ne yaparken başınıza geldi?\n*   ✅ *\"I **was testing** the payment flow when the app crashed.\"* (Ben ödeme akışını test ediyordum, o sırada uygulama çöktü.)\n\n### 2. Log Analizlerinde Bağlam Vermek\n*   ✅ *\"The memory usage spiked while the system **was processing** the large video file.\"* (Sistem büyük video dosyasını işliyorken bellek kullanımı fırladı.)"
  },
  {
    "category": "Tenses — Past",
    "title": "Past Perfect — Earlier Past Action",
    "explanation": "Used when talking about two past events, to show which happened FIRST. Structure: had + past participle. Think of it as 'the past of the past'.",
    "correctExample": "The build had already failed before I pushed my commit.",
    "wrongExample": "The build already failed before I pushed my commit.",
    "level": "B2",
    "lessonContent": "# Past Perfect (Geçmişin de Geçmişi)\n\nElinizde geçmişte olmuş **iki farklı olay** varsa ve hangisinin \"daha önce\" yaşandığını vurgulamak istiyorsanız Past Perfect kullanmalısınız.\n\n## Formül\n`had + V3`\n\n## Nerede Kullanılır?\n### 1. Hata Nedenlerini Açıklarken (Root Cause)\nOlay 1: Sunucu çöktü (Geçmiş)\nOlay 2: Biri veritabanını sildi (Daha da geçmiş)\n*   ✅ *\"The server crashed (V2) because someone **had deleted** (had V3) the tables.\"* (Sunucu çöktü çünkü birisi tabloları silmişti.)\n\n### 2. Code Review Geri Bildirimlerinde\n*   ✅ *\"I realized that we **had forgotten** to update the dependencies.\"* (Bağımlılıkları güncellemeyi unutmuş olduğumuzu fark ettim.)"
  },
  {
    "category": "Tenses — Past",
    "title": "Past Perfect Continuous — Duration Before a Past Event",
    "explanation": "Emphasizes the duration of an action that was happening BEFORE another past event. Structure: had + been + verb-ing.",
    "correctExample": "We had been optimizing the query for two days before we found the N+1 problem.",
    "wrongExample": "We were optimizing the query for two days before we found the N+1 problem.",
    "level": "C1",
    "lessonContent": "# Past Perfect Continuous (Geçmişin Geçmişinde Süregelen Eylem)\n\nGeçmişte bir an (sunucunun çökmesi) gerçekleşmeden önce, ne kadar süredir devam eden bir iş yapılıyordu?\n\n## Formül\n`had been + V-ing`\n\n## Nerede Kullanılır?\n### 1. Performans Sızıntıları (Memory Leaks) Raporları\n*   ✅ *\"The app **had been leaking** memory for hours before it finally crashed.\"* (Uygulama sonunda çökmeden önce saatlerce bellek sızdırıyordu.)\n\nBu yapı \"çökme anından önce\" geçen sürenin vahametini vurgulamak için harikadır."
  },
  {
    "category": "Tenses — Future",
    "title": "Future Simple (will) — Predictions & Decisions",
    "explanation": "Used for spontaneous decisions, predictions, and promises. Structure: will + base verb. Also used for technical predictions about system behavior.",
    "correctExample": "The migration will take approximately 30 minutes.",
    "wrongExample": "The migration takes approximately 30 minutes.",
    "level": "B1",
    "lessonContent": "# Future Simple (Will: Tahminler ve Anlık Kararlar)\n\nGelecekle ilgili kesin olmayan tahminler yaparken veya bir toplantı sırasında anında aldığımız aksiyon kararlarında kullanılır. (Planlanmış işler için \"will\" kullanılmaz, \"going to\" veya \"Present Continuous\" kullanılır).\n\n## Formül\n`will + V1`\n\n## Nerede Kullanılır?\n### 1. Slack / Toplantı Anlık Aksiyonları\nBiri grupta bir sorun olduğunu söyledi, siz de anında müdahale edeceğinizi belirttiniz.\n*   ✅ *\"I **will check** the logs.\"* (Logları kontrol edeceğim.)\n\n### 2. Tahminler (Predictions)\n*   ✅ *\"I think this refactor **will improve** performance by 20%.\"* (Bence bu refactor performansı %20 artıracak.)"
  },
  {
    "category": "Tenses — Future",
    "title": "Future Continuous — Actions in Progress in the Future",
    "explanation": "Used for actions that will be in progress at a specific time in the future. Structure: will + be + verb-ing. Common in project timelines.",
    "correctExample": "This time next week, we will be testing the new payment gateway.",
    "wrongExample": "This time next week, we will test the new payment gateway.",
    "level": "B2",
    "lessonContent": "# Future Continuous (Gelecekte Devam Ediyor Olacak Eylemler)\n\nGelecekte spesifik bir zamanda (örneğin yarın saat 3'te) bir işin tam ortasında (sürecinde) olacağınızı belirtmek için kullanılır. \n\n## Formül\n`will be + V-ing`\n\n## Nerede Kullanılır?\n### 1. Uyarı veya Kesinti Duyuruları (Downtime Announcements)\nKullanıcılara veya takıma o saatlerde sistemi kullanmamalarını söylerken.\n*   ✅ *\"We **will be migrating** the database at midnight.\"* (Gece yarısı veritabanını taşıyor olacağız -> O saatte sistemde işlem yapmayın.)\n\n### 2. Toplantı Zamanlarını Ayarlarken\n*   ✅ *\"Don't call me at 10 AM, I **will be interviewing** a candidate.\"* (Beni saat 10'da arama, bir adayla mülakat yapıyor olacağım.)"
  },
  {
    "category": "Tenses — Future",
    "title": "Future Perfect — Completed Before a Future Point",
    "explanation": "Used for actions that will be completed BEFORE a specific future time. Structure: will + have + past participle. Keywords: by, before, by the time.",
    "correctExample": "By Friday, we will have completed the database migration.",
    "wrongExample": "By Friday, we will complete the database migration.",
    "level": "B2",
    "lessonContent": "# Future Perfect (Gelecekte Bitmiş Olacak Eylemler)\n\nSprint planlamalarının (Sprint Planning) yıldızıdır. Gelecekteki belirli bir tarihten (deadline) **önce** bir işin kesinlikle bitmiş olacağının sözünü verirken kullanılır.\n\n## Formül\n`will have + V3`\n\n## Nerede Kullanılır?\n### 1. Sprint ve Deadline Sözleri Verirken\n*   ✅ *\"By the end of the sprint, we **will have refactored** the legacy code.\"* (Sprint'in sonuna kadar legacy kodu refactor etmiş olacağız.)\n*   ✅ *\"I **will have pushed** the fix by tomorrow morning.\"* (Yarın sabaha kadar düzeltmeyi push'lamış olacağım.)"
  },
  {
    "category": "Tenses — Future",
    "title": "Future Perfect Continuous — Duration Before a Future Point",
    "explanation": "Emphasizes how long an action will have been happening by a specific future time. Structure: will + have + been + verb-ing.",
    "correctExample": "By next month, I will have been working on this codebase for two years.",
    "wrongExample": "By next month, I will work on this codebase for two years.",
    "level": "C1",
    "lessonContent": "# Future Perfect Continuous (Gelecekteki Bir Ana Kadar Süregelen Eylem)\n\nÇok sık kullanılmasa da, tecrübenizi veya sistemin uptime süresini (ne kadar zamandır ayakta olduğunu) vurgulamak için havalı bir yapıdır. Gelecekteki bir tarihe gelindiğinde, eylemin ne kadardır devam ediyor olacağını söyler.\n\n## Formül\n`will have been + V-ing`\n\n## Nerede Kullanılır?\n### 1. Yıldönümü veya Süre Vurgusu\n*   ✅ *\"By next month, this server **will have been running** without downtime for a year.\"* (Önümüzdeki ay itibariyle, bu sunucu bir yıldır kesintisiz çalışıyor olacak.)"
  },
  {
    "category": "Modal Verbs",
    "title": "Must vs. Have To — Obligation",
    "explanation": "'Must' expresses a strong personal obligation or an internal rule. 'Have to' expresses an external obligation or requirement. In code reviews, 'must' sounds more authoritative.",
    "correctExample": "You must validate user input before processing it. (security rule)",
    "wrongExample": "You must to validate user input before processing it.",
    "level": "B1",
    "lessonContent": "# Must vs. Have To (Zorunluluklar)\n\nTürkçede ikisi de \"zorunda\" veya \"meli/malı\" diye çevrilir ancak İngilizcede zorunluluğun **kaynağına** göre ayrılırlar. Yazılım kurallarında bu ayrım çok önemlidir.\n\n## 1. Have To (Dışsal Zorunluluk - Kurallar)\nKuralı siz koymadınız. Sistem, patron, linter veya framework bunu dayatıyor.\n*   ✅ *\"We **have to** use HTTPS for the payment gateway.\"* (Ödeme sistemi için HTTPS kullanmak zorundayız. - *Bankanın veya sistemin kuralı.*)\n\n## 2. Must (İçsel Zorunluluk - Kişisel Karar/Güçlü Tavsiye)\nKuralı söyleyen kişi koyuyordur veya yapılması \"şarttır\" diye şiddetle tavsiye ediyordur.\n*   ✅ *\"We **must** refactor this code before the next release.\"* (Bir sonraki sürümden önce bu kodu mutlaka refactor etmeliyiz. - *Benim güçlü tavsiyem.*)\n\n> **💡 Dokümantasyon İpucu:** Resmi dokümantasyonlarda sistemin şart koştuğu şeyler için genellikle \"must\" kullanılır (Örn: RFC 2119 standartları)."
  },
  {
    "category": "Modal Verbs",
    "title": "Should vs. Could — Suggestions in Code Reviews",
    "explanation": "'Should' implies a recommendation (you expect it to happen). 'Could' implies a possibility (it's an option). Use 'could' for softer suggestions in peer reviews.",
    "correctExample": "We could extract this into a reusable utility function.",
    "wrongExample": "We should can extract this into a reusable utility function.",
    "level": "B2",
    "lessonContent": "# Should vs. Could (Code Review Felsefesi)\n\nCode Review (Kod İncelemesi) yaparken karşınızdakini kırmadan (blameless) hataları düzeltmesini istemek bir sanattır. Bu sanatta `should` ve `could` en güçlü silahlarınızdır.\n\n## 1. Should (Tavsiye / Beklenti)\n\"Böyle yapman daha iyi olur\" veya \"Sistemin beklentisi budur\" anlamına gelir.\n*   ✅ *\"You **should** abstract this logic into a separate service.\"* (Bu mantığı ayrı bir servise soyutlamalısın.) -> *Güçlü bir tavsiye, yapılması beklenir.*\n\n## 2. Could (Alternatif Olasılık / Nazik Öneri)\nSadece bir fikir sunuyorsunuz. Kararı kodu yazan kişiye bırakıyorsunuz. En nazik feedback yöntemidir.\n*   ✅ *\"We **could** also use a Map here instead of an Array to improve lookup time.\"* (Arama süresini hızlandırmak için burada Array yerine Map de kullanabiliriz.) -> *Bir fikir, yapmasan da olur.*"
  },
  {
    "category": "Modal Verbs",
    "title": "May vs. Might — Probability",
    "explanation": "'May' indicates a higher probability than 'might'. In incident reports, this distinction matters for risk assessment.",
    "correctExample": "This change might cause a regression in the checkout flow.",
    "wrongExample": "This change might causes a regression in the checkout flow.",
    "level": "B2",
    "lessonContent": "# May vs. Might (Olasılık Dereceleri)\n\nBir hatanın kaynağını (root cause) tahmin ederken ne kadar emin olduğunuzu bu iki kelimeyle ayarlarsınız.\n\n## 1. May (%50 Olasılık - Mümkün)\nTeknik bir olasılık var ve mantıklı görünüyor.\n*   ✅ *\"The timeout **may** be caused by the slow network response.\"* (Zaman aşımına yavaş ağ yanıtı neden oluyor olabilir.)\n\n## 2. Might (%30 Olasılık - Düşük İhtimal)\nÇok ufak bir ihtimal de olsa teknik olarak mümkün olan senaryolar.\n*   ✅ *\"It **might** be a race condition, although it's very rare.\"* (Çok nadir de olsa bir race condition (yarış durumu) olabilir.)\n\n> **💡 Not:** Günlük dilde ikisi de eşanlamlı gibi kullanılsa da, resmi teknik yazılarda \"might\" her zaman daha düşük ihtimal barındırır."
  },
  {
    "category": "Modal Verbs",
    "title": "Can vs. Be Able To — Ability",
    "explanation": "'Can' is used for general ability. 'Be able to' is used for specific situations or with other modals/tenses where 'can' cannot be used.",
    "correctExample": "After the upgrade, we will be able to handle 10x more traffic.",
    "wrongExample": "After the upgrade, we will can handle 10x more traffic.",
    "level": "B1",
    "lessonContent": "# Can vs. Be Able To (Yetenek ve Kapasite)\n\nYazılımda bir servisin, modülün veya sistemin bir şeyi yapabilme kapasitesinden bahsederken kullanılır.\n\n## 1. Can (Genel Yetenek)\nSistemin doğasında var olan, genel kapasite.\n*   ✅ *\"The new API **can** handle 10,000 requests per second.\"* (Yeni API saniyede 10.000 isteği kaldırabilir.)\n\n## 2. Be Able To (Spesifik Durumlardaki Kapasite)\nÖzellikle geçmişte (could/was able to) veya gelecekteki spesifik bir zaman diliminde bir engeli aşıp başarma durumunda kullanılır.\n*   ✅ *\"After the server upgrade, we **will be able to** process video files much faster.\"* (Sunucu yükseltmesinden sonra, video dosyalarını çok daha hızlı işleyebileceğiz.)"
  },
  {
    "category": "Passive Voice",
    "title": "Present Passive — Describing Processes",
    "explanation": "Used to describe processes where the action is more important than who does it. Very common in technical documentation. Structure: is/are + past participle.",
    "correctExample": "All requests are validated by the middleware before reaching the controller.",
    "wrongExample": "All requests are validate by the middleware.",
    "level": "B1",
    "lessonContent": "# Present Passive (Geniş Zaman Edilgen: Süreçleri Açıklama)\n\nÖzellikle CI/CD (Sürekli Entegrasyon) akışlarını, bir uygulamanın nasıl çalıştığını anlatan README dosyalarında veya mimari dokümanlarda sıkça kullanılır.\n\n## Formül\n`am/is/are + V3`\n\n## Nerede Kullanılır?\n*   **Sistem Dokümantasyonu (README):**\n    *   ✅ *\"When a PR is opened, the tests **are triggered** automatically.\"* (Bir PR açıldığında, testler otomatik olarak tetiklenir.)\n    *   ✅ *\"The data **is encrypted** before saving.\"* (Veri kaydedilmeden önce şifrelenir.)"
  },
  {
    "category": "Passive Voice",
    "title": "Past Passive — Describing Completed Actions",
    "explanation": "Used in changelogs, release notes, and incident reports. Structure: was/were + past participle.",
    "correctExample": "The deprecated endpoint was removed in version 3.2.",
    "wrongExample": "The deprecated endpoint removed in version 3.2.",
    "level": "B2",
    "lessonContent": "# Past Passive (Geçmiş Zaman Edilgen: Biten İşleri Açıklama)\n\nGeçmişte yapılmış bir işi raporlarken (Örn: Release Notes veya Incident Reports) eylemi yapan kişiden ziyade yapılan işe vurgu yapmak için kullanılır.\n\n## Formül\n`was/were + V3`\n\n## Nerede Kullanılır?\n*   **Release Notes (Sürüm Notları):**\n    *   ✅ *\"Two major bugs **were fixed** in this release.\"* (Bu sürümde iki büyük hata çözüldü.)\n*   **Incident Reports (Hata Raporları):**\n    *   ✅ *\"The broken server **was restarted** at 4 AM.\"* (Bozuk sunucu sabah 4'te yeniden başlatıldı.)"
  },
  {
    "category": "Passive Voice",
    "title": "Modal Passive — Expressing Possibility/Necessity",
    "explanation": "Combines modal verbs with passive voice. Common in requirements documents. Structure: modal + be + past participle.",
    "correctExample": "User data must be encrypted before being stored in the database.",
    "wrongExample": "User data must encrypted before being stored.",
    "level": "B2",
    "lessonContent": "# Modal Passive (Kip Edilgen: Olasılık ve Zorunluluk)\n\nBir işlemin yapılması gerektiğini (must be done) veya yapılabileceğini (can be done) ifade ederken kullanılır.\n\n## Formül\n`Modal (can/must/should/will) + be + V3`\n\n## Nerede Kullanılır?\n*   **Code Review Feedback (Kod İnceleme Önerileri):**\n    *   ✅ *\"This function **should be refactored** to reduce complexity.\"* (Karmaşıklığı azaltmak için bu fonksiyon refactor edilmeli.)\n*   **Sistem Sınırları ve Kurallar:**\n    *   ✅ *\"Passwords **must be hashed** using bcrypt.\"* (Şifreler bcrypt kullanılarak hash'lenmeli.)"
  },
  {
    "category": "Prepositions",
    "title": "On vs. In — Platforms & Containers",
    "explanation": "Use 'on' for surfaces, platforms, and environments (on the server, on GitHub, on AWS). Use 'in' for enclosed spaces, files, and containers (in the database, in the config file).",
    "correctExample": "The application is running on the staging server.",
    "wrongExample": "The application is running in the staging server.",
    "level": "B1",
    "lessonContent": "# On vs. In (Platformlar ve Konteynerler)\n\nYazılımda \"on\" ve \"in\" kullanımı fiziksel dünyadaki gibi değildir. Temel mantık: Üzerinde çalışılan bir **platform** mu yoksa içine girilen bir **kutu/konteyner** mi?\n\n## 1. ON (Platformlar, Yüzeyler, Sunucular)\nEğer bir şey çalıştırılan bir yüzeyse (sunucu, bulut, platform, işletim sistemi) \"on\" kullanılır.\n*   ✅ *\"The app is running **on** AWS.\"*\n*   ✅ *\"We tested it **on** Linux.\"*\n*   ✅ *\"I deployed it **on** the server.\"*\n\n## 2. IN (Konteynerler, Klasörler, Depolar)\nEğer bir şey kapalı bir kutuysa (klasör, branch, repo, docker container) \"in\" kullanılır.\n*   ✅ *\"The bug is **in** the main branch.\"*\n*   ✅ *\"You can find the config **in** the repository.\"*\n*   ✅ *\"It works **in** a Docker container.\"*"
  },
  {
    "category": "Prepositions",
    "title": "Deploy To vs. Deploy In",
    "explanation": "We 'deploy to' a target environment. 'Deploy in' is incorrect in this context.",
    "correctExample": "We will deploy the hotfix to production tonight.",
    "wrongExample": "We will deploy the hotfix in production tonight.",
    "level": "B1",
    "lessonContent": "# Deploy To vs. Deploy In (Dağıtım Edatları)\n\n\"Deploy\" (Yayına alma / Dağıtım) kelimesinden sonra gelen edat, nereye dağıtım yaptığınıza göre değişir.\n\n## 1. Deploy TO (Yönelme - Ortama Gönderme)\nKodunuzun bir yerden çıkıp bir hedefe (sunucuya, ortama) gitme hareketini belirtir.\n*   ✅ *\"We deployed the code **to** production.\"* (Kodu canlı ortama gönderdik/yayına aldık.)\n*   ✅ *\"Deploy this container **to** the cluster.\"*\n\n## 2. Deploy IN (İçinde Bulunma - Nadir Kullanım)\nKodun zaten spesifik bir kutunun \"içinde\" konuşlandırıldığını belirtir.\n*   ✅ *\"The service is deployed **in** the EU-West region.\"* (Servis EU-West bölgesinde/içinde yayında.)"
  },
  {
    "category": "Prepositions",
    "title": "Depend On — Not Depend From/Of",
    "explanation": "The correct preposition after 'depend' is always 'on'. This is a common mistake for non-native speakers.",
    "correctExample": "The frontend depends on the authentication API.",
    "wrongExample": "The frontend depends from the authentication API.",
    "level": "B1",
    "lessonContent": "# Depend On (Bağlı Olmak)\n\nTürkçedeki \"-den bağımsız\" veya \"-e bağlı\" ifadeleri yanıltıcı olabilir. İngilizcede \"depend\" fiili **daima \"on\" edatıyla** kullanılır.\n\n## Formül\n`Depend + ON`\n\n## Nerede Kullanılır?\n*   **Bağımlılık (Dependency) Açıklamaları:**\n    *   ❌ *\"This module depends from the auth service.\"* (YANLIŞ)\n    *   ✅ *\"This module **depends on** the auth service.\"* (DOĞRU)\n*   **Sistem Durumları:**\n    *   ✅ *\"The loading time **depends on** the network speed.\"*"
  },
  {
    "category": "Prepositions",
    "title": "Consist Of — Not Consist In/From",
    "explanation": "When describing what something is made up of, use 'consist of'. Never use 'consist from' or 'consist in'.",
    "correctExample": "The microservices architecture consists of five independent services.",
    "wrongExample": "The microservices architecture consists from five independent services.",
    "level": "B2",
    "lessonContent": "# Consist Of (Oluşmak)\n\nBir şeyin hangi parçalardan oluştuğunu anlatırken kullanılır. Tıpkı \"depend on\" gibi, bu da değişmez bir edat kuralıdır: **Daima \"of\" alır.**\n\n## Formül\n`Consist + OF`\n\n## Nerede Kullanılır?\n*   **Mimari Açıklamalar (Architecture Overview):**\n    *   ❌ *\"The backend consists from three microservices.\"* (YANLIŞ)\n    *   ✅ *\"The backend **consists of** three microservices.\"* (DOĞRU - Backend üç mikro servisten oluşur.)"
  },
  {
    "category": "Articles",
    "title": "A vs. An — Sound, Not Spelling",
    "explanation": "Use 'a' before consonant SOUNDS and 'an' before vowel SOUNDS. It depends on pronunciation, not spelling. Example: 'an HTTP request' (H is silent), 'a URL' (pronounced 'yoo').",
    "correctExample": "We received an HTTP 500 error from the API.",
    "wrongExample": "We received a HTTP 500 error from the API.",
    "level": "B1",
    "lessonContent": "# A vs. An (Sound, Not Spelling)\n\n\"A\" ve \"An\" belgisiz artikelleri (Herhangi bir), kendilerinden sonra gelen kelimenin yazılışına göre değil, **okunuşuna (sesine)** göre seçilir.\n\n## Temel Kural\n*   Kelime **sessiz bir SES** ile başlıyorsa: **A**\n*   Kelime **sesli bir SES** ile başlıyorsa: **An**\n\n### Yazılıma Özgü İstisnalar ve Kısaltmalar\nYazılımcılar genellikle kısaltmalarla (Acronyms) konuşur. Kısaltmaları okurken ilk harfin nasıl okunduğuna dikkat etmelisiniz.\n\n*   **API** -> \"Ey-pi-ay\" (Sesli ses ile başlar) -> ✅ **An API**\n*   **SQL** -> \"Es-ku-el\" (Sesli ses ile başlar) -> ✅ **An SQL query**\n*   **URL** -> \"Yu-ar-el\" (Sessiz 'Y' sesi ile başlar) -> ✅ **A URL**\n*   **HTML** -> \"Eyç-ti-em-el\" (Sesli ses ile başlar) -> ✅ **An HTML file**\n*   **User** -> \"Yu-zır\" (Sessiz 'Y' sesi ile başlar) -> ✅ **A user**\n\n> **💡 Unutmayın:** Gözünüzle harfe değil, kulağınızla sese odaklanın!"
  },
  {
    "category": "Articles",
    "title": "The — Specific & Known Items",
    "explanation": "Use 'the' when both speaker and listener know exactly which item is being discussed. Omit 'the' for general/abstract concepts. In tech: 'the server' (a specific one) vs. 'servers in general'.",
    "correctExample": "The database we migrated last week is now stable.",
    "wrongExample": "Database we migrated last week is now stable.",
    "level": "B1",
    "lessonContent": "# The (Belirli ve Bilinen Nesneler)\n\nİngilizcedeki \"The\" artikeli, bahsettiğiniz objenin hem sizin hem de karşınızdakinin bildiği **spesifik, tek bir şey** olduğunu belirtir.\n\n## Nerede Kullanılır?\n*   **Projeye Özel Terimler:**\n    Takımınızda tek bir ana veritabanı veya tek bir ana sunucu varsa:\n    *   ✅ *\"Restart **the** database.\"* (Hangi veritabanı olduğu biliniyor: Bizim projenin veritabanı.)\n    *   ✅ *\"Did you check **the** logs?\"* (O spesifik hatanın logları.)\n\n> **💡 İpucu:** Eğer \"Herhangi bir veritabanı\" demek isterseniz \"a database\" kullanırsınız. Ama takım içi iletişimde \"the\" hayat kurtarır."
  },
  {
    "category": "Articles",
    "title": "Zero Article — General Concepts & Technologies",
    "explanation": "Do not use an article before general concepts, programming languages, or technology names used in a general sense.",
    "correctExample": "React is maintained by Meta. TypeScript adds type safety to JavaScript.",
    "wrongExample": "The React is maintained by the Meta.",
    "level": "B2",
    "lessonContent": "# Zero Article (The Kullanılmayan Durumlar)\n\nTeknolojilerin, genel kavramların veya programlama dillerinin isimlerinin önüne hiçbir zaman \"the\", \"a\" veya \"an\" konmaz. \n\n## Nerede Kullanılır?\n*   **Programlama Dilleri ve Araçlar:**\n    *   ❌ *\"I am learning the Python.\"*\n    *   ✅ *\"I am learning **Python**.\"*\n    *   ✅ *\"We use **Docker** for containerization.\"*\n\n*   **Genel Mühendislik Kavramları:**\n    *   ❌ *\"The caching is important.\"*\n    *   ✅ *\"**Caching** is important for performance.\"* (Genel bir konsept olarak önbellekleme.)"
  },
  {
    "category": "Nouns & Plurals",
    "title": "Uncountable Tech Nouns",
    "explanation": "Words like 'software', 'hardware', 'information', 'data' (formal), 'feedback', 'equipment', and 'knowledge' are uncountable. They never take 'a/an' or '-s'.",
    "correctExample": "We need to install new software on the workstations.",
    "wrongExample": "We need to install new softwares on the workstations.",
    "level": "B1",
    "lessonContent": "# Uncountable Tech Nouns (Sayılamayan Teknik İsimler)\n\nBazı teknik kelimeler İngilizcede \"sayılamaz\" (uncountable) kabul edilir. Yani sonlarına asla \"-s\" çoğul eki alamazlar ve önlerine \"a/an\" (bir) gelemez.\n\n## En Kritik Sayılamayan Kelimeler:\n1.  **Software** (Yazılım) -> ❌ \"Softwares\" YOKTUR. ✅ \"Software\" veya \"Software programs\".\n2.  **Hardware** (Donanım) -> ❌ \"Hardwares\" YOKTUR.\n3.  **Information** (Bilgi) -> ❌ \"Informations\" YOKTUR. ✅ \"Pieces of information\".\n4.  **Equipment** (Ekipman) -> ❌ \"Equipments\" YOKTUR.\n5.  **Feedback** (Geri bildirim) -> ❌ \"Feedbacks\" YOKTUR. ✅ \"Some feedback\" veya \"Comments\".\n\n*   ✅ *\"Thanks for the **feedback**.\"* (Feedback'ler için teşekkürler - Türkçede çoğul desek de İngilizcede tekil kalır.)"
  },
  {
    "category": "Nouns & Plurals",
    "title": "Irregular Tech Plurals",
    "explanation": "Some words have irregular plural forms: 'index → indices/indexes', 'matrix → matrices', 'criterion → criteria', 'datum → data', 'appendix → appendices'.",
    "correctExample": "The database indices need to be rebuilt after the migration.",
    "wrongExample": "The database indexs need to be rebuilt after the migration.",
    "level": "B2",
    "lessonContent": "# Irregular Tech Plurals (Düzensiz Çoğullar)\n\nTeknoloji dünyasında sıkça kullanılan Latince/Yunanca kökenli bazı kelimelerin çoğul halleri \"-s\" ile bitmez. Bu kelimeleri doğru kullanmak, profesyonelliğinizi gösterir.\n\n## En Sık Karıştırılanlar\n1.  **Data** (Veriler): Zaten çoğuldur! Tekili *Datum*'dur ama yazılımda kullanılmaz. \"Data\" hem tekil hem çoğul gibi davranabilir ama sayılmaz.\n    *   ✅ *\"The **data is** ready.\"* veya *\"The **data are** ready.\"* (İkisi de teknik olarak kabul görür.)\n2.  **Matrix** (Matris) -> Çoğulu: **Matrices**\n3.  **Index** (İndeks) -> Çoğulu: **Indices** (veya Indexes)\n4.  **Vertex** (Köşe) -> Çoğulu: **Vertices**\n5.  **Criterion** (Kriter) -> Çoğulu: **Criteria**\n    *   ✅ *\"These are the acceptance **criteria**.\"* (Bunlar kabul kriterleri.)"
  },
  {
    "category": "Subject-Verb Agreement",
    "title": "Singular Subjects with Complex Phrases",
    "explanation": "When a singular subject is followed by phrases like 'along with', 'as well as', 'together with', the verb remains singular. These phrases do not make the subject plural.",
    "correctExample": "The API, along with its documentation, is ready for review.",
    "wrongExample": "The API, along with its documentation, are ready for review.",
    "level": "B2",
    "lessonContent": "# Singular Subjects with Complex Phrases (Karmaşık Öznelerde Tekillik Uyumsuzluğu)\n\nCümlenin öznesi araya giren uzun kelime gruplarıyla bölündüğünde, fiilin tekil mi çoğul mu olacağı kafa karıştırır. \n\n## Temel Kural\nFiil, hemen önündeki kelimeye değil, **asıl özneye (root subject)** uymak zorundadır.\n\n*   ❌ *\"The array of user objects **are** null.\"* (Burada \"objects\" kelimesine aldanıp \"are\" denir, bu bir hatadır.)\n*   ✅ *\"The **array** of user objects **is** null.\"* (Asıl özne \"array\" kelimesidir ve tekildir, bu yüzden \"is\" alır.)\n\n*   ✅ *\"The **list** of dependencies **needs** to be updated.\"* (Asıl özne List.)"
  },
  {
    "category": "Subject-Verb Agreement",
    "title": "Each / Every / Neither / Either + Singular Verb",
    "explanation": "Indefinite pronouns like 'each', 'every', 'neither', and 'either' always take a singular verb, even when followed by a plural noun.",
    "correctExample": "Each of the microservices has its own database.",
    "wrongExample": "Each of the microservices have their own database.",
    "level": "B2",
    "lessonContent": "# Each / Every / Neither / Either (Her Bir / Hiçbiri Kuralları)\n\nBu kelimeler (Each, Every, Neither, Either) her zaman bir grubun üyelerini \"tek tek\" ele alır. Bu nedenle **daima tekil fiil (is/has/V+s)** gerektirirler.\n\n## Nerede Kullanılır?\n*   **Döngüler (Loops) ve İterasyonlar:**\n    *   ❌ *\"Each user **have** an ID.\"* (YANLIŞ)\n    *   ✅ *\"**Each** user **has** an ID.\"* (DOĞRU - Her bir kullanıcının bir ID'si vardır.)\n*   **Seçenekler Arası Durumlar:**\n    *   ✅ *\"**Neither** of the servers **is** responding.\"* (Sunucuların hiçbiri cevap vermiyor.)"
  },
  {
    "category": "Subject-Verb Agreement",
    "title": "Collective Nouns — Team, Data, Staff",
    "explanation": "In American English, collective nouns (team, staff, management, data) take a singular verb. In British English, they can be plural. In a global tech company, American English is more common.",
    "correctExample": "The team is working on the new feature. (American English)",
    "wrongExample": "The team are working on the new feature. (in American English context)",
    "level": "C1",
    "lessonContent": "# Collective Nouns (Topluluk İsimleri: Team, Staff)\n\n\"Team\" (Takım) veya \"Staff\" (Personel) gibi kelimeler içinde birden fazla kişi barındırsa da, İngilizcede genellikle **tekil bir bütün** olarak kabul edilirler.\n\n## Kural\nAmerikan İngilizcesinde \"Team\" gibi topluluk isimleri tekil kabul edilir ve **tekil fiil (is/has)** alır.\n\n*   ❌ *\"The backend team **are** working on this.\"*\n*   ✅ *\"The backend **team is** working on this.\"*\n\n> **💡 Not:** İngiliz İngilizcesinde \"are\" kullanımı yaygındır ancak global yazılım dünyasında Amerikan standardı (tekil kullanım) daha güvenlidir."
  },
  {
    "category": "Gerunds & Infinitives",
    "title": "Gerund After Prepositions",
    "explanation": "After a preposition (in, on, at, for, about, by, without), always use the gerund (-ing form). Never use the base form or 'to + verb' after a preposition.",
    "correctExample": "We improved performance by caching the API responses.",
    "wrongExample": "We improved performance by cache the API responses.",
    "level": "B1",
    "lessonContent": "# Gerund After Prepositions (Edatlardan Sonra -ing Gelmesi)\n\nİngilizcede çok katı bir kural vardır: Bir edattan (in, on, at, for, about, without vb.) sonra asla yalın halde bir fiil (V1) gelemez. Fiil her zaman **-ing (Gerund)** takısı alarak isimleşmek zorundadır.\n\n## Nerede Kullanılır?\n*   **Dokümantasyon ve Yorum Satırları:**\n    *   ❌ *\"This function is used for calculate the total.\"* (YANLIŞ)\n    *   ✅ *\"This function is used **for calculating** the total.\"* (DOĞRU)\n*   **Uyarılar:**\n    *   ✅ *\"Do not deploy **without testing** the code.\"* (Kodu test etmeden yayınlamayın.)"
  },
  {
    "category": "Gerunds & Infinitives",
    "title": "Verb + Gerund vs. Verb + Infinitive",
    "explanation": "Some verbs are followed by gerund: enjoy, avoid, consider, suggest, finish, mind. Others by infinitive: want, need, decide, plan, agree, expect. Some accept both with different meanings (stop, remember, try).",
    "correctExample": "I suggest refactoring this module before adding new features.",
    "wrongExample": "I suggest to refactor this module before adding new features.",
    "level": "B2",
    "lessonContent": "# Verb + Gerund vs. Infinitive (Fiil + -ing vs. Fiil + to V1)\n\nİngilizcede iki fiil yan yana geldiğinde, ikinci fiil ya \"to V1\" (Infinitive) ya da \"V-ing\" (Gerund) formatına girer. Hangisinin geleceğini **ilk fiil** belirler.\n\n## 1. Kendinden Sonra 'to V1' Alanlar (Plan, Karar, İstek)\nGeleceğe yönelik planları anlatan fiiller genelde \"to\" alır: *decide, plan, want, need, expect, promise*\n*   ✅ *\"We **decided to migrate** to AWS.\"*\n*   ✅ *\"I **need to restart** the pod.\"*\n\n## 2. Kendinden Sonra '-ing' Alanlar (Süreç, Kaçınma, Bitiş)\nBir süreci, bitişi veya kaçınmayı anlatan fiiller \"-ing\" alır: *finish, avoid, consider, suggest, keep*\n*   ✅ *\"I **finished writing** the unit tests.\"*\n*   ✅ *\"We should **avoid using** global variables.\"* (Global değişkenler kullanmaktan kaçınmalıyız.)"
  },
  {
    "category": "Relative Clauses",
    "title": "Which vs. That — Defining vs. Non-Defining",
    "explanation": "'That' introduces essential (defining) information — removing it changes the meaning. 'Which' introduces extra (non-defining) information and is preceded by a comma.",
    "correctExample": "The function that handles authentication needs refactoring. The auth module, which was written last year, needs refactoring.",
    "wrongExample": "The function which handles authentication needs refactoring. (missing comma or should use 'that')",
    "level": "B2",
    "lessonContent": "# Which vs. That (İlgi Cümlecikleri Felsefesi)\n\nYazılım dokümantasyonunda (ve özellikle İngilizce linter'larında) en çok düzeltilen hatalardan biri \"which\" ve \"that\" ayrımıdır. İkisi de \"ki o\" anlamına gelir ama işlevleri çok farklıdır.\n\n## 1. THAT (Defining / Kısıtlayıcı)\nCümleden çıkarırsanız anlam bozulur. Virgül (,) **KULLANILMAZ.**\nSadece bahsettiğiniz şarta uyan objeleri filtrelersiniz (Bir dizideki .filter() metodu gibi düşünün).\n*   ✅ *\"Delete the files **that** are older than 30 days.\"* \n    *   *(Sadece 30 günden eski olan dosyaları sil. Başka dosyaları silme.)*\n\n## 2. WHICH (Non-Defining / Ekstra Bilgi)\nCümleden çıkarırsanız cümlenin ana fikri bozulmaz. Daima virgül (,) **KULLANILIR.**\nBir obje hakkında sadece \"ekstra bilgi\" vermek için (Yorum satırı gibi düşünün) kullanılır.\n*   ✅ *\"I deleted the `temp` folder**, which** was taking up 10GB.\"*\n    *   *(Temp klasörünü sildim. Ekstra bilgi: O klasör 10GB yer kaplıyordu.)*"
  },
  {
    "category": "Relative Clauses",
    "title": "Who vs. Which — People vs. Things",
    "explanation": "Use 'who/whom' for people and 'which/that' for things. In tech context, companies can take 'that' or 'which'.",
    "correctExample": "The engineer who wrote this PR is on vacation.",
    "wrongExample": "The engineer which wrote this PR is on vacation.",
    "level": "B1",
    "lessonContent": "# Who vs. Which (Kişiler ve Nesneler)\n\nCümle içinde bir kişiyi veya bir nesneyi nitelerken kullandığımız ilgi zamirleri (Relative Pronouns) farklıdır.\n\n## 1. WHO (Sadece İnsanlar İçin)\nTakım arkadaşlarından, müşterilerden veya kullanıcılardan bahsederken kullanılır.\n*   ❌ *\"The user which reported the bug...\"* (YANLIŞ - Kullanıcı nesne değildir.)\n*   ✅ *\"The user **who** reported the bug is waiting for a fix.\"* (DOĞRU)\n\n## 2. WHICH (Sadece Cansız Nesneler ve Sistemler İçin)\nVeritabanları, sunucular, değişkenler veya projelerden bahsederken kullanılır.\n*   ✅ *\"The script **which** automates the backup failed.\"*"
  },
  {
    "category": "Reported Speech",
    "title": "Tense Backshift in Reporting",
    "explanation": "When reporting what someone said, shift tenses one step back: Present → Past, Past → Past Perfect, will → would. This is critical in meeting notes and documentation.",
    "correctExample": "She said that the deployment had failed. (original: 'The deployment failed.')",
    "wrongExample": "She said that the deployment failed. (ambiguous — did it fail now or then?)",
    "level": "B2",
    "lessonContent": "# Tense Backshift in Reporting (Aktarımlı Anlatımda Zaman Kayması)\n\nSlack'te veya bir toplantıda \"Ahmet şöyle dedi\" derken (Reported Speech), orijinal cümlenin zamanını \"bir adım geçmişe\" (Backshift) çekmeniz gerekir.\n\n## Nasıl Yapılır?\nEğer ana fiiliniz geçmiş zamansa (*\"He said...\"*), içerideki cümleyi geçmişe itmelisiniz.\n*   **Orijinal Cümle (Ahmet):** *\"The API **is** down.\"* (Present Simple)\n*   **Sizin Aktarımınız:** *\"Ahmet said that the API **was** down.\"* (Past Simple'a kaydı)\n\n*   **Orijinal (Müşteri):** *\"I **cannot** login.\"*\n*   **Sizin Aktarımınız:** *\"The customer reported that they **could not** login.\"*\n\n> **💡 İstisna:** Eğer bahsedilen teknik sorun **şu an hala devam ediyorsa**, zaman kaydırması yapmayabilirsiniz: *\"Ahmet said the API is down.\"*"
  },
  {
    "category": "Reported Speech",
    "title": "Reporting Questions",
    "explanation": "When reporting a question, use statement word order (no inversion). Use 'if/whether' for yes/no questions and the original question word for wh-questions.",
    "correctExample": "He asked whether the API was ready for production.",
    "wrongExample": "He asked is the API ready for production.",
    "level": "B2",
    "lessonContent": "# Reporting Questions (Soru Cümlelerini Aktarmak)\n\nBirinin sorduğu soruyu başkasına aktarırken (Örn: \"Müşteri loglara nasıl erişeceğini sordu\"), cümle artık bir soru cümlesi olmaktan çıkar ve **düz cümleye (Subject + Verb)** dönüşür. Soru işareti (?) kullanılmaz.\n\n## Kural: Yardımcı Fiili Eski Yerine Koy!\n*   **Orijinal Soru:** *\"Why **did** the server **crash**?\"* (Soru formatı)\n*   ❌ **Yanlış Aktarım:** *\"The manager asked why did the server crash.\"*\n*   ✅ **Doğru Aktarım:** *\"The manager asked why the server **had crashed**.\"* (Düz cümle yapısı: Neden çöktüğünü sordu.)\n\n*   **Orijinal Soru:** *\"Where **is** the config file?\"*\n*   ✅ **Doğru Aktarım:** *\"He asked where the config file **was**.\"*"
  },
  {
    "category": "Comparatives & Superlatives",
    "title": "Short vs. Long Adjectives",
    "explanation": "Short adjectives (1 syllable): add -er/-est (faster, fastest). Long adjectives (2+ syllables): use more/most (more efficient, most scalable). Never combine both.",
    "correctExample": "PostgreSQL is more reliable than SQLite for production workloads.",
    "wrongExample": "PostgreSQL is more reliabler than SQLite for production workloads.",
    "level": "B1",
    "lessonContent": "# Short vs. Long Adjectives (Karşılaştırma Yaparken Kelime Uzunluğu)\n\nİki teknolojiyi veya çözümü karşılaştırırken (Örn: \"Daha hızlı\", \"Daha güvenli\"), sıfatın hece sayısına göre \"-er\" veya \"more\" kullanırız.\n\n## 1. Kısa Sıfatlar (1-2 Hece): Sonuna \"-er\" Alır\n*   Fast -> Faster\n*   Slow -> Slower\n*   Clean -> Cleaner\n*   ✅ *\"Go is **faster** than Python.\"*\n*   ❌ *\"Go is more fast than Python.\"* (YANLIŞ)\n\n## 2. Uzun Sıfatlar (3+ Hece): Başına \"more\" Alır\n*   Secure -> More secure\n*   Readable -> More readable\n*   Expensive -> More expensive\n*   ✅ *\"This code is **more readable** now.\"*\n*   ❌ *\"This code is readabler now.\"* (YANLIŞ)"
  },
  {
    "category": "Comparatives & Superlatives",
    "title": "Irregular Comparisons",
    "explanation": "Some adjectives have irregular forms: good → better → best, bad → worse → worst, far → further → furthest, little → less → least, many/much → more → most.",
    "correctExample": "This solution has better performance than the previous one.",
    "wrongExample": "This solution has gooder performance than the previous one.",
    "level": "B1",
    "lessonContent": "# Irregular Comparisons (Düzensiz Karşılaştırma Sıfatları)\n\nYazılım performansını değerlendirirken en çok kullandığımız \"iyi/kötü\" gibi sıfatlar, kısa olmalarına rağmen \"-er\" takısı almazlar; kelime tamamen değişir.\n\n## Bilmeniz Gereken 3 Kritik Kelime:\n1.  **Good (İyi)** -> **Better (Daha iyi)** -> **Best (En iyi)**\n    *   ❌ *\"This algorithm is gooder.\"*\n    *   ✅ *\"This algorithm is **better**.\"*\n2.  **Bad (Kötü)** -> **Worse (Daha kötü)** -> **Worst (En kötü)**\n    *   ✅ *\"The new update made the performance **worse**.\"*\n3.  **Far (Uzak/İleri)** -> **Further (Daha ileri)**\n    *   ✅ *\"We need to investigate this **further**.\"* (Bunu daha detaylı/ileri incelememiz lazım.)"
  },
  {
    "category": "Professional Phrasing",
    "title": "Softening Criticism in Code Reviews",
    "explanation": "Use passive voice, 'we', or suggestion phrases to avoid sounding accusatory. Replace 'you' with 'we' or impersonal constructions.",
    "correctExample": "Consider extracting this logic into a separate utility function.",
    "wrongExample": "You need to fix your messy code here.",
    "level": "B2",
    "lessonContent": "# Softening Criticism (Code Review'da Eleştiriyi Yumuşatma)\n\nİyi bir Senior Mühendis, sadece iyi kod yazan değil, aynı zamanda iyi ve kırıcı olmayan bir üslupla kod inceleyen kişidir. İletişimde \"sertlik\" yerine \"işbirliği\" dili kullanılmalıdır.\n\n## Altın Kurallar\n1. **\"You\" (Sen) Yerine \"We\" (Biz) Veya \"The Code\" (Kod) Kullanın:**\n   Kişiye değil koda odaklanın.\n   * ❌ *\"You didn't handle the error.\"* (Sen hatayı yakalamadın - Agresif)\n   * ✅ *\"**We** should handle the error here.\"* veya *\"**This block** needs error handling.\"*\n\n2. **Sorularla Yönlendirin (Socratic Method):**\n   \"Bunu değiştir\" demek yerine düşündürtün.\n   * ❌ *\"Extract this to a separate file.\"* (Emir)\n   * ✅ *\"**What do you think about** extracting this to a separate file?\"* (Bunu ayrı dosyaya çıkarmaya ne dersin?)\n\n3. **Önerileri Yumuşatın (Softening Words):**\n   * ✅ *\"It **might be better** to use a Map here.\"* (Burada Map kullanmak daha iyi olabilir.)"
  },
  {
    "category": "Professional Phrasing",
    "title": "Hedging Language — Sounding Uncertain Professionally",
    "explanation": "Use hedging words to avoid sounding too absolute: 'It seems that...', 'It appears...', 'This might be due to...', 'It is likely that...'. This is critical in incident reports.",
    "correctExample": "It appears that the memory leak might be caused by unclosed connections. (leaves room for further investigation)",
    "wrongExample": "The memory leak is caused by unclosed connections.",
    "level": "C1",
    "lessonContent": "# Neden \"Hedging\" Kullanıyoruz?\n\nYazılım mühendisliğinde, özellikle **Production** (canlı ortam) ortamında bir hata çıktığında (Incident), sorunun kök nedenini (Root Cause) anında %100 kesinlikle bilmek nadiren mümkündür.\n\nEğer emin olmadan kesin bir dil kullanırsanız ve yanılırsanız, teknik güvenilirliğiniz (credibility) sarsılır. Bu nedenle, üst düzey mühendisler tahminlerini **Hedging Language (Esnetme Dili)** kullanarak ifade ederler.\n\n## Kesinlik Derecesine Göre Kalıplar\n\n### 1. Düşük Kesinlik (Sadece bir fikir/şüphe)\nLoglarda garip bir şey gördünüz ama kanıtınız yok.\n*   **Kalıp:** `It seems that...`, `It appears that...`\n*   **Örnek:** *\"It seems that the garbage collector is working overtime.\"* (Görünüşe göre çöp toplayıcı fazla mesai yapıyor.)\n\n### 2. Orta Kesinlik (Teknik bir bağlantı var ama kanıtlanmamış)\nSisteme yeni bir özellik eklendi ve hemen ardından sistem çöktü. Güçlü bir şüpheniz var.\n*   **Kalıp:** `This might be due to...`, `...could be caused by...`\n*   **Örnek:** *\"The latency spike might be due to the unindexed database query.\"* (Gecikme artışı indekslenmemiş veritabanı sorgusundan kaynaklanıyor olabilir.)\n\n### 3. Yüksek Kesinlik (Eminiz ama yine de mütevaziyiz)\nSorunu buldunuz ama ekibe \"Ben buldum, kesin bu!\" demek yerine daha profesyonel bir dil kullanıyorsunuz.\n*   **Kalıp:** `It is highly likely that...`\n*   **Örnek:** *\"It is highly likely that the memory leak is in the authentication middleware.\"* (Büyük ihtimalle bellek sızıntısı kimlik doğrulama katmanında.)\n\n> **💡 Pro Tip:** *Incident Report* veya *Post-mortem* yazarken asla \"X caused Y\" yazarak takım arkadaşlarınızı suçlamayın. Daima \"The incident was likely caused by a timeout in service X\" şeklinde pasif ve esnek bir dil kullanın."
  },
  {
    "category": "Professional Phrasing",
    "title": "Action Items in Meeting Notes",
    "explanation": "Use 'will + base verb' for commitments and 'to + base verb' for action items. Be specific with deadlines and owners.",
    "correctExample": "Action: @john will update the CI pipeline by Friday.",
    "wrongExample": "Action: John updates CI pipeline.",
    "level": "B2",
    "lessonContent": "# Action Items (Toplantı Notlarında Eylem Maddeleri)\n\nToplantı bittikten sonra (Örn: Sprint Planning veya Retrospective), kimin ne yapacağını yazarken uzun cümleler kurulmaz. Kısa, net ve \"Emir kipi (Imperative)\" veya \"To V1\" formatında maddeler (Action Items) yazılır.\n\n## Doğru Yazım Formatı\nHer maddenin bir fiil ile (tercihen güçlü bir aksiyon fiili ile) başlaması gerekir.\n\n*   ❌ *\"Ali is going to investigate the database slowness.\"* (Çok uzun)\n*   ✅ **\"Investigate the database slowness (@Ali)\"** (Net ve aksiyon odaklı)\n*   ✅ **\"Update the API documentation (@Ayşe)\"**\n*   ✅ **\"Schedule a follow-up meeting with the DevOps team.\"**\n\n> **💡 İpucu:** Action Item'ların başına her zaman sorumlusunu (Assignee) etiketleyin."
  },
  {
    "category": "Word Order",
    "title": "Adverb Placement — Frequency Adverbs",
    "explanation": "Frequency adverbs (always, usually, often, sometimes, rarely, never) go BEFORE the main verb but AFTER 'be'. With auxiliary verbs, they go between the auxiliary and main verb.",
    "correctExample": "The CI pipeline always runs before merging to main.",
    "wrongExample": "Always the CI pipeline runs before merging to main.",
    "level": "B1",
    "lessonContent": "# Adverb Placement (Sıklık Zarflarının Cümledeki Yeri)\n\n\"Always, never, usually, sometimes\" gibi sistem davranışlarının sıklığını belirten kelimelerin İngilizce cümlede konulması gereken yer çok kesindir.\n\n## Altın Kural\nSıklık zarfları, **Yardımcı Fiil (is/are/can/will) ile Ana Fiil arasına** girer. Eğer yardımcı fiil yoksa, doğrudan ana fiilin önüne gelir.\n\n### 1. Sadece Ana Fiil Varsa (Fiilden Önce)\n*   ❌ *\"The script crashes always.\"*\n*   ✅ *\"The script **always** crashes.\"* (Script her zaman çöker.)\n\n### 2. Yardımcı Fiil Varsa (Ortaya)\n*   ❌ *\"The server is down usually on Sundays.\"*\n*   ✅ *\"The server is **usually** down on Sundays.\"* (Yardımcı fiil 'is' ile 'down' arasına girdi.)\n*   ✅ *\"We will **never** use this library again.\"* (will ve use arasında.)"
  },
  {
    "category": "Word Order",
    "title": "Adjective Order — Opinion Before Fact",
    "explanation": "When using multiple adjectives, follow this order: Opinion → Size → Age → Shape → Color → Origin → Material → Purpose. In tech: 'a robust new open-source monitoring tool'.",
    "correctExample": "We implemented an efficient new caching mechanism.",
    "wrongExample": "We implemented a new efficient caching mechanism.",
    "level": "C1",
    "lessonContent": "# Adjective Order (Sıfatların Dizilişi: Önce Fikir, Sonra Gerçek)\n\nBir nesneyi (örneğin bir kodu veya aracı) birden fazla sıfatla tanımlarken İngilizcede rastgele bir sıra izlenmez. En temel kural: **Öznel fikirleriniz her zaman somut gerçeklerden (boyut, yaş, renk, amaç) önce gelir.**\n\n## Kural: Opinion -> Fact (Fikir -> Gerçek)\nEğer hem \"Güzel (Beautiful)\" hem de \"Yeni (New)\" diyecekseniz, \"Güzel\" sizin fikrinizdir, \"Yeni\" ise gerçektir.\n\n*   ❌ *\"A new beautiful framework.\"* (Kulağa tuhaf gelir)\n*   ✅ *\"A **beautiful new** framework.\"* (Fikir + Gerçek)\n*   ✅ *\"An **elegant small** component.\"* (Zarif küçük bir bileşen.)\n\n> **💡 İpucu:** Koda yorum yaparken de önce fikrinizi söyleyin: *\"This is a **clever new** algorithm.\"* (Bu zekice yeni bir algoritma.)"
  }
]