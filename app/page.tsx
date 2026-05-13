import React, { useState } from 'react';

export default function ElectionPage() {
  const [votes, setVotes] = useState({ candidate1: 0, candidate2: 0, candidate3: 0 });
  const [voted, setVoted] = useState(false);

  const handleVote = (candidate: keyof typeof votes) => {
    setVotes(prev => ({ ...prev, [candidate]: prev[candidate] + 1 }));
    setVoted(true);
    alert("感謝您的參與！投票已成功送出。");
  };

  const total = votes.candidate1 + votes.candidate2 + votes.candidate3;
  const getPercent = (count: number) => total === 0 ? 0 : Math.round((count / total) * 100);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', padding: '40px 20px', fontFamily: '"Noto Sans TC", sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '30px' }}>
        
        <header style={{ textAlign: 'center', borderBottom: '3px solid #1a365d', marginBottom: '30px', paddingBottom: '20px' }}>
          <h1 style={{ color: '#1a365d', fontSize: '24px', margin: '0' }}>國立臺北大學公共行政暨政策學系</h1>
          <h2 style={{ color: '#2c5282', fontSize: '20px', marginTop: '10px' }}>系學會正副會長選舉</h2>
        </header>

        <div style={{ display: 'grid', gap: '20px' }}>
          {[
            { id: 'candidate1', label: '1 號候選人' },
            { id: 'candidate2', label: '2 號候選人' },
            { id: 'candidate3', label: '3 號候選人' }
          ].map((item) => (
            <div key={item.id} style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '10px', transition: '0.3s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d3748' }}>{item.label}</span>
                <span style={{ color: '#4a5568' }}>目前得票：{votes[item.id as keyof typeof votes]} 票 ({getPercent(votes[item.id as keyof typeof votes])}%)</span>
              </div>
              
              <div style={{ background: '#edf2f7', height: '12px', borderRadius: '6px', overflow: 'hidden', marginBottom: '15px' }}>
                <div style={{ background: '#2b6cb0', height: '100%', width: `${getPercent(votes[item.id as keyof typeof votes])}%`, transition: 'width 0.8s ease-out' }} />
              </div>

              {!voted && (
                <button 
                  onClick={() => handleVote(item.id as keyof typeof votes)}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#1a365d', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' }}
                >
                  投給此候選人
                </button>
              )}
            </div>
          ))}
        </div>

        {voted && (
          <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f0fff4', color: '#276749', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
            您已完成投票，感謝您的參與！
          </div>
        )}
      </div>
    </div>
  );
}
