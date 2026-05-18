'use client';
import React, { useState, useEffect } from 'react';

export default function ElectionPage() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [voted, setVoted] = useState(false);

  // 候選人名單
  const candidates = [
    { id: 'candidate1', name: '王大明 & 陳小美', slogan: '深耕公行，服務共好' },
    { id: 'candidate2', name: '李小華 & 張大華', slogan: '創新變革，系學會 2.0' },
    { id: 'candidate3', name: '廢票 / 棄權', slogan: '對現有候選人無意見' }
  ];

  // 【核心功能】驅動真實 Google 登入視窗
  const handleGoogleLogin = () => {
    // 這裡會跳轉到 Google 的認證頁面
    // 注意：這需要搭配我們在 Vercel 設定的環境變數
    window.location.href = '/api/auth/signin/google';
  };

  const handleVote = (candidateName: string) => {
    setVoted(true);
    alert(`投票成功！您已投給：${candidateName}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#1a365d', fontSize: '22px', marginBottom: '30px' }}>國立臺北大學公行系選舉</h1>
        
        {!user ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#666', marginBottom: '20px' }}>請登入學校學生信箱 (@mail.ntpu.edu.tw) 以進行投票</p>
            <button 
              onClick={handleGoogleLogin} 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: 'white', color: '#444', border: '1px solid #ddd', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
            >
              <img src="https://www.google.com/favicon.ico" style={{ width: '18px', marginRight: '10px' }} />
              使用 Google 帳號登入
            </button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '14px', color: '#2b6cb0', marginBottom: '20px' }}>✓ 已認證：{user.email}</p>
            {/* 投票選項 */}
            {candidates.map(c => (
              <div key={c.id} style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '10px' }}>
                <h3 style={{ margin: '0' }}>{c.name}</h3>
                {!voted ? (
                  <button onClick={() => handleVote(c.name)} style={{ marginTop: '10px', width: '100%', padding: '8px', backgroundColor: '#1a365d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    投票
                  </button>
                ) : <span style={{ color: 'green' }}>已投票</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
