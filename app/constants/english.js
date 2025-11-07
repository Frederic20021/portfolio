export const pitch = [
  {
    id: '01',
    titleHighlight: "最短一週間で",
    titleRest: "すぐに\n無料体験がスタート可能！",
    image: "",
    description: "気になる教師と相性をしっかり確認してから始められるので、初心者の方でも安心。面倒な手続きがなく、あなたの目的に合った講師とスムーズに学習をスタートできます。",

  },
  {
    id: '02',
    titleHighlight: "マンツーマン",
    titleRest: "だから弱点をすぐに克服！",
    image: "",
    description: "1対1レッスンで、発音・会話のクセを的確にフィードバック。個別希望する講師が目的やレベルに合わせて進めるため、無駄のない最短ルートで実力アップが可能です。",
  },
  {
    id: '03',
    titleHighlight: "実力派講師がサポート",
    titleRest: "するから安心＆継続しやすい",
    image: "",
    description: "講師がビジネス経験者・留学経験者だから、会議やメールの職場設定だけではなく、留学など本当に使える“リアルな英語”をマンツーマンで効率よく習得できます。",
  },
  {
    id: '04',
    titleHighlight: "日本語での質問",
    titleRest: "OKだから、実践英語が身につく！",
    image: "",
    description: "分からないことは日本語で質問OK。英語初心者でも“なんとなく”にせず、納得しながら学べます。講師とのやりとりもスムーズで、継続しやすく、途中で挫折しにくいのが強みです。",

  },
]

export const courses = [
  {
  // You can add more courses here
    id: 1,
    prof: "角谷寛人",
    tags: ["教科指導"],
    payType: "月額",
    title: "【英文法】大人の英文法学び直し!コース",
    image: "/english/course/grammar.jpg",
    description:
      "学生時代に学んだ英文法を基礎から学び直したい社会人の方向けのコースです。忘れてしまった文法知識を体系的に復習し、ビジネスや日常会話で使える実践的な英語力を身につけます。",
    features: {
      freeTrial: "あり",
    },
    pricing: {
      duration: "60分 x4回",
      price: "¥25,000",
    },
    stripeLink : "https://buy.stripe.com/eVq9AV71271LdihfI04Ja0d",
  },
  
  {
    id: 2,
    prof: "角谷寛人",
    tags: ["教科指導", "英検"],
    payType: "月額",
    title: "【英検対策】英検２級以上の合格を目指す!",
    image: "/english/course/eiken.jpg",
    description:
      "英検２級、準１級、１級の合格を目指す方向けの対策コースです。近年の英検改定に対応し、CBT型のスピーキングテストや要旨要約問題など、新形式にもしっかり対応した指導を行います。",
    features: {
      freeTrial: "あり",
    },
    pricing: {
      duration: "60分 x4回",
      price: "¥25,000",
    },
    stripeLink : "https://buy.stripe.com/6oU3cx3OQ85P5PP3Zi4Ja0e",
  },
  {
    id: 3,
    prof: "角谷寛人",
    tags: ["教科指導", "TOEIC"],
    payType: "月額",
    title: "【TOEIC対策】目指せ700点オーバー!",
    image: "/english/course/toeic.jpg",
    description:
      "TOEIC700点以上を目指す方向けの対策コースです。スコアアップに必要な語彙力、リスニング力、リーディング力を効率的に強化し、キャリアアップや海外駐在のチャンスを掴みましょう！",
    features: {
      freeTrial: "あり",
    },
    pricing: {
      duration: "60分 x4回",
      price: "¥25,000",
    },
    stripeLink : "https://buy.stripe.com/dRm9AV8565XHced9jC4Ja0f",
  },
{
    id: 4,
    prof: "SI THU LIN",
    tags: ["教科指導"],
    payType: "月額",
    title: "【ビジネス文書の添削】ビジネス文書力向上!",
    image: "/english/course/writing.jpg",
    description:
      "ビジネス文書の添削を通じて、実践的なライティングスキルを向上させるコースです。正確な文法、適切な表現、効果的な構成を学び、ビジネスシーンで通用する文書作成能力を身につけます。",
    features: {
      freeTrial: "あり",
    },
    pricing: {
      duration: "60分 x4回",
      price: "¥25,000",// 20,000 x 1.25
    },
    stripeLink : "https://buy.stripe.com/14A00ldpqgCleml1Ra4Ja08",
  },
  {
    id: 5,
    prof: "島田悠次",
    tags: ["教科指導"],
    payType: "単発",
    title: "【カタカナ英語でOK】3分で話せます！体験レッスン",
    image: "/english/course/easy.jpg",
    description:
      "カタカナ英語でも大丈夫！短時間で実践的な英会話を体験できるお得な体験レッスンです。海外旅行・出張、インバウンド対応、ビジネス対応の3つのシーンに対応した実践的な英会話を学べます。",
    features: {
      freeTrial: "なし",
    },
    pricing: {
      duration: "60分 毎に",
      price: "¥1,875",// 1,500 x 1.25
      originalPrice: "¥10,000",
    },
    stripeLink : "https://buy.stripe.com/14A5kFade3Pz0vv1Ra4Ja09",
  },
  {
    id: 6,
    prof: "島田悠次",
    tags: ["教科指導", "短期集中"],
    payType: "単発",
    title: "【海外出張前の短期集中レッスン】",
    image: "/english/course/business-trip.jpg",
    description:
      "海外出張を控えた方向けの短期集中コースです。入国審査・両替からホテルチェックイン、挨拶、ミーティングまで、実際の場面を想定した実践的な練習を行います。",
    features: {
      freeTrial: "なし",
    },
    pricing: {
      duration: "3回コース",
      price: "¥37,500",// 30,000 x 1.25   
    },
    stripeLink : "https://buy.stripe.com/4gM8wR4SUfyh0vvdzS4Ja0a",
  },
  {
    id: 7,
    prof: "島田悠次",
    tags: ["英会話"],
    payType: "単発",
    title: "【基本英会話習得レッスン】",
    image: "/english/course/basic-conversation.jpg",
    description:
      "3ヶ月で基本的な英会話力を身につけるコースです。海外旅行・出張対応、インバウンド対応、ビジネス対応の3つのシーンに対応できる実践的な英会話スキルを習得します。",
    features: {
      freeTrial: "あり",
    },
    pricing: {
      duration: "12回コース（3ヶ月）",
      price: "¥120,000",// 96000 x 1.25
    },
    stripeLink : "https://buy.stripe.com/00w9AV3OQ0Dn1zz1Ra4Ja0b",
  },
  {
    id: 8,
    prof: "島田悠次",
    tags: ["教科指導", "企業向け"],
    payType: "単発",
    title: "【企業向け英会話レッスン】",
    image: "/english/course/corporate.jpg",
    description:
      "企業様向けのカスタマイズレッスンです。ビジネス対応やインバウンド対応など、企業のニーズに合わせた実践的な英会話指導を行います。",
    features: {
      freeTrial: "要相談",
    },
    pricing: {
      duration: "60分 毎に",
      price: "¥37,500",//30000 x 1.25
    },
    stripeLink : "https://buy.stripe.com/aFa14p5WY99T5PP53m4Ja0c",
  }
];


