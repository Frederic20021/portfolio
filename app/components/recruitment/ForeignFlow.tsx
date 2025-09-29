export default function ForeignFlow() {
    return (
        <>
        {/* Success Process Flow */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
              成功への流れ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📝</span>
                </div>
                <h4 className="font-bold text-sm mb-2">STEP 1</h4>
                <p className="text-xs text-gray-600">
                  初回相談・
                  <br />
                  登録
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔍</span>
                </div>
                <h4 className="font-bold text-sm mb-2">STEP 2</h4>
                <p className="text-xs text-gray-600">
                  企業マッチング・
                  <br />
                  求人紹介
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="font-bold text-sm mb-2">STEP 3</h4>
                <p className="text-xs text-gray-600">
                  面接調整・
                  <br />
                  採用決定
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📋</span>
                </div>
                <h4 className="font-bold text-sm mb-2">STEP 4</h4>
                <p className="text-xs text-gray-600">
                  在留資格申請・
                  <br />
                  各種手続き
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎉</span>
                </div>
                <h4 className="font-bold text-sm mb-2">STEP 5</h4>
                <p className="text-xs text-gray-600">
                  入社・定着
                  <br />
                  フォローアップ
                </p>
              </div>
            </div>
          </div>
        </>
    )
}