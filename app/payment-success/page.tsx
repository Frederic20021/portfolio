'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import { serviceID, templateID, publicKey } from '@/app/constants/emailjs';

export default function PaymentSuccess() {
  const router = useRouter();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');

  useEffect(() => {
    // Send confirmation email after successful payment
    const sendConfirmationEmail = async () => {
      try {
        // Get pending booking info from sessionStorage
        const pendingBookingStr = sessionStorage.getItem('pendingBooking');
        
        if (!pendingBookingStr) {
          console.warn('No pending booking found');
          setStatus('success'); // Still show success even if email fails
          return;
        }

        const bookingInfo = JSON.parse(pendingBookingStr);
        
        // Update subject to indicate payment is complete
        const templateParams = {
          ...bookingInfo,
          subject: `【予約確定・決済完了】${bookingInfo.course_name} - ${bookingInfo.from_name}様`
        };

        await emailjs.send(serviceID, templateID, templateParams, publicKey);
        
        // Clear the pending booking
        sessionStorage.removeItem('pendingBooking');
        
        setStatus('success');
      } catch (error) {
        console.error('Failed to send confirmation email:', error);
        setStatus('error');
      }
    };

    sendConfirmationEmail();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {status === 'processing' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">処理中...</h2>
            <p className="text-gray-600">確認メールを送信しています</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎉 お支払いが完了しました！
            </h2>
            <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-700 mb-2">
                ✅ ご予約が確定いたしました
              </p>
              <p className="text-sm text-gray-700 mb-2">
                📧 確認メールをお送りしました
              </p>
              <p className="text-sm text-gray-700">
                📞 24時間以内に詳細をご連絡いたします
              </p>
            </div>
            <button
              onClick={() => router.push('/english')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              コース一覧に戻る
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              お支払いは完了しました
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              確認メールの送信に失敗しましたが、ご予約は正常に受け付けております。
              24時間以内に直接ご連絡させていただきます。
            </p>
            <button
              onClick={() => router.push('/english')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              コース一覧に戻る
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
