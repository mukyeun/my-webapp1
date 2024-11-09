import React, { useState } from 'react';
import './App.css';
import { 증상카테고리 } from './data/SymptomCategories';

// 상수 데이터 선언 (컴포넌트 외부에)
const 기호식목록 = [
  '커피', '술', '담배', '초콜릿', '탄산음료',
  '매운음식', '찬음식', '단음식', '기름진음식'
];

const 복용약물목록 = [
  '혈압약', '당뇨약', '고지혈증약', '위장약', '진통제',
  '항생제', '소화제', '영양제', '한약', '기타약물'
];

function App() {
  // 기본 정보 상태
  const [이름, 이름설정] = useState('');
  const [성별, 성별설정] = useState('');
  const [주민번호, 주민번호설정] = useState('');
  const [연락처, 연락처설정] = useState('');
  const [키, 키설정] = useState('');
  const [체중, 체중설정] = useState('');
  const [성격, 성격설정] = useState('');

  // 증상 선택 상태
  const [대분류, 대분류설정] = useState('');
  const [중분류, 중분류설정] = useState('');
  const [소분류, 소분류설정] = useState('');
  const [선택된증상목록, 증상목록설정] = useState([]);

  // 기호식 상태
  const [선택된기호식, 기호식설정] = useState([]);

  // 복용약물 상태
  const [선택된약물, 약물설정] = useState([]);

  // 맥파 데이터 상태 추가
  const [맥파데이터, 맥파데이터설정] = useState({
    좌측맥박: '',
    우측맥박: '',
    특이사항: ''
  });

  // 운동 강도 상태
  const [운동강도, 운동강도설정] = useState('');

  // 스트레스 강도 상태
  const [스트레스강도, 스트레스강도설정] = useState('');

  // 메모 상태
  const [메모, 메모설정] = useState('');

  // 다크 모드 상태
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // 사용자 시스템의 다크 모드 설정 확인
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // localStorage에 저장된 테마 설정 확인
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : prefersDark;
  });

  // 증상 선택 처리 함수들
  const 대분류선택처리 = (값) => {
    대분류설정(값);
    중분류설정('');
    소분류설정('');
  };

  const 중분류선택처리 = (값) => {
    중분류설정(값);
    소분류설정('');
  };

  const 소분류선택처리 = (값) => {
    소분류설정(값);
  };

  // 기호식 처리 함수들
  const 기호식추가 = (기호식) => {
    if (선택된기호식.includes(기호식)) {
      기호식설정(선택된기호식.filter(item => item !== 기호식));
    } else {
      기호식설정([...선택된기호식, 기호식]);
    }
  };

  const 기호식삭제 = (인덱스) => {
    기호식설정(선택된기호식.filter((_, idx) => idx !== 인덱스));
  };

  // 복용약물 처리 함수들
  const 약물추가 = (약물) => {
    if (선택된약물.includes(약물)) {
      약물설정(선택된약물.filter(item => item !== 약물));
    } else {
      약물설정([...선택된약물, 약물]);
    }
  };

  const 약물삭제 = (인덱스) => {
    약물설정(선택된약물.filter((_, idx) => idx !== 인덱스));
  };

  // 맥파데이터 처리 함수
  const 맥파데이터처리 = (필드, 값) => {
    맥파데이터설정({
      ...맥파데이터,
      [필드]: 값
    });
  };

  // 데이터 저장/불러오기 함수들
  const 데이터저장 = () => {
    const 저장할데이터 = {
      이름,
      성별,
      주민번호,
      연락처,
      키,
      체중,
      성격,
      선택된증상목록,
      선택된기호식,
      선택된약물,
      맥파데이터,
      운동강도,
      스트레스강도,
      메모
    };

    localStorage.setItem('healthInfo', JSON.stringify(저장할데이터));
    alert('데이터가 저장되었습니다.');
  };

  const 데이터불러오기 = () => {
    const 저장된데이터 = localStorage.getItem('healthInfo');
    if (저장된데이터) {
      const 파싱된데이터 = JSON.parse(저장된데이터);
      
      // 각 상태 업데이트
      이름설정(파싱된데이터.이름 || '');
      성별설정(파싱된데이터.성별 || '');
      주민번호설정(파싱된데이터.주민번호 || '');
      연락처설정(파싱된데이터.연락처 || '');
      키설정(파싱된데이터.키 || '');
      체중설정(파싱된데이터.체중 || '');
      성격설정(파싱된데이터.성격 || '');
      증상목록설정(파싱된데이터.선택된증상목록 || []);
      기호식설정(파싱된데이터.선택된기호식 || []);
      약물설정(파싱된데이터.선택된약물 || []);
      맥파데이터설정(파싱된데이터.맥파데이터 || {});
      운동강도설정(파싱된데이터.운동강도 || '');
      스트레스강도설정(파싱된데이터.스트레스강도 || '');
      메모설정(파싱된데이터.메모 || '');

      alert('데이터를 불러습니.');
    } else {
      alert('저장된 데이터가 없습니다.');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // 맥파 데이터 업데이트 함수
  const 맥파데이터업데이트 = (필드, 값) => {
    맥파데이터설정(이전데이터 => ({
      ...이전데이터,
      [필드]: 값
    }));
  };

  // 데이터 내보내기 함수
  const 데이터내보내기 = () => {
    const 저장할데이터 = {
      이름,
      성별,
      주민번호,
      연락처,
      키,
      체중,
      성격,
      선택된증상목록,
      선택된기호식,
      선택된약물,
      맥파데이터,
      운동강도,
      스트레스강도,
      메모,
      저장일시: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(저장할데이터, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `건강정보_${이름 || '무명'}_${new Date().toLocaleDateString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 데이터 가져오기 함수
  const 데이터가져오기 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const 파싱된데이터 = JSON.parse(e.target.result);
          
          // 각 상태 업데이트
          이름설정(파싱된데이터.이름 || '');
          성별설정(파싱된데이터.성별 || '');
          주민번호설정(파싱된데이터.주민번호 || '');
          연락처설정(파싱된데이터.연락처 || '');
          키설정(파싱된데이터.키 || '');
          체중설정(파싱된데이터.체중 || '');
          성격설정(파싱된데이터.성격 || '');
          증상목록설정(파싱된데이터.선택된증상목록 || []);
          기호식설정(파싱된데이터.선택된기호식 || []);
          약물설정(파싱된데이터.선택된약물 || []);
          맥파데이터설정(파싱된데이터.맥파데이터 || {});
          운동강도설정(파싱된데이터.운동강도 || '');
          스트레스강도설정(파싱된데이터.스트레스강도 || '');
          메모설정(파싱된데이터.메모 || '');

          alert('데이터를 성공적으로 가져왔습니다.');
        } catch (error) {
          alert('파일 형식이 올바르지 않습니다.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="theme-toggle">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? '라이트 모드' : '다크 모드'}
        </button>
      </div>
      {/* 1. 기본 정보 */}
      <section className="info-section">
        <h2>기본 정보</h2>
        <div className="basic-info-grid">
          <div className="input-group">
            <label>이름</label>
            <input 
              type="text" 
              className="modern-input"
              value={이름}
              onChange={(e) => 이름설정(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>

          <div className="input-group">
            <label>성별</label>
            <select 
              className="modern-select"
              value={성별}
              onChange={(e) => 성별설정(e.target.value)}
            >
              <option value="">선택하세요</option>
              <option value="male">남</option>
              <option value="female">여성</option>
            </select>
          </div>

          <div className="input-group">
            <label>주민번호</label>
            <input 
              type="text" 
              className="modern-input"
              value={주민번호}
              onChange={(e) => 주민번호설정(e.target.value)}
              placeholder="주민번호를 입력하세요"
            />
          </div>

          <div className="input-group">
            <label>연락처</label>
            <input 
              type="tel" 
              className="modern-input"
              value={연락처}
              onChange={(e) => 연락처설정(e.target.value)}
              placeholder="연락처를 입력하세요"
            />
          </div>

          <div className="input-group">
            <label>키 (cm)</label>
            <input 
              type="number" 
              className="modern-input"
              value={키}
              onChange={(e) => 키설정(e.target.value)}
              placeholder=" 입력하세요"
            />
          </div>

          <div className="input-group">
            <label>체중 (kg)</label>
            <input 
              type="number" 
              className="modern-input"
              value={체중}
              onChange={(e) => 체중설정(e.target.value)}
              placeholder="체중을 입력하세요"
            />
          </div>

          <div className="input-group">
            <label>BMI</label>
            <input 
              type="text" 
              className="modern-input disabled"
              value={키 && 체중 ? (체중 / ((키/100) ** 2)).toFixed(1) : ''}
              readOnly
            />
          </div>

          <div className="input-group">
            <label>성격</label>
            <select 
              className="modern-select"
              value={성격}
              onChange={(e) => 성격설정(e.target.value)}
            >
              <option value="">선택하세요</option>
              <option value="calm">차분함</option>
              <option value="active">활적</option>
              <option value="sensitive">예민함</option>
            </select>
          </div>
        </div>
      </section>

      {/* 2. 증상 선택 */}
      <section className="info-section">
        <h2>증상 선택</h2>
        <div className="symptom-selection">
          <div className="category-group">
            <select 
              value={대분류}
              onChange={(e) => 대분류선택처리(e.target.value)}
            >
              <option value="">대분류 선택</option>
              {/* 대분 옵션들 */}
            </select>

            <select 
              value={중분류}
              onChange={(e) => 중분류선택처리(e.target.value)}
              disabled={!대분류}
            >
              <option value="">중분류 선택</option>
              {/* 중분류 션들 */}
            </select>

            <select 
              value={소분류}
              onChange={(e) => 소분류선택처리(e.target.value)}
              disabled={!중분류}
            >
              <option value="">증상 선택</option>
              {/* 소분류 옵션들 */}
            </select>
          </div>
        </div>
      </section>

      {/* 3. 운동/스트레스 강도 */}
      <div className="intensity-row">
        <section className="info-section half-width">
          <h2>운동 강도</h2>
          <div className="intensity-selection">
            <select 
              className="modern-select"
              value={운동강도}
              onChange={(e) => 운동강도설정(e.target.value)}
            >
              <option value="">운동 강도 선택</option>
              <option value="없음">없음</option>
              <option value="약함">약함</option>
              <option value="보통">보통</option>
              <option value="강함">강함</option>
              <option value="매우강함">매우 강함</option>
            </select>
          </div>
        </section>

        <section className="info-section half-width">
          <h2>스트레스 강도</h2>
          <div className="intensity-selection">
            <select 
              className="modern-select"
              value={스트레스강도}
              onChange={(e) => 스트레스강도설정(e.target.value)}
            >
              <option value="">스트레스 강도 선택</option>
              <option value="없음">없음</option>
              <option value="약함">약함</option>
              <option value="보통">보통</option>
              <option value="강함">강함</option>
              <option value="매우강함">매우 강함</option>
            </select>
          </div>
        </section>
      </div>

      {/* 4. 기호식 선택 */}
      <section className="info-section">
        <h2>기호식 선택</h2>
        <div className="preference-options">
          {기호식목록.map((기호식) => (
            <label key={기호식} className="preference-item">
              <input
                type="checkbox"
                checked={선택된기호식.includes(기호식)}
                onChange={() => 기호식추가(기호식)}
              />
              <span>{기호식}</span>
            </label>
          ))}
        </div>
      </section>

      {/* 5. 복용약물 */}
      <section className="info-section">
        <h2>복용약물</h2>
        <div className="preference-options">
          {복용약물목록.map((약물) => (
            <label key={약물} className="preference-item">
              <input
                type="checkbox"
                checked={선택된약물.includes(약물)}
                onChange={() => 약물추가(약물)}
              />
              <span>{약물}</span>
            </label>
          ))}
        </div>
      </section>

      {/* 6. 맥파분석 */}
      <section className="info-section pulse-wave">
        <h2>맥파분석</h2>
        <div className="pulse-wave-grid">
          <div className="input-group">
            <label>수축기 혈압</label>
            <input 
              type="number" 
              className="modern-input"
              value={맥파데이터.수축기혈압}
              onChange={(e) => 맥파데이터처리('수축기혈압', e.target.value)}
              placeholder="mmHg"
            />
          </div>

          <div className="input-group">
            <label>이완기 혈압</label>
            <input 
              type="number" 
              className="modern-input"
              value={맥파데이터.이완기혈압}
              onChange={(e) => 맥파데이터처리('이완기혈압', e.target.value)}
              placeholder="mmHg"
            />
          </div>

          <div className="input-group">
            <label>맥박수</label>
            <input 
              type="number" 
              className="modern-input"
              value={맥파데이터.맥박수}
              onChange={(e) => 맥파데이터처리('맥박수', e.target.value)}
              placeholder="회/분"
            />
          </div>

          <div className="input-group">
            <label>맥파전달속도</label>
            <input 
              type="number" 
              className="modern-input"
              value={맥파데이터.맥파전달속도}
              onChange={(e) => 맥파데이터처리('맥파전달속도', e.target.value)}
              placeholder="m/s"
            />
          </div>

          <div className="input-group">
            <label>혈관나이</label>
            <input 
              type="number" 
              className="modern-input"
              value={맥파데이터.혈관나이}
              onChange={(e) => 맥파데이터처리('혈관나이', e.target.value)}
              placeholder="세"
            />
          </div>

          <div className="input-group">
            <label>동맥경화도</label>
            <select 
              className="modern-select"
              value={맥파데이터.동맥경화도}
              onChange={(e) => 맥파데이터처리('동맥경화도', e.target.value)}
            >
              <option value="">선택하세요</option>
              <option value="normal">정</option>
              <option value="mild">경도</option>
              <option value="moderate">중등도</option>
              <option value="severe">중증</option>
            </select>
          </div>

          <div className="input-group full-width">
            <label>특이사항</label>
            <textarea
              className="modern-input"
              value={맥파데이터.특이사항}
              onChange={(e) => 맥파데이터업데이트('특이사항', e.target.value)}
              placeholder="특이사항을 입력하세요"
              rows="3"
            />
          </div>
        </div>
      </section>

      {/* 메모 섹션 */}
      <section className="info-section">
        <h2>메모</h2>
        <div className="memo-container">
          <textarea 
            className="memo-input"
            value={메모}
            onChange={(e) => 메모설정(e.target.value)}
            placeholder="특이사항이나 추가 정보를 입력하세요"
            rows="4"
          />
        </div>
      </section>

      {/* 데이터 저장/불러오기 버튼 */}
      <div className="data-control-buttons">
        <div className="button-group">
          <button className="save-button" onClick={데이터저장}>
            로컬에 저장
          </button>
          <button className="load-button" onClick={데이터불러오기}>
            로컬에서 불러오기
          </button>
        </div>
        
        <div className="button-group">
          <button className="export-button" onClick={데이터내보내기}>
            파일로 내보내기
          </button>
          <label className="import-button">
            파일에서 가져오기
            <input
              type="file"
              accept=".json"
              onChange={데이터가져오기}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
