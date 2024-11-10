import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { 증상카테고리 } from './data/SymptomCategories';
import symptomCategories from './data/SymptomCategories';

// App.js 최상단에 BasicInfoSection 컴포넌트를 별도로 정의
const BasicInfoSection = ({ 기본정보, 기본정보설정 }) => {
  return (
    <section className="basic-info-section">
      <h2 className="section-title">기본 정보</h2>
      <div className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label className="required-field">이름</label>
            <input
              type="text"
              value={기본정보.이름}
              onChange={(e) => 기본정보설정({...기본정보, 이름: e.target.value})}
              placeholder="이름을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label className="required-field">주민등록번호</label>
            <input
              type="text"
              value={기본정보.주민등록번호}
              onChange={(e) => 기본정보설정({...기본정보, 주민등록번호: e.target.value})}
              placeholder="000000-0000000"
            />
          </div>

          <div className="form-group">
            <label>연락처</label>
            <input
              type="tel"
              value={기본정보.연락처}
              onChange={(e) => 기본정보설정({...기본정보, 연락처: e.target.value})}
              placeholder="010-0000-0000"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>키 (cm)</label>
            <input
              type="number"
              value={기본정보.키}
              onChange={(e) => 기본정보설정({...기본정보, 키: e.target.value})}
              placeholder="170"
            />
          </div>

          <div className="form-group">
            <label>체중 (kg)</label>
            <input
              type="number"
              value={기본정보.체중}
              onChange={(e) => 기본정보설정({...기본정보, 체중: e.target.value})}
              placeholder="65"
            />
          </div>

          <div className="form-group">
            <label>BMI</label>
            <div className="bmi-display">
              {기본정보.키 && 기본정보.체중 && (
                `${(기본정보.체중 / Math.pow(기본정보.키 / 100, 2)).toFixed(1)} ${getBmiStatus(기본정보.키, 기본정보.체중)}`
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// BMI 상태를 반환하는 헬퍼 함수
const getBmiStatus = (height, weight) => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi < 16.5) return '(매우저체중)';
  if (bmi < 18.5) return '(저체중)';
  if (bmi < 23) return '(정상)';
  if (bmi < 25) return '(과체중)';
  if (bmi < 30) return '(비만)';
  return '(고도비만)';
};

function App() {
  const [기본정보, 기본정보설정] = useState({
    이름: '',
    주민등록번호: '',
    연락처: '',
    키: '',
    체중: ''
  });

  const [증상선택, 증상선택설정] = useState({
    대분류: '',
    중분류: '',
    소분류: ''
  });

  const [운동강도, 운동강도설정] = useState('');
  const [스트레스강도, 스트레스강도설정] = useState('');
  const [기호식, 기호식설정] = useState('');

  const [복용약물, 복용약물설정] = useState({
    소염통제: false,
    항제: false,
    스테로이드제: false,
    혈압강하제: false,
    당강하제: false,
    지혈증약: false,
    신경안정제: false,
    수면유도제: false,
    항암제: false,
    여성호몬제: false,
    갑상선호르몬제: false
  });

  const [복용기간, 복용기간설정] = useState('');

  const [육체노동, 육체노동설정] = useState('');
  const [운동량, 운동량설정] = useState('');
  const [스트레스, 스트레스설정] = useState('');

  const [맥파분석, 맥파분석설정] = useState({
    수축기혈압: '',
    이완기혈압: '',
    맥박: '',
    맥파전달속도: '',
    혈관나이: '',
    동맥경화도: '',
  });

  const [메모, 메모설정] = useState('');

  // BMI 계산 함수
  const calculateBMI = (height, weight) => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      기본정보설정({...기본정보, BMI: bmi});
    }
  };

  // 성격 상태 추가
  const [성격, 성격설정] = useState('');

  const [복용물, 복용물설정] = useState('');

  const [파분석, 파분석설정] = useState('');

  // 데이터 저장 함수
  const saveHealthData = () => {
    const formData = {
      id: Date.now(), // 고유 ID 생성
      date: new Date().toISOString(), // 저장 날짜
      기본정보,
      성격,
      운동량,
      스트레스,
      복용약물,
      복용기간,
      기호식,
      맥파분석,
      selectedSymptoms, // 선택된 증상들
      메모
    };

    // 기존 데이터 불러오기
    const existingData = JSON.parse(localStorage.getItem('healthRecords') || '[]');
    
    // 새 데이터 추가
    const updatedData = [...existingData, formData];
    
    // localStorage에 저장
    localStorage.setItem('healthRecords', JSON.stringify(updatedData));

    alert('건강 기록이 저장되었습니다.');
    return formData.id; // 저장된 데이터의 ID 반환
  };

  // 특정 ID의 데이터 불러오기
  const loadHealthData = (id) => {
    const records = JSON.parse(localStorage.getItem('healthRecords') || '[]');
    const record = records.find(r => r.id === id);
    
    if (record) {
      // 각 상태 업데이트
      기본정보설정(record.기본정보);
      성격설정(record.성격);
      운동량설정(record.운동량);
      스트레스설정(record.스트레스);
      복용약물설정(record.복용약물);
      복용기간설정(record.복용기간);
      기호식설정(record.기호식);
      맥파분석설정(record.맥파분석);
      메모설정(record.메모);
      // 증상 데이터 설정
      setSelectedSymptoms(record.selectedSymptoms || []);
    }
  };

  // 모든 데이터 목록 가져오기
  const getHealthDataList = () => {
    return JSON.parse(localStorage.getItem('healthRecords') || '[]');
  };

  // 특정 데이터 삭제
  const deleteHealthData = (id) => {
    const records = JSON.parse(localStorage.getItem('healthRecords') || '[]');
    const updatedRecords = records.filter(r => r.id !== id);
    localStorage.setItem('healthRecords', JSON.stringify(updatedRecords));
  };

  // 저장 버튼 핸들러 수정
  const handleSubmit = () => {
    const savedId = saveHealthData();
    if (savedId) {
      // 저장 성공 후 필요한 작업
      console.log('저장된 데이터 ID:', savedId);
    }
  };

  const PulseWaveSection = () => {
    return (
      <section>
        <h3 className="section-title">맥파 분석</h3>
        <div className="form-row">
          <div className="form-group">
            <label>수축기 혈압</label>
            <input 
              type="number"
              value={맥파분석.수축기혈압}
              onChange={(e) => 맥파분석설정({...맥파분석, 수축기혈압: e.target.value})}
              placeholder="mmHg"
            />
          </div>
          <div className="form-group">
            <label>이완기 혈압</label>
            <input 
              type="number"
              value={맥파분석.이완기혈압}
              onChange={(e) => 맥파분석설정({...맥파분석, 이완기혈압: e.target.value})}
              placeholder="mmHg"
            />
          </div>
          <div className="form-group">
            <label>맥박</label>
            <input 
              type="number"
              value={맥파분석.맥박}
              onChange={(e) => 맥파분석설정({...맥파분석, 맥박: e.target.value})}
              placeholder="회/분"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>맥파전달속도</label>
            <select>
              <option value="">선택하세요</option>
            </select>
          </div>
          <div className="form-group">
            <label>혈관나이</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>동맥경화도</label>
            <select>
              <option value="">선택하세요</option>
            </select>
          </div>
        </div>
      </section>
    );
  };

  const SymptomSection = () => {
    const [selectedCategories, setSelectedCategories] = useState({
      대분류: '',
      중분류: '',
      소분류: '',
      세부분류: ''
    });
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    // 대분류 변경 핸들러 추가
    const handle대분류Change = (value) => {
      setSelectedCategories({
        대분류: value,
        중분류: '',
        소분류: '',
        세부분류: ''
      });
    };

    // 중분류 경 핸들러 추가
    const handle중분류Change = (value) => {
      setSelectedCategories({
        ...selectedCategories,
        중분류: value,
        소분류: '',
        세부분류: ''
      });
    };

    // 소분류 변경 핸들러 추가
    const handle소분류Change = (value) => {
      setSelectedCategories({
        ...selectedCategories,
        소분류: value,
        세부분류: ''
      });
    };

    // 중분류 옵션 가져오기 함수 수정
    const get중분류Options = () => {
      if (!selectedCategories.대분류) return [];
      const 중분류Data = 증상카테고리[selectedCategories.대분류];
      return Object.keys(중분류Data || {});
    };

    // 소분류 옵션 져오기 함수 수정
    const get소분류Options = () => {
      if (!selectedCategories.대분류 || !selectedCategories.중분류) return [];
      const 중분류Data = 증상카테고리[selectedCategories.대분류][selectedCategories.중분류];
      
      // 배열인 경우 (일반적인 케이스)
      if (Array.isArray(중분류Data)) {
        return 중분류Data;
      }
      
      // 객체인 경우 (심혈관 > 심장 같은 케이스)
      if (typeof 중분류Data === 'object') {
        return Object.keys(중분류Data);
      }
      
      return [];
    };

    // 세부분류 옵션 가져오기 함수 추가
    const get세부분류Options = () => {
      if (!selectedCategories.대분류 || !selectedCategories.중분류 || !selectedCategories.소분류) return [];
      const 중분류Data = 증상카테고리[selectedCategories.대분류][selectedCategories.중분류];
      
      if (typeof 중분류Data === 'object' && !Array.isArray(중분류Data)) {
        const 소분류Data = 중분류Data[selectedCategories.소분류];
        return Array.isArray(소분류Data) ? 소분류Data : [];
      }
      
      return [];
    };

    // 증상 추가 핸들러
    const handleAddSymptom = () => {
      const { 대분류, 중분류, 소분류 } = selectedCategories;
      if (대분류 && 중분류 && 소분류) {
        const newSymptom = `${대분류} ${중분류} ${소분류}`;
        if (!selectedSymptoms.includes(newSymptom)) {
          setSelectedSymptoms([...selectedSymptoms, newSymptom]);
          // 선택 초기화
          setSelectedCategories({
            대분류: '',
            중분류: '',
            소분류: '',
            세부분류: ''
          });
        }
      }
    };

    // 증상 제거 핸들러
    const handleRemoveSymptom = (symptomToRemove) => {
      setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom !== symptomToRemove));
    };

    return (
      <section className="symptom-section">
        <h2 className="section-title">증상 선택</h2>
        <div className="symptom-container">
          <div className="symptom-selectors">
            <select 
              className="modern-select"
              value={selectedCategories.대분류}
              onChange={(e) => handle대분류Change(e.target.value)}
            >
              <option value="">부위 선택</option>
              {Object.keys(증상카테고리).map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select 
              className="modern-select"
              value={selectedCategories.중분류}
              onChange={(e) => handle중분류Change(e.target.value)}
              disabled={!selectedCategories.대분류}
            >
              <option value="">증상</option>
              {get중분류Options().map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select 
              className="modern-select"
              value={selectedCategories.소분류}
              onChange={(e) => handle소분류Change(e.target.value)}
              disabled={!selectedCategories.중분류}
            >
              <option value="">강도</option>
              {get소분류Options().map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* 필요한 경우에만 세부분류 select 표시 */}
            {get세부분류Options().length > 0 && (
              <select 
                className="modern-select"
                value={selectedCategories.세부분류}
                onChange={(e) => setSelectedCategories({
                  ...selectedCategories,
                  세부분류: e.target.value
                })}
                disabled={!selectedCategories.소분류}
              >
                <option value="">세부분류 선택</option>
                {get세부분류Options().map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* 선택된 증상들을 태그로 표시 */}
          <div className="selected-symptoms">
            {selectedSymptoms.map((symptom, index) => (
              <span key={index} className="symptom-tag">
                {symptom}
                <button 
                  onClick={() => handleRemoveSymptom(symptom)}
                  className="remove-tag"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* 증상 추가 버튼 */}
          <button 
            className="add-symptom-btn"
            onClick={handleAddSymptom}
            disabled={!selectedCategories.대분류 || !selectedCategories.중분류 || !selectedCategories.소분류}
          >
            증상 추가
          </button>
        </div>
      </section>
    );
  };

  const MemoSection = () => {
    return (
      <section>
        <h3 className="section-title">메모</h3>
        <div className="form-group">
          <textarea
            value={메모}
            onChange={(e) => 메모설정(e.target.value)}
            placeholder="메모를 입력하세요"
            className="memo-textarea"
          />
        </div>
      </section>
    );
  };

  // 데이터 목록 표시 컴포넌트
  const DataListSection = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
      setRecords(getHealthDataList());
    }, []);

    return (
      <section className="data-list-section">
        <h3 className="section-title">저장된 기록</h3>
        <div className="records-container">
          {records.map(record => (
            <div key={record.id} className="record-item">
              <div className="record-info">
                <span>{new Date(record.date).toLocaleDateString()}</span>
                <span>{record.기본정보.이름}</span>
              </div>
              <div className="record-actions">
                <button onClick={() => loadHealthData(record.id)}>
                  불러오기
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm('이 기록을 삭제하시겠습니까?')) {
                      deleteHealthData(record.id);
                      setRecords(getHealthDataList());
                    }
                  }}
                  className="delete-btn"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="App">
      <BasicInfoSection 기본정보={기본정보} 기본정보설정={기본정보설정} />
      <PulseWaveSection />
      <SymptomSection />
      <section className="lifestyle-section">
        <h2 className="section-title">생활 스타일</h2>
        <div className="lifestyle-grid">
          {/* 첫 번째 행 */}
          <div className="form-group">
            <label>성격</label>
            <select 
              value={성격} 
              onChange={(e) => 성격설정(e.target.value)}
              className="modern-select"
            >
              <option value="">선택하세요</option>
              <option value="매우 급함">매우 급함</option>
              <option value="급함">급함</option>
              <option value="보통">보통</option>
              <option value="느긋함">느긋함</option>
              <option value="매우 느긋함">매우 느긋함</option>
            </select>
          </div>

          <div className="form-group">
            <label>운동량</label>
            <select 
              value={운동량} 
              onChange={(e) => 운동량설정(e.target.value)}
              className="modern-select"
            >
              <option value="">선택하세요</option>
              <option value="매우 많음">매우 많음</option>
              <option value="많음">많음</option>
              <option value="보통">보통</option>
              <option value="적음">적음</option>
              <option value="매우 적음">매우 적음</option>
            </select>
          </div>

          <div className="form-group">
            <label>스트레스</label>
            <select 
              value={스트레스} 
              onChange={(e) => 스트레스설정(e.target.value)}
              className="modern-select"
            >
              <option value="">선택하세요</option>
              <option value="매우 많음">매우 많음</option>
              <option value="많음">많음</option>
              <option value="보통">보통</option>
              <option value="적음">적음</option>
              <option value="매우 적음">매우 적음</option>
            </select>
          </div>

          {/* 두 번째 행 */}
          <div className="form-group">
            <label>복용 약물</label>
            <select 
              value={복용물} 
              onChange={(e) => 복용물설정(e.target.value)}
              className="modern-select"
            >
              <option value="">선택하세요</option>
              <option value="소염진통제">소염진통제</option>
              <option value="항생제">항생제</option>
              <option value="스테로이드제">스테로이드제</option>
              <option value="혈압강하제">혈압강하제</option>
              <option value="혈당강하제">혈당강하제</option>
              <option value="고지혈증약">고지혈증약</option>
              <option value="신경안정제">신경안정제</option>
              <option value="수면유도제">수면유도제</option>
              <option value="항암제">항암제</option>
              <option value="여성호르몬제">여성호르몬제</option>
              <option value="갑상선호르몬제">갑상선호르몬제</option>
            </select>
          </div>

          <div className="form-group">
            <label>기호식</label>
            <select 
              value={기호식} 
              onChange={(e) => 기호식설정(e.target.value)}
              className="modern-select"
            >
              <option value="">선택하세요</option>
              <option value="술">술</option>
              <option value="담배">담배</option>
              <option value="커피">커피</option>
              <option value="마약">마약</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </div>
      </section>
      <MemoSection />
      <DataListSection />
      <button className="submit-button" onClick={handleSubmit}>
        저장하기
      </button>
    </div>
  );
}

export default App;