// Sample Q&A data based on the image
export const qaData = [
  {
    id: 1,
    question: "無料体験は、どこまでできますか？",
    answer: "無料体験では、実際の授業に加えてお客様の現在のレベルチェックします。目標設定、学習プランの計画を立てた上で、体験後に詳細なフィードバックもお渡しします。"
  },
  {
    id: 2,
    question: "レッスン予約のキャンセルはいつまでできますか？",
    answer: "予約キャンセルは24時間前まで可能です。急な予定変更の場合は、できるだけ早めにご連絡ください。当日キャンセルの場合は1回分消化となります。"
  },
  {
    id: 3,
    question: "月額と単発プランの違いは何ですか？",
    answer: "月額プランは定期的な学習を継続したい方におすすめです。レッスン料金がお得になり、予約も優先的に取れます。単発プランは必要な時だけ受講したい方向けで、1回ずつお支払いいただくプランです。"
  },
  {
    id: 4,
    question: "どんな講師がレッスンを担当しますか？",
    answer: "留学や実務経験が豊富な講師それぞれのレッスンを担当します。英語教授法の資格を持つ講師、留学経験者、企業向けの指導経験がある講師が在籍しています。生徒様のレベルや目標に合わせて最適な講師をマッチングします。"
  }
];

// Sample testimonial data based on the image
export const testimonials = [
  {
    id: 1,
    name: '社会人',
    title: '教育指導',
    rating: 5,
    headline: '自分の苦手な部分を克服することができました',
    content: 'いつも丁寧な指導をして頂き、有難うございます。\n先生との授業を通じて自分の苦手な部分を見直すことができ、問題演習で間違えた点が、どの様にアプローチすると正しい回答になるのかをしっかり理解することができています。また、問題演習の中で、単語の発音、語順や似たような表現方法なども含めて指導していただいているため、英単語が覚えやすくなったり、英語の理解をより深めたりすることができており、感謝しております。今後とも先生のご指導ご鞭撻のほど、よろしくお願いいたします。',
    responsibleProf: '角谷寛人',
    avatar: '/hero/avatar3.jpg' // Using existing image as placeholder
  },
  {
    id: 2,
    name: '学生',
    title: '教育指導',
    rating: 5,
    headline: '苦手だった長文読解もスムーズに読めた！',
    content: '夏休み中の英検対策講座からご指導頂いております。学校では文法など詳しい指導がなく上部だけの学習を繰り返していて、応用問題に太刀打ちできないことが増えていました。角谷先生の指導で不足している学習内容を見抜いて頂き、学習プリントや宿題をしっかりやることで学校のテストでは１００点を取り、苦手だった外部模試での長文読解もスムーズに読めたことに成長を感じました。卒業までに英検２級取得が目標です。引き続き伴走宜しくお願い致します。',
    responsibleProf: '角谷寛人',
    avatar: '/hero/avatar2.jpg'
  },
  {
    id: 3,
    name: '学生',
    title: '教育指導',
    rating: 5,
    headline: '長文読解を簡単に読めるようになりました！',
    content: 'この度は、英検２級合格までのご指導を頂きありがとうございました。\nかどや先生に約１ヶ月間の集中特訓（週２回）を依頼しました。英検対策のオリジナル頻出問題は容易ではない問題もあり、夏休み中は基礎から鍛えて頂きました。英検対策は学校のテストにも通じるものもあり、長文読解などが簡単に読めるようになりました。次回は、中学卒業までに目標の２級合格を目指します。',
    responsibleProf: '角谷寛人',
    avatar: '/hero/avatar1.jpg'
  },
  {
    id: 4,
    name: '学生',
    title: '英文指導',
    rating: 5,
    headline: '英語を前より好きになりました!',
    content: 'レッスンがとてもインタラクティブで、毎回英語をたくさん使うことができました。\n話す機会が多いので、自分の英語に自信がついてきたと感じます。先生の説明も分かりやすくて、もっと勉強したいと思えるレッスンでした。',
    responsibleProf: 'SI THU LIN',
    avatar: '/hero/avatar1.jpg'
  },
];

