// Utility function to handle base path for GitHub Pagess
import { getAssetPath } from '../utils/paths';

export const services = [
    {
      title: "人材・職業紹介",
      description: "企業のニーズに合った人材をご提案します。製造・開発ソフトの各分野にわたり、幅広い専門に対応しております。",
      image: getAssetPath("/services/service1.jpg"),
      link: "/recruitment"
    },
    {
      title: "日本語教育",
      description: "外国人材向けの実践的な日本語指導を実施、ビジネス会話から生活に密着した、現場で役立つ日本語力を身に付けます。",
      image: getAssetPath("/services/service2.jpg"),
      link: "/services/japanese"
    },
    {
      title: "英語教育",
      description: "グローバル人材を育成する法人・個人、ITを活用した効果的な英語学習を提供する、現実的な英語力を習得します。",
      image: getAssetPath("/services/service3.jpg"),
      link: "/english"
    },
    {
      title: "ICT事業",
      description: "IT人材の紹介と企業向けICT導入支援を展開、クラウドと基盤構築技術に対応した人材と企業機能のソリューションを提供します。",
      image: getAssetPath("/services/service4.jpg"),
      link: "/services/ict"
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
        image: getAssetPath("/recruitment/tokuteiginou.jpg"),
        alt: '特定技能',
        description: `日本国内で特定分野の業務に従事する外国人労働者です。
          介護、外食、建設、農業などの分野で即戦力として活躍できる方々に向けて、
          就職先のご紹介から在留資格の手続きまでトータルサポートいたします。`,
        fieldsTitle: '対象分野',
        fields: [
          "介護", "ビルクリーニング", "素形材・産業機械", "電気・電子情報",
          "建設", "造船・舶用工業", "自動車整備", "航空", "宿泊", "農業", "漁業", "飲食料品製造", "外食業"
        ],
        servicesTitle: 'サポート内容',
        services: [
          "技能測定試験・日本語能力試験の受験サポート",
          "雇用企業とのマッチング",
          "在留資格申請手続き代行",
          "入国後の生活サポート（住居・銀行口座開設等）",
          "職場定着支援・通訳サービス"
        ]
      },
      {
        id: 'gijinkoku',
        title: '技・人・国とは',
        titleColor: 'text-green-700',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        headerColor: 'text-green-600',
        image: getAssetPath("/recruitment/gijinkoku.jpg"),
        alt: '技人国',
        description: `日本で専門的・技術的な業務に従事する高度外国人材の在留資格です。
          エンジニア、研究職、通訳・翻訳など、技術や知識を活かして長期的な就労・定住を希望される方々のキャリア形成をサポートします。`,
        fieldsTitle: '対象職種',
        fields: [
          "システムエンジニア", "プログラマー", "研究開発職", "設計・開発",
          "通訳・翻訳", "国際業務", "マーケティング", "財務・経理", "人事・総務", "営業・企画"
        ],
        servicesTitle: 'サポート内容',
        services: [
          "キャリアカウンセリング・適性診断",
          "企業とのマッチング・面接調整",
          "履歴書・職務経歴書の作成支援",
          "在留資格変更・更新手続きサポート",
          "ビジネス日本語・ビジネスマナー研修",
          "長期キャリア形成相談・転職サポート"
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
      description: '国内にとどまらず、国際的なフィールドで挑戦したい日本人材をサポート。',
      features: [
        '大学生向け就活サポート（適性診断・相談）',
        '海外企業とのマッチング機会の提供'
      ]
    }
  ];