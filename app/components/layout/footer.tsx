import Link from "next/link"
import Image from "next/image"
import { services, footerLinks } from "@/app/constants/services";

export default function Temp() {
  return (
    <>
      <div className="w-screen bg-[#40637D] grid md:grid-cols-5 max-md:gap-8 justify-center items-center p-8">
        <div className="text-white text-center col-span-2">
          <div className="flex flex-col justify-center items-center gap-4 space-x-3">
            <Link href="/">
              <Image
                src={'/logo.jpg'}
                alt="Empower & Link Logo"
                width={210}
                height={70}
                className="object-contain"
              />
            </Link>
            <div>
              <h3 className="font-bold max-md:text-xs">
                エンパワー＆リンク株式会社
              </h3>
            </div>
            <div className="text-xs">
              〒430-0949
              <br />
              静岡県浜松市中央区尾張町124-6
            </div>
          </div>
        </div>
        <div className="col-span-3 flex gap-16 justify-center text-white text-center">
          <div className="text-white max-md:hidden text-center px-6">
            <div className="hidden md:block text-left">
              <h4 className="text-lg font-bold mb-4">サービス</h4>
              <div className="space-y-2 text-sm text-blue-200">
                {services.map((service, index) => (
                  <div key={index}>
                    <Link
                      href={service.link}
                      className="hover:text-white transition-colors"
                    >
                      {service.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid items-center text-left text-sm text-blue-200 px-6">
            {footerLinks.map((link, index) => (
              <div key={index}>
                <Link
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto bg-black text-center text-xs md:text-sm py-2">
        <p>© 2025 エンパワー＆リンク株式会社 All Rights Reserved</p>
      </div>
    </>
  );
}