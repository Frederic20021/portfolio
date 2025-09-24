import { companyData } from "@/app/constants/heroText"

export default function Info() {
    return (
          <div className="bg-gray-50 py-8">
            <h2 className="text-3xl text-black font-bold text-center mb-8">
              会社情報
            </h2>
              <table className="bg-white mx-auto shadow-lg rounded-lg overflow-hidden">
                <tbody>
                  {companyData.map((item, index) => (
                    <tr
                      key={index}
                      className={`grid grid-cols-2 ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } border-b border-gray-200 last:border-b-0`}
                    >
                      <td className="px-6 justify-center py-4 bg-gray-50 font-semibold text-gray-700 border-r border-gray-200 flex items-center">
                        {item.label}
                      </td>
                      <td className="px-6 py-4 text-gray-800 whitespace-pre-line flex items-center">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>

    )
}