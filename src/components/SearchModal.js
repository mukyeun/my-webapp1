import React, { useState } from 'react';
import './SearchModal.css';

const SearchModal = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setSearchResults([]);
      return;
    }

    // localStorage에서 데이터 검색
    try {
      const allData = localStorage.getItem('healthData');
      if (!allData) {
        setSearchResults([]);
        return;
      }

      const parsedData = JSON.parse(allData);
      if (!Array.isArray(parsedData)) {
        // 단일 데이터를 배열로 변환
        const dataArray = [parsedData];
        
        const results = dataArray.filter(data => {
          const 기본정보 = data.기본정보 || {};
          return (
            기본정보.이름?.toLowerCase().includes(term.toLowerCase()) ||
            기본정보.주민번호?.includes(term) ||
            기본정보.연락처?.includes(term)
          );
        });

        setSearchResults(results);
      } else {
        // 이미 배열인 경우
        const results = parsedData.filter(data => {
          const 기본정보 = data.기본정보 || {};
          return (
            기본정보.이름?.toLowerCase().includes(term.toLowerCase()) ||
            기본정보.주민번호?.includes(term) ||
            기본정보.연락처?.includes(term)
          );
        });

        setSearchResults(results);
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setSearchResults([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-modal-header">
          <h2>환자 검색</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="search-modal-content">
          <div className="search-input-container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="이름, 주민번호, 연락처로 검색"
              className="search-input"
              autoFocus
            />
          </div>

          <div className="search-results">
            {searchResults.length === 0 ? (
              <div className="no-results">
                {searchTerm.trim() === '' ? '검색어를 입력하세요.' : '검색 결과가 없습니다.'}
              </div>
            ) : (
              searchResults.map((result, index) => (
                <div 
                  key={index} 
                  className="search-result-item"
                  onClick={() => onSelect(result)}
                >
                  <div className="patient-info">
                    <span className="patient-name">{result.기본정보?.이름}</span>
                    <span className="patient-id">{result.기본정보?.주민번호}</span>
                    <span className="patient-phone">{result.기본정보?.연락처}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
