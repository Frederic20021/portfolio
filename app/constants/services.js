// Utility function to handle base path for GitHub Pagess
import { getAssetPath } from '../utils/paths';

export const services = [
    {
      title: "人材・職業紹介",
      description: "企業のニーズに合った人材をご提案します。製造・開発ソフトの各分野にわたり、幅広い専門に対応しております。",
      image: getAssetPath("/services/service1.jpg"),
      link: "/services/recruitment"
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