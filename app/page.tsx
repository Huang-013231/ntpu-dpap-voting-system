'use client';
import React, { useState } from 'react';

export default function ElectionPage() {
  const [studentId, setStudentId] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [votes, setVotes] = useState({ candidate1: 0, candidate2: 0, candidate3: 0 });
  const [voted, setVoted] = useState(false);

  const candidates = [
    { id: 'candidate1', name: '王大明 & 陳小美', slogan: '深耕公行，服務共好' },
    { id: 'candidate2', name: '李小華 & 張大華', slogan: '創新變革，系學會 2.0' },
    { id: 'candidate3', name: '廢票 / 棄權', slogan: '對現有候選人無意見' }
  ];

  // 學號驗證邏輯
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // 簡單正則表達式：檢查是否為 9 位數字（可根據 NTPU 習慣修改，例如加強檢查 411...）
    const idPattern = /^[0-9]{9}$/; 
    if (idPattern.test(studentId)) {
      setIsVerified(true);
    } else {
      alert("請輸入正確的 9 位數學生證編號！");
    }
  };

  const handleVote = (candidateId: string) => {
    setVotes(prev => ({ ...prev, [candidateId]: prev[candidateId as keyof typeof votes] + 1 }));
    setVoted(true);
    alert(`學號 ${studentId}，感謝您的參與！投票成功。`);
  };

  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  const getPercent = (count: number) => total === 0 ? 0 : Math.round((count / total) * 100);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', padding: '40px 20px', fontFamily: '"Noto Sans TC", sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '40px' }}>
        
        <header style={{ textAlign: 'center', borderBottom: '3px solid #1a365d', marginBottom: '30px', paddingBottom: '20px' }}>
          <h1 style={{ color: '#1a365d', fontSize: '28px', margin: '0' }}>國立臺北大學公共行政暨政策學系</h1>
          <h2 style={{ color: '#2c5282', fontSize: '20px', marginTop: '10px' }}>系學會正副會長選舉驗證系統</h2>
        </header>

        {!isVerified ? (
          /* 驗證畫面 */
          <form onSubmit={handleVerify} style={{ textAlign: 'center', padding: '40px 0' }}>
            <h3 style={{ marginBottom: '20px', color: '#4a5568' }}>請先驗證您的學生身分</h3>
            <input 
              type="text" 
              placeholder="請輸入 9 位數學號" 
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              style={{ padding: '12px', width: '250px', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '16px', marginBottom: '20px' }}
            />
            <br />
            <button type="submit" style={{ padding: '12px 40px', backgroundColor: '#2b6cb0', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              開始投票
            </button>
          </form>
        ) : (
          /* 投票畫面 */
          <div style={{ display: 'grid', gap: '20px' }}>
            <p style={{ textAlign: 'right', color: '#718096', fontSize: '14px' }}>登入身分：{studentId}</p>
            {candidates.map((item) => (
              <div key={item.id} style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d3748' }}>{item.name}</h3>
                    <p style={{ color: '#718096', fontSize: '14px' }}>{item.slogan}</p>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{getPercent(votes[item.id as keyof typeof votes])}%</span>
                </div>
                {!voted ? (
                  <button onClick={() => handleVote(item.id)} style={{ width: '100%', padding: '10px', backgroundColor: '#1a365d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    投給此候選人
                  </button>
                ) : (
                  <div style={{ background: '#edf2f7', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{ background: '#2b6cb0', height: '100%', width: `${getPercent(votes[item.id as keyof typeof votes])}%` }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {voted && (
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0fff4', color: '#276749', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
            投票成功！本瀏覽器已完成記錄。
          </div>
        )}
      </div>
    </div>
  );
}
