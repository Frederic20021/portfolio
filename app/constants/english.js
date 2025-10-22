
// Sample course data based on the image
export const courses = [
  {
  // You can add more courses here
    id: 1,
    prof: "角谷寛人",
    tags: ["教科指導", "月額"],
    title: "【英文法】大人の英文法学び直し!コース",
    image: "/english/course/grammar.jpg",
    description:
      "学生時代に学んだ英文法を基礎から学び直したい社会人の方向けのコースです。忘れてしまった文法知識を体系的に復習し、ビジネスや日常会話で使える実践的な英語力を身につけます。",
    features: {
      interview: "あり",
      freeTrial: "あり",
    },
    pricing: {
      duration: "1回 90分",
      price: "¥24,000",
    },
    stripeLink : "https://buy.stripe.com/bJe28tfxy99Ta65fI04Ja05",
  },
  
  {
    id: 2,
    prof: "角谷寛人",
    tags: ["教科指導", "英検", "月額"],
    title: "【英検対策】英検２級以上の合格を目指す!",
    image: "/english/course/eiken.jpg",
    description:
      "英検２級、準１級、１級の合格を目指す方向けの対策コースです。近年の英検改定に対応し、CBT型のスピーキングテストや要旨要約問題など、新形式にもしっかり対応した指導を行います。",
    features: {
      interview: "あり",
      freeTrial: "あり",
    },
    pricing: {
      duration: "1回 90分",
      price: "¥24,000",
    },
    stripeLink : "https://buy.stripe.com/cNi28t1GI5XH7XXgM44Ja04",
  },
  
  {
    id: 3,
    prof: "角谷寛人",
    tags: ["教科指導", "英会話", "月額"],
    title: "【英会話】ビジネス・日常英会話力を向上!",
    image: "/english/course/speaking.jpg",
    description:
      "実践的な英会話力を身につけたい方向けのコースです。ビジネスシーンや日常生活で使える会話表現を学び、自信を持って英語でコミュニケーションが取れるようになることを目指します。",
    features: {
      interview: "あり",
      freeTrial: "あり",
    },
    pricing: {
      duration: "1回 90分",
      price: "¥20,000",
    },
    stripeLink : "https://buy.stripe.com/8x214pdpqdq9ba97bu4Ja06",
  },
  
  {
    id: 4,
    prof: "角谷寛人",
    tags: ["教科指導", "TOEIC", "月額"],
    title: "【TOEIC対策】目指せ700点オーバー!",
    image: "/english/course/toeic.jpg",
    description:
      "TOEIC700点以上を目指す方向けの対策コースです。スコアアップに必要な語彙力、リスニング力、リーディング力を効率的に強化し、キャリアアップや海外駐在のチャンスを掴みましょう！",
    features: {
      interview: "あり",
      freeTrial: "あり",
    },
    pricing: {
      duration: "1回 90分",
      price: "¥20,000",
    },
    stripeLink : "https://buy.stripe.com/00wcN7gBC99T0vv0N64Ja02",
  },
{
    id: 5,
    prof: "SI THU LIN",
    tags: ["教科指導", "月額"],
    title: "【ビジネス文書の添削】ビジネス文書力向上!",
    image: "/english/course/writing.jpg",
    description:
      "ビジネス文書の添削を通じて、実践的なライティングスキルを向上させるコースです。正確な文法、適切な表現、効果的な構成を学び、ビジネスシーンで通用する文書作成能力を身につけます。",
    features: {
      interview: "あり",
      freeTrial: "あり",
    },
    pricing: {
      duration: "1回 60分",
      price: "¥25,000",// 20,000 x 1.25
    },
    stripeLink : "https://buy.stripe.com/14A00ldpqgCleml1Ra4Ja08",
  },
  {
    id: 6,
    prof: "島田悠次",
    tags: ["教科指導", "月額"],
    title: "【カタカナ英語でOK】3分で話せます！体験レッスン",
    image: "/english/course/easy.jpg",
    description:
      "カタカナ英語でも大丈夫！短時間で実践的な英会話を体験できるお得な体験レッスンです。海外旅行・出張、インバウンド対応、ビジネス対応の3つのシーンに対応した実践的な英会話を学べます。",
    features: {
      interview: "あり",
      freeTrial: "なし",
    },
    pricing: {
      duration: "1回 60分",
      price: "¥1,875",// 1,500 x 1.25
      originalPrice: "¥10,000",
    },
    stripeLink : "https://buy.stripe.com/14A5kFade3Pz0vv1Ra4Ja09",
  },
  {
    id: 7,
    prof: "島田悠次",
    tags: ["教科指導", "短期集中"],
    title: "【海外出張前の短期集中レッスン】3回コース",
    image: "/english/course/business-trip.jpg",
    description:
      "海外出張を控えた方向けの短期集中コースです。入国審査・両替からホテルチェックイン、挨拶、ミーティングまで、実際の場面を想定した実践的な練習を行います。",
    features: {
      interview: "なし",
      freeTrial: "なし",
    },
    pricing: {
      duration: "3回コース",
      price: "¥37,500",// 30,000 x 1.25   
    },
    stripeLink : "https://buy.stripe.com/4gM8wR4SUfyh0vvdzS4Ja0a",
  },
  {
    id: 8,
    prof: "島田悠次",
    tags: ["教科指導", "英会話"],
    title: "【基本英会話習得レッスン】12回コース（3か月）",
    image: "/english/course/basic-conversation.jpg",
    description:
      "3ヶ月で基本的な英会話力を身につけるコースです。海外旅行・出張対応、インバウンド対応、ビジネス対応の3つのシーンに対応できる実践的な英会話スキルを習得します。",
    features: {
      interview: "あり",
      freeTrial: "あり",
    },
    pricing: {
      duration: "12回コース（3ヶ月）",
      price: "¥120,000",// 96000 x 1.25
    },
    stripeLink : "https://buy.stripe.com/00w9AV3OQ0Dn1zz1Ra4Ja0b",
  },
  {
    id: 9,
    prof: "島田悠次",
    tags: ["教科指導", "企業向け"],
    title: "【企業向け英会話レッスン】",
    image: "/english/course/corporate.jpg",
    description:
      "企業様向けのカスタマイズレッスンです。ビジネス対応やインバウンド対応など、企業のニーズに合わせた実践的な英会話指導を行います。",
    features: {
      interview: "あり",
      freeTrial: "要相談",
    },
    pricing: {
      duration: "1回 60分",
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
    answer: "無料体験では、実際の授業と同じ内容を60分間受講していただけます。お客様の現在のレベルチェック、目標設定、学習プランの提案まで行います。体験後には詳細なフィードバックもお渡しします。"
  },
  {
    id: 2,
    question: "レッスンの予約やキャンセルはいつまでできますか？",
    answer: "レッスンの予約は24時間前まで、キャンセルは12時間前まで可能です。急な予定変更の場合は、できるだけ早めにご連絡ください。キャンセル料は発生しませんが、当日キャンセルの場合は1回分消化となります。"
  },
  {
    id: 3,
    question: "サブスクプランと単発プランの違いは何ですか？",
    answer: "サブスクプランは月額制で、定期的な学習を継続したい方におすすめです。レッスン料金がお得になり、予約も優先的に取れます。単発プランは必要な時だけ受講したい方向けで、1回ずつお支払いいただくプランです。"
  },
  {
    id: 4,
    question: "どんな講師がレッスンを担当しますか？",
    answer: "全ての講師は厳しい選考を通過した経験豊富な専門講師です。英語教授法の資格を持つネイティブ講師、帰国子女、英語教育のスペシャリストが在籍しています。生徒様のレベルや目標に合わせて最適な講師をマッチングします。"
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
    avatar: '/hero/avatar1.jpg' // Using existing image as placeholder
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
    avatar: '/hero/avatar3.jpg'
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
          "私立高校の英語科専任教諭\n(進路指導部国際教育委員会)",
          "大手日本メーカーにて海外営業\n 経営・事業企画を担当"
        ]
      }
    ],
    image: "/hero/CEO.jpg",
  },
  {
    id: 2,
    name: "島田 悠次",
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
          "海外事業 24年\n（貿易・部品調達・海外関連会社支援・取引契約）",
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