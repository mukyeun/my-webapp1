import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { 증상카테고리 } from './data/SymptomCategories';

// App.js 최상단에 BasicInfoSection 컴포넌트를 별도로 정의
const BasicInfoSection = ({ 기본정보, 기본정보설정, handleInputChange }) => {
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
              name="주민번호"
              value={기본정보.주민등록번호}
              onChange={handleInputChange}
              maxLength={14}
              placeholder="주민등록번호"
            />
          </div>

          <div className="form-group">
            <label>연락처</label>
            <input
              type="text"
              name="연락처"
              value={기본정보.연락처}
              onChange={handleInputChange}
              maxLength={13}
              placeholder="연락처"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>키 (cm)</label>
            <input
              type="text"
              value={기본정보.키}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                기본정보설정({...기본정보, 키: value});
              }}
              placeholder=""
              maxLength={3}
            />
          </div>

          <div className="form-group">
            <label>체중 (kg)</label>
            <input
              type="text"
              value={기본정보.체중}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                if ((value.match(/\./g) || []).length <= 1) {
                  기본정보설정({...기본정보, 체중: value});
                }
              }}
              placeholder=""
              maxLength={5}
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
  // 기본 정보 상태
  const [기본정보, 기본정보설정] = useState({
    이름: '',
    주민번호: '',
    연락처: '',
    키: '',
    체중: ''
  });

  // 카테고리 선택 상태
  const [selectedCategories, setSelectedCategories] = useState({
    대분류: '',
    중분류: '',
    소분류: ''
  });

  // 카테고리 변경 핸들러
  const handleCategoryChange = (type, value) => {
    if (type === '대분류') {
      setSelectedCategories({
        대분류: value,
        중분류: '',
        소분류: ''
      });
    } else if (type === '중분류') {
      setSelectedCategories({
        ...selectedCategories,
        중분류: value,
        소분류: ''
      });
    } else if (type === '소분류') {
      setSelectedCategories({
        ...selectedCategories,
        소분류: value
      });
    }
  };

  const [운동강도, 운동강도설정] = useState('');
  const [스트레스강도, 스트레스강도정] = useState('');
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

  const handleSubmit = () => {
    // 폼 데이터를 객체로 구성
    const formData = {
      기본정보,
      성격,
      운동량,
      스트레스,
      복용약물,
      복용기간,
      기호식,
      파분석,
      메모
    };

    // 콘솔에 데이터 출력 (테스트용)
    console.log('제출된 데이터:', formData);

    // 여기에 실제 데터 제출 로직 추가
    // 예: API 호출, 로컬 스토리지 저장 등
    alert('데이터가 성공적으로 저장되었습니다.');
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
    return (
      <section className="symptom-section">
        <h2 className="section-title">증상 선택</h2>
        <div className="symptom-selection">
          <div className="form-group">
            <select 
              className="form-select" 
              value={selectedCategories.대분류}
              onChange={(e) => handleCategoryChange('대분류', e.target.value)}
            >
              <option value="">대분류</option>
              {Object.keys(증상카테고리).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select 
              className="form-select"
              value={selectedCategories.중분류}
              onChange={(e) => handleCategoryChange('중분류', e.target.value)}
              disabled={!selectedCategories.대분류}
            >
              <option value="">중분류</option>
              {selectedCategories.대분류 && 
                Object.keys(증상카테고리[selectedCategories.대분류]).map(subCategory => (
                  <option key={subCategory} value={subCategory}>{subCategory}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <select 
              className="form-select"
              value={selectedCategories.소분류}
              onChange={(e) => handleCategoryChange('소분류', e.target.value)}
              disabled={!selectedCategories.중분류}
            >
              <option value="">소분류</option>
              {selectedCategories.중분류 && 
                증상카테고리[selectedCategories.대분류][selectedCategories.중분류].map(detail => (
                  <option key={detail} value={detail}>{detail}</option>
                ))
              }
            </select>
          </div>

          <button 
            className="add-symptom-btn"
            onClick={handleAddSymptom}
            disabled={!selectedCategories.소분류}
          >
            증상 추가
          </button>
        </div>

        <div className="selected-symptoms-container">
          {selectedSymptoms.map((symptom, index) => (
            <div key={index} className="symptom-tag">
              <span className="category-part">{symptom.대분류}</span>
              <span className="separator">&gt;</span>
              <span className="subcategory-part">{symptom.중분류}</span>
              <span className="separator">&gt;</span>
              <span className="detail-part">{symptom.소분류}</span>
              <button 
                onClick={() => handleRemoveSymptom(symptom)}
                className="remove-tag-btn"
                title="삭제"
              >
                ×
              </button>
            </div>
          ))}
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

  // 기본 정보 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === '주민번호') {
      const formattedValue = value.replace(/[^0-9]/g, '').slice(0, 13);
      if (formattedValue.length > 6) {
        기본정보설정({
          ...기본정보,
          [name]: formattedValue.slice(0, 6) + '-' + formattedValue.slice(6)
        });
      } else {
        기본정보설정({
          ...기본정보,
          [name]: formattedValue
        });
      }
    } else if (name === '연락처') {
      const formattedValue = value.replace(/[^0-9]/g, '').slice(0, 11);
      if (formattedValue.length > 7) {
        기본정보설정({
          ...기본정보,
          [name]: formattedValue.slice(0, 3) + '-' + formattedValue.slice(3, 7) + '-' + formattedValue.slice(7)
        });
      } else if (formattedValue.length > 3) {
        기본정보설정({
          ...기본정보,
          [name]: formattedValue.slice(0, 3) + '-' + formattedValue.slice(3)
        });
      } else {
        기본정보설정({
          ...기본정보,
          [name]: formattedValue
        });
      }
    } else {
      기본정보설정({
        ...기본정보,
        [name]: value
      });
    }
  };

  // 선택된 증상들을 저장하는 상태 추가
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  // 증상 추가 핸들러
  const handleAddSymptom = () => {
    if (selectedCategories.소분류) {
      const newSymptom = {
        대분류: selectedCategories.대분류,
        중분류: selectedCategories.중분류,
        소분류: selectedCategories.소분류,
        full: `${selectedCategories.대분류} > ${selectedCategories.중분류} > ${selectedCategories.소분류}`
      };
      
      if (!selectedSymptoms.some(symptom => symptom.full === newSymptom.full)) {
        setSelectedSymptoms([...selectedSymptoms, newSymptom]);
        // 선택 초기화
        setSelectedCategories({
          대분류: '',
          중분류: '',
          소분류: ''
        });
      }
    }
  };

  // 증상 삭제 핸들러
  const handleRemoveSymptom = (symptomToRemove) => {
    setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom.full !== symptomToRemove.full));
  };

  return (
    <div className="App">
      <BasicInfoSection 
        기본정보={기본정보} 
        기본정보설정={기본정보설정} 
        handleInputChange={handleInputChange}
      />
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
              <option value="보통">통</option>
              <option value="적음">적음</option>
              <option value="매우 적음">매우 적음</option>
            </select>
          </div>

          {/* 두 번째 행 */}
          <div className="form-group">
            <label>복용 약물</label>
            <select 
              value={복용약물} 
              onChange={(e) => 복용약물설정(e.target.value)}
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
      <button className="submit-button" onClick={handleSubmit}>
        저장하기
      </button>
    </div>
  );
}

export default App;