//Professor's Information
export const ProfInfo = [
  {
    id: 1,
    name: "角谷寛人",
    kana: "カドヤヒロト",
    sections: [
      {
        title: "【免許・資格】",
        items: [
          "中学・高等学校教論一種免許状 (英語)",
          "実用英語技能検定1級",
          "TOEIC 960点",
        ]
      },
      {
        title: "【経歴】",
        items: [
          "私立高校の英語科専任教諭\n\t(進路指導部・国際教育委員会)",
          "大手日本メーカーにて海外営業\n\t経営・事業企画を担当"
        ]
      }
    ],
    image: "/hero/CEO.jpg",
  },
  {
    id: 2,
    name: "島田悠次",
    kana: "シマダ ユウジ",
    sections: [
      {
        title: "【免許・資格】",
        items: [
          "日本商工会議所　商業英語検定 Bクラス",
        ]
      },
      {
        title: "【経歴】",
        items: [
          "メーカーにて同時通訳38年",
          "海外事業 24年（貿易・部品調達・\n\t海外関連会社支援・取引契約）",
          "人事・総務・広報 11年",
          "海外駐在(USA) 3年"
        ]
      }
    ],
    image: "/english/prof3.jpg",
  },
  {
    id: 3,
    name: "Si Thu Lin",
    kana: "シ トゥ リン",
    sections: [
      {
        title: "【免許・資格】",
        items: [
          "TOEFL iBT 97点",
          "TOEIC 940点",
          "JLPT (日本語能力試験) N1"
        ]
      },
      {
        title: "【経歴】",
        items: [
          "カナダ交換留学 (オンタリオ工科大学)",
          "社会人向け英会話指導",
          "静岡大学にて留学希望者向け英語科目の\nティーチングアシスタント"
        ]
      }
    ],
    image: "/english/prof2.jpg",
  },
];