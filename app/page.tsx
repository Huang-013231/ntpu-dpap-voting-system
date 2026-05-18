'use client';
import React, { useState } from 'react';

export default function ElectionPage() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [voted, setVoted] = useState(false);

  const candidates = [
    { id: 'candidate1', name: '王大明 & 陳小美', slogan: '深耕公行，服務共好' },
    { id: 'candidate2', name: '李小華 & 張大華', slogan: '創新變革，系學會 2.0' },
    { id: 'candidate3', name: '廢票 / 棄權', slogan: '對現有候選人無意見' }
  ];

  // 真實登入邏輯（模擬串接環境）
  const handleLogin = () => {
    // 此處在正式環境會呼叫 signIn('google')
    const email = prompt("請登入您的 NTPU 信箱以驗證身分：");
    if (email?.endsWith('@mail.ntpu.edu.tw') || email?.endsWith('@gm.ntpu.edu.tw')) {
      setUser({ email });
    } else {
      alert("錯誤：僅限使用國立臺北大學學生信箱登入！");
    }
  };

  const handleVote = (candidateName: string) => {
    setVoted(true);
    alert(`感謝 ${user?.email}！您已成功投給：${candidateName}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#1e3a8a', fontSize: '24px' }}>北大公行系選舉系統</h1>
        
        {!user ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ marginBottom: '20px', color: '#666' }}>本系統僅限本系學生登入投票</p>
            <button onClick={handleLogin} style={{ backgroundColor: '#1e3a8a', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
              使用 Google 帳號登入
            </button>
          </div>
        ) : (
          <div>
            <div style={{ backgroundColor: '#e0f2fe', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', color: '#0369a1' }}>
              登入身分：<strong>{user.email}</strong>
            </div>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              {candidates.map((c) => (
                <div key={c.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
                  <h3 style={{ margin: '0 0 5px 0' }}>{c.name}</h3>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>{c.slogan}</p>
                  {!voted ? (
                    <button onClick={() => handleVote(c.name)} style={{ width: '100%', padding: '10px', backgroundColor: '#1e3a8a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                      投給此候選人
                    </button>
                  ) : (
                    <div style={{ textAlign: 'center', color: '#059669', fontWeight: 'bold' }}>✓ 投票已完成</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
