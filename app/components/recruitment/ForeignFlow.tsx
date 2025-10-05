export default function ForeignFlow() {
    // Flow steps data array
    const flowSteps = [
        {
            id: 1,
            emoji: "📝",
            bgColor: "bg-blue-100",
            title: "初回相談・登録",
            description: "初回相談・登録"
        },
        {
            id: 2,
            emoji: "🔍",
            bgColor: "bg-green-100",
            title: "企業マッチング・求人紹介",
            description: "企業マッチング・求人紹介"
        },
        {
            id: 3,
            emoji: "🤝",
            bgColor: "bg-yellow-100",
            title: "面接調整・採用決定",
            description: "面接調整・採用決定"
        },
        {
            id: 4,
            emoji: "📋",
            bgColor: "bg-purple-100",
            title: "在留資格申請・各種手続き",
            description: "在留資格申請・各種手続き"
        },
        {
            id: 5,
            emoji: "🎉",
            bgColor: "bg-red-100",
            title: "入社・定着フォローアップ",
            description: "入社・定着フォローアップ"
        }
    ];

    return (
        <>
        {/* Success Process Flow */}
          <div className="bg-white text-black rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
              人材定着までの流れ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {flowSteps.map((step) => (
                <div key={step.id} className="text-center">
                  <div className={`${step.bgColor} rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3`}>
                  <h4 className="font-bold text-xs sm:text-sm">STEP {step.id}</h4>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm break-words leading-tight">
                    {step.description.includes('・') ? (
                      <>
                        {step.description.split('・')[0]}・
                        <br />
                        {step.description.split('・')[1]}
                      </>
                    ) : (
                      step.description
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
    )
}