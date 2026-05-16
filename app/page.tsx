'use client';
import React, { useState } from 'react';

export default function ElectionPage() {
  const [votes, setVotes] = useState({ candidate1: 0, candidate2: 0, candidate3: 0 });
  const [voted, setVoted] = useState(false);

  // 在這裡修改候選人的名字！
  const candidates = [
    { id: 'candidate1', name: '王大明 & 陳小美', slogan: '深耕公行，服務共好' },
    { id: 'candidate2', name: '李小華 & 張大華', slogan: '創新變革，系學會 2.0' },
    { id: 'candidate3', name: '廢票 / 棄權', slogan: '對現有候選人無意見' }
  ];

  const handleVote = (candidateId: string) => {
    setVotes(prev => ({ ...prev, [candidateId]: prev[candidateId as keyof typeof votes] + 1 }));
    setVoted(true);
    alert("感謝您的參與！投票已成功送出。");
  };

  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  const getPercent = (count: number) => total === 0 ? 0 : Math.round((count / total) * 100);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', padding: '40px 20px', fontFamily: '"Noto Sans TC", sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '40px' }}>
        
        <header style={{ textAlign: 'center', borderBottom: '3px solid #1a365d', marginBottom: '30px', paddingBottom: '20px' }}>
          <h1 style={{ color: '#1a365d', fontSize: '28px', margin: '0' }}>國立臺北大學公共行政暨政策學系</h1>
          <h2 style={{ color: '#2c5282', fontSize: '20px', marginTop: '10px' }}>115 學年度系學會正副會長選舉</h2>
        </header>

        <div style={{ display: 'grid', gap: '20px' }}>
          {candidates.map((item) => (
            <div key={item.id} style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', position: 'relative', transition: 'all 0.3s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748', margin: '0' }}>{item.name}</h3>
                  <p style={{ color: '#718096', fontSize: '14px', marginTop: '5px' }}>{item.slogan}</p>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#4a5568' }}>
                  目前得票：{votes[item.id as keyof typeof votes]} 票 ({getPercent(votes[item.id as keyof typeof votes])}%)
                </span>
              </div>

              {/* 進度條 */}
              <div style={{ background: '#edf2f7', borderRadius: '10px', height: '10px', width: '100%', marginBottom: '20px', overflow: 'hidden' }}>
                <div style={{ background: '#2b6cb0', height: '100%', width: `${getPercent(votes[item.id as keyof typeof votes])}%`, transition: 'width 0.8s ease-out' }} />
              </div>

              {!voted && (
                <button 
                  onClick={() => handleVote(item.id)}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#1a365d', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  投給此候選人
                </button>
              )}
            </div>
          ))}
        </div>

        {voted && (
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0fff4', color: '#276749', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', border: '1px solid #c6f6d5' }}>
            您已完成投票，感謝您的參與！結果僅供參考。
          </div>
        )}
      </div>
    </div>
  );
}
