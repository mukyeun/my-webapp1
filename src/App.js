import React, { useState } from 'react';
import './App.css';

import { 증상카테고리, 증상 } from './data/SymptomCategories';

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
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

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

  const [복용약물목록, 복용약물목록설정] = useState([]);  // 선택된 약물들의 배열

  // 약물 선택 핸들러
  const handleAddMedication = (e) => {
    const selectedMed = e.target.value;
    if (selectedMed && !복용약물목록.includes(selectedMed)) {
      복용약물목록설정([...복용약물목록, selectedMed]);
    }
    e.target.value = '';  // 선택 후 초기화
  };

  // 약물 삭제 핸들러
  const handleRemoveMedication = (약물) => {
    복용약물목록설정(복용약물목록.filter(item => item !== 약물));
  };

  const [맥파분석, 맥파분석설정] = useState({
    수축기혈압: '',
    이완기혈압: '',
    맥박: '',
    맥파전달속도: '',
    혈관나이: '',
    동맥경화도: '',
  });

  const [메모, 메모설정] = useState('');

  // 성격 상태 추가
  const [성격, 성격설정] = useState('');
  const [운동량, 운동량설정] = useState('');
  const [스트레스, 스트레스설정] = useState('');

  const [기호식, 기호식설정] = useState('');

  const handleSubmit = () => {
    // 폼 데이터를 객체로 구성
    const formData = {
      기본정보,
      성격,
      메모
    };

    // 콘솔에 데이터 출력 (테스트용)
    console.log('제출된 데이터:', formData);

    // 여기에 실제 데이터 제출 로직 추가
    // 예: API 호출, 로컬 스토리지 저장 등
    alert('데이터가 성공적으로 저장되었습니다.');
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

  // BMI 상태 계산 함수
  const getBmiStatus = (height, weight) => {
    if (!height || !weight) return '';
    
    const bmi = weight / Math.pow(height / 100, 2);
    
    if (bmi < 18.5) return '(저체중)';
    if (bmi < 23) return '(정상)';
    if (bmi < 25) return '(과체중)';
    if (bmi < 30) return '(비만)';
    return '(고도비만)';
  };

  return (
    <div className="App">
      <div className="medical-chart">
        <div className="chart-header">기본 정보</div>
        
        <div className="chart-row">
          <div className="chart-label">이름</div>
          <div className="chart-content">
            <input
              type="text"
              value={기본정보.이름}
              onChange={(e) => 기본정보설정({...기본정보, 이름: e.target.value})}
              placeholder="이름을 입력하세요"
            />
          </div>
        </div>

        <div className="chart-row">
          <div className="chart-label">주민등록번호</div>
          <div className="chart-content">
            <input
              type="text"
              name="주민번호"
              value={기본정보.주민번호}
              onChange={handleInputChange}
              placeholder="주민등록번호를 입력하세요"
            />
          </div>
        </div>

        <div className="chart-row">
          <div className="chart-label">연락처</div>
          <div className="chart-content">
            <input
              type="text"
              name="연락처"
              value={기본정보.연락처}
              onChange={handleInputChange}
              placeholder="연락처를 입력하세요"
            />
          </div>
        </div>

        <div className="chart-row">
          <div className="chart-label">신체 정보</div>
          <div className="chart-content">
            <div className="physical-info">
              <input
                type="text"
                value={기본정보.키}
                onChange={(e) => 기본정보설정({...기본정보, 키: e.target.value})}
                placeholder="키"
              />
              <span>cm</span>
              <input
                type="text"
                value={기본정보.체중}
                onChange={(e) => 기본정보설정({...기본정보, 체중: e.target.value})}
                placeholder="체중"
              />
              <span>kg</span>
              <div className="bmi-display">
                BMI: {기본정보.키 && 기본정보.체중 ? 
                  (기본정보.체중 / Math.pow(기본정보.키 / 100, 2)).toFixed(1) : ''}
                {getBmiStatus(기본정보.키, 기본정보.체중)}
              </div>
            </div>
          </div>
        </div>

        <div className="chart-row">
          <div className="chart-label">성격</div>
          <div className="chart-content">
            <select 
              value={성격} 
              onChange={(e) => 성격설정(e.target.value)}
            >
              <option value="">선택하세요</option>
              <option value="급한 편">급한 편</option>
              <option value="보통">보통</option>
              <option value="느린 편">느린 편</option>
            </select>
          </div>
        </div>

        <div className="chart-row">
          <div className="chart-label">복용약물</div>
          <div className="chart-content">
            <div className="medication-select-area">
              <select onChange={handleAddMedication}>
                <option value="">약물을 선택하세요</option>
                <option value="없음">없음</option>
                <option value="혈압약">혈압약</option>
                <option value="당뇨약">당뇨약</option>
                <option value="고지혈증약">고지혈증약</option>
                <option value="갑상선약">갑상선약</option>
                <option value="호르몬제">호르몬제</option>
              </select>
            </div>
            <div className="selected-medications">
              {복용약물목록.map((약물, index) => (
                <div key={index} className="selected-medication-item">
                  {약물}
                  <button onClick={() => handleRemoveMedication(약물)}>×</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lifestyle-selection">
          <div className="chart-row">
            <div className="chart-label">기호식</div>
            <div className="chart-content">
              <select 
                value={기호식} 
                onChange={(e) => 기호식설정(e.target.value)}
              >
                <option value="">선택하세요</option>
                <option value="없음">없음</option>
                <option value="술">술</option>
                <option value="담배">담배</option>
                <option value="커피">커피</option>
                <option value="마약">마약</option>
                <option value="기타">기타</option>
              </select>
            </div>
          </div>

          <div className="chart-row">
            <div className="chart-label">운동량</div>
            <div className="chart-content">
              <select 
                value={운동량} 
                onChange={(e) => 운동량설정(e.target.value)}
              >
                <option value="">선택하세요</option>
                <option value="매우 많음">매우 많음</option>
                <option value="많음">많음</option>
                <option value="보통">보통</option>
                <option value="적음">적음</option>
                <option value="매우 적음">매우 적음</option>
              </select>
            </div>
          </div>

          <div className="chart-row">
            <div className="chart-label">스트레스</div>
            <div className="chart-content">
              <select 
                value={스트레스} 
                onChange={(e) => 스트레스설정(e.target.value)}
              >
                <option value="">선택하세요</option>
                <option value="매우 많음">매우 많음</option>
                <option value="많음">많음</option>
                <option value="보통">보통</option>
                <option value="적음">적음</option>
                <option value="매우 적음">매우 적음</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="medical-chart">
        <div className="chart-header">맥파 분석</div>
        <div className="pulse-analysis">
          <div className="chart-row">
            <div className="chart-label">수축기 혈압</div>
            <div className="chart-content">
              <input 
                type="text" 
                value={맥파분석.수축기혈압}
                onChange={(e) => 맥파분석설정({...맥파분석, 수축기혈압: e.target.value})}
                placeholder="수축기 혈압" 
              />
              <span className="unit">mmHg</span>
            </div>
          </div>

          <div className="chart-row">
            <div className="chart-label">이완기 혈압</div>
            <div className="chart-content">
              <input 
                type="text" 
                value={맥파분석.이완기혈압}
                onChange={(e) => 맥파분석설정({...맥파분석, 이완기혈압: e.target.value})}
                placeholder="이완기 혈압" 
              />
              <span className="unit">mmHg</span>
            </div>
          </div>

          <div className="chart-row">
            <div className="chart-label">맥박수</div>
            <div className="chart-content">
              <input 
                type="text" 
                value={맥파분석.맥박}
                onChange={(e) => 맥파분석설정({...맥파분석, 맥박: e.target.value})}
                placeholder="맥박수" 
              />
              <span className="unit">회/분</span>
            </div>
          </div>
        </div>
      </div>

      <div className="medical-chart">
        <div className="chart-header">증상 선택</div>
        <div className="symptom-selection">
          <div className="chart-row">
            <div className="chart-label">대분류</div>
            <div className="chart-content">
              <select 
                value={selectedCategories.대분류}
                onChange={(e) => handleCategoryChange('대분류', e.target.value)}
              >
                <option value="">선택하세요</option>
                {Object.keys(증상카테고리).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="chart-row">
            <div className="chart-label">중분류</div>
            <div className="chart-content">
              <select 
                value={selectedCategories.중분류}
                onChange={(e) => handleCategoryChange('중분류', e.target.value)}
                disabled={!selectedCategories.대분류}
              >
                <option value="">선택하세요</option>
                {selectedCategories.대분류 && 
                  Object.keys(증상카테고리[selectedCategories.대분류]).map(subCategory => (
                    <option key={subCategory} value={subCategory}>{subCategory}</option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="chart-row">
            <div className="chart-label">소분류</div>
            <div className="chart-content">
              <select 
                value={selectedCategories.소분류}
                onChange={(e) => handleCategoryChange('소분류', e.target.value)}
                disabled={!selectedCategories.중분류}
              >
                <option value="">선택하세요</option>
                {selectedCategories.중분류 && 
                  증상[selectedCategories.중분류].map(symptom => (
                    <option key={symptom} value={symptom}>{symptom}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
        
        <div className="symptom-add-button">
          <button onClick={handleAddSymptom} disabled={!selectedCategories.소분류}>
            증상 추가
          </button>
        </div>

        {selectedSymptoms.map((symptom, index) => (
          <div key={index} className="selected-symptom-item">
            {symptom.full}
            <button 
              className="remove-symptom"
              onClick={() => handleRemoveSymptom(symptom)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="medical-chart">
        <div className="chart-header">메모</div>
        
        <div className="chart-row">
          <div className="chart-label">특이사항</div>
          <div className="chart-content">
            <textarea
              className="memo-textarea"
              value={메모}
              onChange={(e) => 메모설정(e.target.value)}
              placeholder="특이사항을 입력하세요"
            />
          </div>
        </div>
      </div>

      <div className="medical-chart">
        <div className="chart-row">
          <div className="chart-content">
            <button className="submit-button" onClick={handleSubmit}>
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;