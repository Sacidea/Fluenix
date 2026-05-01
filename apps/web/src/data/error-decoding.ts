export type ScenarioType = 'stack-trace' | 'documentation'

export interface ErrorScenario {
  id: string
  title: string
  type: ScenarioType
  difficulty: 'Beginner' | 'Intermediate'
  content: string // The actual error log or doc text
  eli5: string // "Explain like I'm 5" simple explanation in Turkish
  highlights: { word: string, tooltip: string }[] // Interactive words to highlight
  question: string
  options: {
    id: string
    text: string
    isCorrect: boolean
    explanation: string
  }[]
}

export const mockErrorScenarios: ErrorScenario[] = [
  {
    id: 'err_1',
    title: 'React Hooks Error',
    type: 'stack-trace',
    difficulty: 'Beginner',
    content: `Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app

    at resolveDispatcher (react.development.js:1476:1)
    at useState (react.development.js:1507:1)
    at fetchUserData (utils.js:42:15)
    at UserProfile (UserProfile.jsx:12:3)`,
    eli5: "Yapay Zeka Özeti: React diyor ki; 'Hook' dediğimiz özel React fonksiyonlarını (useState gibi) sadece React bileşenlerinin (components) içinde kullanabilirsin. Gidip normal bir JavaScript fonksiyonunun içine yazmışsın, bu yasak!",
    highlights: [
      { word: 'Invalid hook call', tooltip: 'Geçersiz kanca (hook) çağrısı' },
      { word: 'mismatching versions', tooltip: 'Uyumsuz versiyonlar (farklı React sürümleri çakışıyor olabilir)' },
      { word: 'Rules of Hooks', tooltip: 'Kanca Kuralları (React dökümanındaki katı kurallar seti)' }
    ],
    question: 'Based on the stack trace, what is the most likely cause of this error?',
    options: [
      {
        id: 'o1',
        text: 'The application is using an outdated version of React DOM.',
        isCorrect: false,
        explanation: 'While mismatching versions is a possibility, the stack trace shows the hook is called inside `fetchUserData` (a utility function), which is a clear violation of the Rules of Hooks.'
      },
      {
        id: 'o2',
        text: 'A React Hook (useState) is being called inside a regular JavaScript function (fetchUserData) instead of a component.',
        isCorrect: true,
        explanation: 'Correct! The stack trace shows `useState` is called inside `fetchUserData`. Hooks must only be called directly inside React function components or custom hooks.'
      },
      {
        id: 'o3',
        text: 'There is a syntax error in the UserProfile.jsx file at line 12.',
        isCorrect: false,
        explanation: 'The error is a runtime violation of React rules, not a syntax error. The code compiles fine but crashes when executed.'
      }
    ]
  },
  {
    id: 'err_2',
    title: 'AWS S3 Access Denied',
    type: 'stack-trace',
    difficulty: 'Beginner',
    content: `botocore.exceptions.ClientError: An error occurred (AccessDenied) when calling the PutObject operation: Access Denied

Traceback (most recent call last):
  File "upload_script.py", line 14, in <module>
    s3.upload_file("report.csv", "company-confidential-bucket", "report_2023.csv")
  File "/usr/local/lib/python3.9/site-packages/boto3/s3/inject.py", line 143, in upload_file
    return transfer.upload_file(
  File "/usr/local/lib/python3.9/site-packages/boto3/s3/transfer.py", line 292, in upload_file
    future.result()`,
    eli5: "Yapay Zeka Özeti: AWS S3 (depolama servisi) senin bu dosyayı 'company-confidential-bucket' adlı klasöre yüklemene izin vermiyor. Çünkü kullandığın anahtarların (credentials) 'yazma' yetkisi yok. Sadece okuma yetkin olabilir.",
    highlights: [
      { word: 'ClientError', tooltip: 'İstemci Hatası (Sorun sunucuda değil, senin gönderdiğin istekte)' },
      { word: 'AccessDenied', tooltip: 'Erişim Reddedildi (Yetkin yok)' },
      { word: 'PutObject', tooltip: 'Nesne Koyma (AWS S3\'te dosya yükleme işleminin teknik adı)' }
    ],
    question: 'Why did the script fail to upload the file?',
    options: [
      {
        id: 'o1',
        text: 'The file "report.csv" does not exist on the local machine.',
        isCorrect: false,
        explanation: 'If the file was missing, you would get a "FileNotFoundError", not an "AccessDenied" error from botocore.'
      },
      {
        id: 'o2',
        text: 'The AWS credentials used by the script do not have permission to write (PutObject) to the "company-confidential-bucket".',
        isCorrect: true,
        explanation: 'Exactly! The IAM role or user running this script lacks the `s3:PutObject` permission for that specific bucket.'
      },
      {
        id: 'o3',
        text: 'The bucket "company-confidential-bucket" does not exist in the AWS account.',
        isCorrect: false,
        explanation: 'If the bucket did not exist, S3 would return a "NoSuchBucket" error, not "AccessDenied".'
      }
    ]
  },
  {
    id: 'err_3',
    title: 'Reading Next.js Docs',
    type: 'documentation',
    difficulty: 'Intermediate',
    content: `Data Fetching in Next.js 14
Server Components allow you to fetch data directly on the server without needing a separate API route. You can use async/await directly in your Server Components.

By default, Next.js caches fetch() requests. If you are fetching data that changes frequently, you can opt out of caching by passing { cache: 'no-store' } to the fetch function, or by setting export const dynamic = 'force-dynamic' at the top of your file.`,
    eli5: "Yapay Zeka Özeti: Next.js çektiğin verileri varsayılan olarak hafızasında (cache) tutar ki sayfa hızlı açılsın. Ama verin sürekli değişiyorsa (mesela borsa fiyatları), cache kullanmamasını söylemen lazım. Bunu da { cache: 'no-store' } yazarak yaparsın.",
    highlights: [
      { word: 'fetch data directly', tooltip: 'Veriyi doğrudan çekmek (Aracı bir API olmadan)' },
      { word: 'caches', tooltip: 'Önbelleğe alır (Sonucu hafızasında tutar)' },
      { word: 'opt out', tooltip: 'Devre dışı bırakmak / İptal etmek' }
    ],
    question: 'According to this documentation, how do you ensure your component always fetches the freshest data on every request?',
    options: [
      {
        id: 'o1',
        text: 'Create a separate API route to bypass the Server Component cache.',
        isCorrect: false,
        explanation: 'The docs state you can fetch data directly on the server without needing a separate API route.'
      },
      {
        id: 'o2',
        text: 'Add { cache: "no-store" } to the fetch request options.',
        isCorrect: true,
        explanation: 'Correct! The documentation explicitly mentions passing `{ cache: "no-store" }` to opt out of the default caching behavior.'
      },
      {
        id: 'o3',
        text: 'Remove the async/await keywords from the Server Component.',
        isCorrect: false,
        explanation: 'Removing async/await would break the promise handling. The caching behavior is controlled via fetch options or route segment configs.'
      }
    ]
  },
  {
    id: 'err_4',
    title: 'Git Merge Conflict',
    type: 'stack-trace',
    difficulty: 'Beginner',
    content: `$ git merge feature/payment-gateway
Auto-merging src/services/api.ts
CONFLICT (content): Merge conflict in src/services/api.ts
Automatic merge failed; fix conflicts and then commit the result.`,
    eli5: "Yapay Zeka Özeti: Git diyor ki: 'Senin kodunla başkasının kodu aynı dosyanın aynı satırlarında çakıştı (conflict). Hangisini seçeceğime ben karar veremem, dosyayı açıp elinle düzeltmen lazım.'",
    highlights: [
      { word: 'Auto-merging', tooltip: 'Otomatik birleştirme (Git önce kendi çözmeye çalışır)' },
      { word: 'Merge conflict', tooltip: 'Birleştirme çakışması (Aynı satırlarda farklı değişiklikler var)' },
      { word: 'fix conflicts', tooltip: 'Çakışmaları manuel olarak düzelt' }
    ],
    question: 'What is the immediate next step the developer must take?',
    options: [
      {
        id: 'o1',
        text: 'Run `git push --force` to override the conflict.',
        isCorrect: false,
        explanation: 'Force pushing now would not solve the local conflict and might overwrite work on the remote branch.'
      },
      {
        id: 'o2',
        text: 'Open `src/services/api.ts`, manually resolve the conflicting lines, and then commit the file.',
        isCorrect: true,
        explanation: 'Correct. Git requires human intervention when it cannot automatically merge changes in the same part of a file.'
      },
      {
        id: 'o3',
        text: 'Run `git commit` immediately to skip the conflicting files.',
        isCorrect: false,
        explanation: 'Git will prevent you from committing until all conflicts are marked as resolved.'
      }
    ]
  },
  {
    id: 'err_5',
    title: 'PostgreSQL Fatal Error',
    type: 'stack-trace',
    difficulty: 'Intermediate',
    content: `psycopg2.OperationalError: FATAL:  remaining connection slots are reserved for non-replication superuser connections

    at psycopg2.connect(dsn, **kwargs)
    at create_engine(url)
    at pool.get_connection()`,
    eli5: "Yapay Zeka Özeti: Veritabanı (PostgreSQL) ağzına kadar dolu! Kabul edebileceği maksimum bağlantı sayısına ulaşmış. Kalan 3-5 boş yeri de sadece adminler (superuser) acil durumlarda girip düzeltebilsin diye rezerve etmiş, sana izin vermiyor.",
    highlights: [
      { word: 'OperationalError', tooltip: 'Operasyonel Hata (Kodda değil, sistemin çalışmasında bir sorun var)' },
      { word: 'connection slots', tooltip: 'Bağlantı yuvaları (Veritabanına aynı anda bağlanabilecek kişi/sistem limiti)' },
      { word: 'superuser', tooltip: 'Süper kullanıcı (Tam yetkili admin)' }
    ],
    question: 'What is the root cause of this database error?',
    options: [
      {
        id: 'o1',
        text: 'The application is providing the wrong database password.',
        isCorrect: false,
        explanation: 'A wrong password would result in a "password authentication failed" error, not a connection slot error.'
      },
      {
        id: 'o2',
        text: 'The database is down and cannot be reached.',
        isCorrect: false,
        explanation: 'The database is reachable (it responded with FATAL), but it refused the connection.'
      },
      {
        id: 'o3',
        text: 'The database has reached its maximum allowed number of concurrent client connections.',
        isCorrect: true,
        explanation: 'Correct! The error clearly states that all available connection slots are full, leaving only the reserved slots for superusers.'
      }
    ]
  }
]
