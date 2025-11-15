
export const services = [
    {
      title: "人材・職業紹介",
      description: "企業のニーズに沿った人材をご提案します。東南・南アジアの各国人材、幅広い業種に対応しております。",
      image: "/services/service1.jpg",
      link: "/recruitment"
    },
    {
      title: "日本語教育",
      description: "外国人材向けの実践的な日本語指導を実施。ビジネス会話・JLPT対策など、現場で役立つ日本語力を身に付けます。",
      image: "/services/service2.jpg",
      link: "/services/japanese"
    },
    {
      title: "英語教育",
      description: "　グローバル人材を目指す社会人・学生向けに、TOEIC対策やビジネス会話を指導。実践的な英語力を身に付け、海外での活躍を支援します。",
      image: "/services/service3.jpg",
      link: "/english"
    },
    {
      title: "ICT事業",
      description: "IT人材の紹介と企業向けICT導入支援を展開。クラウドなど最先端技術に対応した人材とAI面接等のソリューションを提供します。",
      image: "/services/service4.jpg",
      link: "/offshore"
    }
  ]

  export const footerLinks = [
    { name: "利用規約", href: "/" },
    { name: "プライバシーポリシー", href: "/" },
    { name: "法令に基づく表記", href: "/" },
    { name: "運営会社", href: "/" },
    { name: "採用情報", href: "/" },
  ]

  // Enhanced data structure with color schemes
  export const serviceTypes = [
    {
      id: 'tokuteiginou',
      title: '特定技能とは',
        titleColor: 'text-blue-700',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        headerColor: 'text-blue-600',
        image: "/recruitment/tokuteiginou.jpg",
        alt: '特定技能',
        description: `特定分野で外国人材の採用をご検討中の企業様向けの在留資格制度です。
          介護、外食、建設、農業などの分野において、即戦力となる優秀な外国人材を採用したい企業様に、
          人材のご紹介から在留資格申請手続きまで、ワンストップでサポートいたします。`,
        fieldsTitle: '対象分野',
        fields: [
          "介護", "ビルクリーニング", "素形材・産業機械", "電気・電子情報",
          "建設", "造船・舶用工業", "自動車整備", "航空", "宿泊", "農業", "漁業", "飲食料品製造", "外食業"
        ],
        servicesTitle: 'サポート内容',
        services: [
          "人材の技能測定試験・日本語能力試験受験支援",
          "企業様のニーズに最適な人材マッチング",
          "在留資格申請手続きの代行サービス",
          "入国後の生活支援（住居・銀行口座開設等）",
          "職場定着支援・通訳サービスの提供"
        ]
      },
      {
        id: 'gijinkoku',
        title: '技・人・国とは',
        titleColor: 'text-green-700',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        headerColor: 'text-green-600',
        image: "/recruitment/gijinkoku.jpg",
        alt: '技人国',
        description: `「技術・人文知識・国際業務」の略称で、日本で専門的・技術的な業務に従事する高度外国人材の在留資格です。
          エンジニア、研究職、通訳・翻訳など、技術や知識を活かした即戦力人材の採用をお考えの企業様に最適な人材をご紹介いたします。`,
        fieldsTitle: '対象職種',
        fields: [
          "システムエンジニア", "プログラマー", "研究開発職", "設計・開発",
          "通訳・翻訳", "国際業務", "マーケティング", "財務・経理", "人事・総務", "営業・企画"
        ],
        servicesTitle: 'サポート内容',
        services: [
          "人材のキャリアカウンセリング・適性診断サポート",
          "企業様と優秀な人材のマッチング・面接調整",
          "人材の履歴書・職務経歴書作成支援",
          "在留資格変更・更新手続きのサポート",
          "人材向けビジネス日本語・ビジネスマナー研修",
          "採用後の長期キャリア形成・定着支援"
        ]
      }
    ];
  
  // Service data array
export const mainServices = [
    {
      id: 'service1',
      title: '外国人材と日本企業のマッチング',
      emoji: '🤝',
      description: '多国籍・多様な背景を持つ優秀な人材と日本企業を最適にマッチング。特定技能・技人国など在留資格に応じた支援を通じて、人材の可能性を引き出します。',
      features: [
        '在留資格・書類サポート（翻訳含む）',
        '日本語・ビジネスマナー・企業研修',
        '採用から定着までのフォローアップ（通訳対応可）'
      ]
    },
    {
      id: 'service2',
      title: 'グローバル日本人材の海外進出支援',
      emoji: '🌍',
      description: '国内だけでなく、三菱グループやスズキ(株)といったグローバル企業に就職・転職し、国際的なフィールドで活躍したい日本人の方を応援します。',
      features: [
        '大学生向け就活サポート（適性診断・カウンセリング・面接練習）',
        'グローバル企業への就職・転職支援',
      ]
    }
  ];

  // Support services data array
export const supportServices = [
      {
        id: 1,
        emoji: "📝",
        bgColor: "bg-blue-100",
        titleColor: "text-blue-600",
        title: "書類翻訳 & 在留資格サポート",
        description: "外国人材採用に必要な各種書類の翻訳から申請手続きまで、専門の行政書士と連携し、トータルサポートします。",
        services: [
          "在留資格認定証明書交付申請代行",
          "在留資格変更・更新申請代行",
          "各種証明書類の翻訳サービス（日本語⇔外国語）",
          "入管局との連絡・調整業務代行",
          "申請状況の進捗管理・企業様への報告"
        ]
      },
      {
        id: 2,
        emoji: "🎓",
        bgColor: "bg-green-100",
        titleColor: "text-green-600",
        title: "ビジネス研修＆生活サポート",
        description: "特定技能の人材向けに、各国人材・職種に合った登録支援機関と連携して、法定の義務的支援のサービスを提供します。",
        services: [
          "事前ガイダンス（労働条件・生活ルール等の説明）",
          "出入国する際の送迎",
          "住居確保・生活に必要な契約支援",
          "公的手続き等への同行",
          "日本語学習の機会の提供",
          "定期的な面談・在留状況の確認"
        ]
      },
      {
        id: 3,
        emoji: "🗣️",
        bgColor: "bg-orange-100",
        titleColor: "text-orange-600",
        title: "通訳・継続フォロー",
        description: "言語の壁を解消し、企業様と外国人材の円滑なコミュニケーションをサポート。採用後の定着率向上に貢献いたします。",
        services: [
          "職場での通訳・翻訳サービス",
          "企業様・外国人材間のコミュニケーション支援",
          "生活面での相談・アドバイス提供",
          "トラブル発生時の迅速な対応・仲裁",
          "定期的な面談・状況確認レポート"
        ]
      }
    ];