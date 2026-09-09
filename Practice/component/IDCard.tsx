import Image from "next/image";

export default function IdCard() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* ID Card Container */}
      <div className="w-[340px] h-[540px] bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden flex flex-col justify-between font-sans relative">
        
        {/* Top Header Section (Logo on Left, Text on Right) */}
        <div className="bg-[#4A5568] text-white pt-4 pb-4 px-4 relative flex items-center gap-10 h-30">
          {/* Logo on Left */}
          <div className="w-16 h-16 bg-white rounded-full flex-shrink-0 flex items-center justify-center shadow-inner">
            <span className="text-[10px] font-bold text-gray-700">Logo</span>
          </div>
          
          {/* Text on Right */}
          <div className="flex flex-col">
            <h1 className="text-sm font-bold tracking-wide leading-stretch">
              बुटवल उद्योग वाणिज्य संघ
            </h1>
            <p className="text-[10px] text-gray-200 mt-0.5 text-stretch">
              चेम्बर मार्ग, बुटवल उपमहानगरपालिका
            </p>
            <span className="text-[11px] font-semibold text-yellow-300 mt-0.5 tracking-wider items-center">
              सदस्यता परिचयपत्र:
            </span>
          </div>
        </div>

        {/* Profile Image Section (Bigger Image Size) */}
        <div className="flex flex-col items-center -mt-6 relative z-10">
          <div className="w-36 h-36 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
            {/* Replace with actual Image tag: <Image src="..." alt="Profile" width={96} height={96} /> */}
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-gray-600 font-medium">
              Photo
            </div>
          </div>
          <h2 className="text-sm font-bold text-gray-800 mt-1">सुनिरा श्रेष्ठ</h2>
          <p className="text-[10px] text-gray-500 font-medium">प्रतिनिधि</p>
        </div>

        {/* Details Section (Optimized Spacing & Clearer Visibility) */}
        <div className="px-5 py-5 text-sm text-gray-700 space-y-2">
          <div className="flex">
            <span className="w-30  font-semibold text-gray-600">फर्मको नाम</span>
            <span className="text-gray-950 font-medium">: आशिष क्लोथ्स फर्म</span>
          </div>
          <div className="flex">
            <span className="w-30 font-semibold text-gray-600">ठेगाना</span>
            <span className="text-gray-800">: रुपन्देही-11, कालिकानगर</span>
          </div>
          <div className="flex">
            <span className="w-30 font-semibold text-gray-600">सदस्यता नं.</span>
            <span className="text-gray-800">: वा-1942</span>
          </div>
          <div className="flex">
            <span className="w-30 font-semibold text-gray-600">सम्पर्क नं.</span>
            <span className="text-gray-800">: 9841053135</span>
          </div>
          <div className="flex">
            <span className="w-30 font-semibold text-gray-600">मान्य मिति</span>
            <span className="text-gray-800">: 2084-03-31</span>
          </div>
        </div>

        {/* Signature and QR Code Section */}
        <div className="px-5 pb-3 flex justify-between items-end">
          <div className="text-center">
            <div className="h-8 flex items-end justify-center">
              {/* Simulated Signature */}
              <span className="font-serif italic text-sm text-gray-700 border-b border-gray-400 px-4">
                Sunira
              </span>
            </div>
            <p className="text-[11px] font-bold text-gray-700 mt-1">महासचिव</p>
          </div>

          {/* QR Code Placeholder */}
          <div className="w-12 h-12 bg-gray-100 border border-gray-300 p-1 flex items-center justify-center">
            <div className="w-full h-full bg-black/80"></div>
          </div>
        </div>

        {/* Footer Bottom Bar (Fixed Stretch Layout) */}
        <div className="bg-[#4A5568] text-white py-2 px-4 flex justify-between items-center text-[10px] w-full">
          <span>फोन नं.: 071-531366</span>
          <span>इमेल: info@bcci.org.np</span>
        </div>

      </div>
    </div>
  );
}