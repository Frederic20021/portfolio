export default function Maps() {
    return (
        <div className="py-8 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl text-black font-bold text-center mb-12">
                    アクセス
                </h2>
                
                <div className="max-w-6xl mx-auto">
                    <div className="grid  md:grid-cols-2 gap-8 items-start">
                        {/* Map Section */}
                            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                                {/* Embedded Google Map */}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3266.8!2d137.7364!3d34.7074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQyJzI2LjYiTiAxMzfCsDQ0JzExLjAiRQ!5e0!3m2!1sja!2sjp!4v1695465000000!5m2!1sja!2sjp"
                                    width="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full h-[400px]"
                                ></iframe>
                            </div>

                        {/* Access Information */}
                        <div className="space-y-8">
                            {/* Location */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm mr-3">
                                        所在地
                                    </span>
                                </h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="font-semibold">〒430-0949</p>
                                    <p>静岡県浜松市中央区尾張町124-6</p>
                                    <p>浜松士業ビル 4階E号室</p>
                                </div>
                            </div>

                            {/* Transportation Access */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm mr-3">
                                        交通アクセス
                                    </span>
                                </h3>
                                <div className="text-gray-700 space-y-2">
                                       JR浜松駅から徒歩10分
                                       <br />
                                       遠鉄電車「新浜松駅」から徒歩8分
                                </div>
                            </div>

                            {/* Parking */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm mr-3">
                                    駐車場
                                    </span>
                                </h3>
                                <div className="text-gray-700 leading-relaxed">
                                    周辺の有料駐車場をご利用ください
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}