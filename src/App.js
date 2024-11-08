import React, { useState } from 'react';
import { 증상카테고리 } from './data/SymptomCategories';
import './App.css';

function App() {
  // 사용자 정보 상태
  const [사용자정보, 사용자정보설정] = useState({
    이름: '',
    성별: '',
    주민번호: '',
    연락처: '',
    키: '',
    체중: '',
    성격: '',
    육체노동: '',
    스트레스: '',
    운동정도: '',
    기호식: [],
    복용약물: [],
    형기체질: {
      유소년기: '',
      청년기: '',
      장년기: '',
      노년기: ''
    },
    기저질환: []
  });

  // 증상 선택 상태
  const [증상선택목록, 증상선택목록설정] = useState([{
    id: 1,
    대분류: '',
    중분류: '',
    최종증상: ''
  }]);

  // 전화번호 형식 변환 함수
  const 전화번호형식변환 = (value) => {
    const 숫자만 = value.replace(/[^0-9]/g, '');
    if (숫자만.length <= 3) {
      return 숫자만;
    } else if (숫자만.length <= 7) {
      return `${숫자만.slice(0, 3)}-${숫자만.slice(3)}`;
    } else {
      return `${숫자만.slice(0, 3)}-${숫자만.slice(3, 7)}-${숫자만.slice(7, 11)}`;
    }
  };

  // 사용자 정보 입력 처리
  const 입력처리 = (e) => {
    const { name, value } = e.target;
    if (name === '연락처') {
      사용자정보설정({
        ...사용자정보,
        [name]: 전화번호형식변환(value)
      });
    } else if (name === '주민번호') {
      주민번호처리(e);
    } else {
      사용자정보설정({
        ...사용자정보,
        [name]: value
      });
    }
  };

  // 주민번호 입력 처리
  const 주민번호처리 = (e) => {
    const 입력값 = e.target.value.replace(/[^0-9-]/g, '');
    let 포맷팅값 = 입력값;

    if (입력값.length <= 13) {
      // 하이픈이 없고 6자리 이상 입력된 경우 하이픈 추가
      if (!입력값.includes('-') && 입력값.length >= 6) {
        포맷팅값 = 입력값.slice(0, 6) + '-' + 입력값.slice(6);
      }
      // 최대 14자리(하이픈 포함)로 제한
      포맷팅값 = 포맷팅값.slice(0, 14);
      
      사용자정보설정({
        ...사용자정보,
        주민번호: 포맷팅값
      });
    }
  };

  // 새로운 선택 행 추가
  const 선택행추가 = () => {
    const 새아이디 = Math.max(...증상선택목록.map(item => item.id), 0) + 1;
    증상선택목록설정([...증상선택목록, {
      id: 새아이디,
      대분류: '',
      중분류: '',
      최종증상: ''
    }]);
  };

  // 선택 행 삭제
  const 선택행삭제 = (삭제할ID) => {
    if (증상선택목록.length > 1) {
      증상선택목록설정(증상선택목록.filter(item => item.id !== 삭제할ID));
    }
  };

  // 선택 처리
  const 선택처리 = (값, 단계, id) => {
    증상선택목록설정(증상선택목록.map(item => {
      if (item.id === id) {
        switch (단계) {
          case '대분류':
            return { ...item, 대분류: 값, 중분류: '', 최종증상: '' };
          case '중분류':
            return { ...item, 중분류: 값, 최종증상: '' };
          case '최종증상':
            return { ...item, 최종증상: 값 };
          default:
            return item;
        }
      }
      return item;
    }));
  };

  // BMI 계산 함수
  const BMI계산 = () => {
    if (사용자정보.키 && 사용자정보.체중) {
      const 키_미터 = 사용자정보.키 / 100;
      const bmi = (사용자정보.체중 / (키_미터 * 키_미터)).toFixed(1);
      return {
        수치: bmi,
        상태: BMI상태판정(bmi)
      };
    }
    return { 수치: '', 상태: '' };
  };

  // BMI 상태 판정 함수
  const BMI상태판정 = (bmi) => {
    if (bmi < 16.0) return '심한 저체중';
    if (bmi < 18.5) return '저중';
    if (bmi < 23.0) return '정상';
    if (bmi < 25.0) return '과체중';
    if (bmi < 30.0) return '비만';
    return '고도비만';
  };

  // 나이 계산 함수
  const 나이계산 = () => {
    const 주민번호 = 사용자정보.주민번호.replace('-', '');
    if (주민번호.length !== 13) return null;
    
    const 년도2자리 = parseInt(주민번호.substring(0, 2));
    const 성별구분자 = 주민번호.charAt(6);
    
    let 출생년도;
    if (성별구분자 === '1' || 성별구분자 === '2') {
      출생년도 = 1900 + 년도2자리;
    } else if (성별구분자 === '3' || 성별구분자 === '4') {
      출생년도 = 2000 + 년도2자리;
    } else {
      throw new Error('Invalid year format');
    }

    const 생년월일 = new Date(출생년도, 0, 1).toISOString().split('T')[0];
    return 생년월일;
  };

  // 표시할 연령대 목록 반환 함수
  const 표시연령대목록 = () => {
    const 나이 = 나이계산();
    if (!나이) return [];
    
    const 연령대목록 = [];
    if (나이 >= 1) 연령대목록.push('유소년기');
    if (나이 >= 21) 연령대목록.push('청년기');
    if (나이 >= 41) 연령대목록.push('장년기');
    if (나이 >= 61) 연령대목록.push('노년기');
    return 연령대목록;
  };

  // 형기체질 입력 처리
  const 형기체질처리 = (시기, 값) => {
    사용자정보설정({
      ...사용자정보,
      형기체질: {
        ...사용자정보.형기체질,
        [시기]: 값
      }
    });
  };

  // 약물 목록 정의
  const 약물목록 = [
    '소염진통제',
    '항생제',
    '스테로이드제',
    '혈압강하제',
    '혈당강하제',
    '고지혈증약',
    '신경안정제',
    '수면유도제',
    '항암제',
    '여성호르몬제',
    '갑상선호르몬제'
  ];

  // 약물 선택 처리
  const 약물선택처리 = (선택약물) => {
    if (사용자정보.복용약물.includes(선택약물)) {
      // 이미 선택된 약물이면 제거
      사용자정보설정({
        ...사용자정보,
        복용약물: 사용자정보.복용약물.filter(약물 => 약물 !== 선택약물)
      });
    } else {
      // 새로운 약물 추가
      사용자정보설정({
        ...사용자정보,
        복용약물: [...사용자정보.복용약물, 선택약물]
      });
    }
    // 드롭다운 닫기
    드롭다운열림설정(false);
  };

  // 약물 카테고리 정
  const 약물카테고리 = {
    '진통/소염제': ['소염진통제'],
    '감염치료제': ['항생제'],
    '스테로이드': ['스테로이드제'],
    '순환기계': ['혈압강하제', '고지혈증약'],
    '내분비계': ['혈당강하제', '갑상선호르몬제'],
    '신경정신계': ['신경안정제', '수면유도제'],
    '항암제': ['항암제'],
    '호르몬제': ['여성호르몬제']
  };

  // 드롭다운 상태 관리
  const [드롭다운열림, 드롭다운열림설정] = useState(false);

  // 강도 레벨 목록 (육체노동, 스트레스, 운동정도가 동일한 옵션을 사용)
  const 강도레벨 = [
    '매우 많음',
    '많음',
    '보통',
    '적음',
    '매우 적음'
  ];

  // 기호식 목록
  const 기호식목록 = {
    '술': ['전혀 안 마심', '가끔 마심 (월 1-2회)', '자주 마심 (주 1-2회)', '매우 자주 마심 (주 3회 이상)'],
    '담배': ['비흡연', '금연중', '흡연 (하루 반갑 이하)', '흡연 (하루 한갑 이하)', '흡연 (하루 한갑 이상)'],
    '커피': ['안 마심', '가끔 마심 (하루 1잔 이하)', '보통 (하루 2-3잔)', '자주 마심 (하루 4잔 이상)'],
    '기타 기호품': ['없음', '에너지 드링크', '탄산음료', '기타']
  };

  // 기호식 선택 처리
  const 기호식처리 = (종류, 상태) => {
    const 현재기호식 = [...사용자정보.기호식];
    const 기존항목인덱스 = 현재기호식.findIndex(item => item.startsWith(종류 + ':'));
    
    if (상태 === '') {
      // 선택 해제
      if (기존항목인덱스 !== -1) {
        현재기호식.splice(기존항목인덱스, 1);
      }
    } else {
      // 새로운 선택 또는 업데이트
      const 새항목 = `${종류}: ${상태}`;
      if (기존항목인덱스 !== -1) {
        현재기호식[기존항목인덱스] = 새항목;
      } else {
        현재기호식.push(새항목);
      }
    }

    사용자정보설정({
      ...사용자정보,
      기호식: 현재기호식
    });
  };

  return (
    <div className="app">
      {/* 사용자 정보 입력 폼 */}
      <div className="user-info">
        <h2>기본 정보</h2>
        <div className="form-group">
          <input
            type="text"
            name="이름"
            value={사용자정보.이름}
            onChange={입력처리}
            placeholder="이름"
          />
          <select name="성별" value={사용자정보.성별} onChange={입력처리}>
            <option value="">성별 선택</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
          <input
            type="text"
            name="주민번호"
            value={사용자정보.주민번호}
            onChange={주민번호처리}
            placeholder="주민번호 (예: 000-00-0000)"
            maxLength="14"
          />
          <input
            type="tel"
            name="연락처"
            value={사용자정보.연락처}
            onChange={입력처리}
            placeholder="연락처 (예: 010-1234-5678)"
            maxLength="13"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="키"
            value={사용자정보.키}
            onChange={입력처리}
            placeholder="키 (cm)"
          />
          <input
            type="number"
            name="체중"
            value={사용자정보.체중}
            onChange={입력처리}
            placeholder="체중 (kg)"
          />
          <div className="bmi-display">
            <input
              type="text"
              value={`BMI: ${BMI계산().수치}${BMI계산().수치 ? ` (${BMI계산().상태})` : ''}`}
              readOnly
              placeholder="BMI 지수"
            />
          </div>
        </div>
        <div className="form-group">
          <select
            name="성격"
            value={사용자정보.성격}
            onChange={입력처리}
            className="personality-select"
          >
            <option value="">성격 선택</option>
            <option value="매우급함">매우급함</option>
            <option value="급함">급함</option>
            <option value="보통">보통</option>
            <option value="느���함">느긋함</option>
            <option value="매우느긋함">매우느긋함</option>
          </select>
        </div>

        {/* 형기체질 섹션 */}
        {사용자정보.주민번호 && (
          <div className="form-section">
            <h3>형기체질</h3>
            <div className="hyunggi-container">
              {표시연령대목록().map((시기) => (
                <div key={시기} className="hyunggi-item">
                  <label>{시기} ({
                    시기 === '유소년기' ? '1~20세' : 
                    시기 === '청년기' ? '21~40세' : 
                    시기 === '장년기' ? '41~60세' : 
                    '60세 이상'
                  })</label>
                  <select
                    value={사용자정보.형기체질[시기]}
                    onChange={(e) => 형기체질처리(시기, e.target.value)}
                    className="hyunggi-select"
                  >
                    <option value="">형기체질 선택</option>
                    <option value="형쇠기실">형쇠기실</option>
                    <option value="형기구실">형기구실</option>
                    <option value="형기구평">형기구평</option>
                    <option value="형실기쇠">형실기쇠</option>
                    <option value="형기구쇠">형기구쇠</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 복용 약물 섹션 */}
        <div className="form-section">
          <h3>복용 약물</h3>
          <div className="medication-dropdown">
            <button 
              className="medication-select-btn"
              onClick={() => 드롭다운열림설정(!드롭다운열림)}
            >
              {사용자정보.복용약물.length > 0 
                ? 사용자정보.복용약물.join(', ')
                : '약물 선택'}
              <span className="dropdown-arrow">{드롭다운열림 ? '▲' : '▼'}</span>
            </button>
            
            {드롭다운열림 && (
              <div className="medication-list">
                {Object.entries(약물카테고리).map(([카테고리, 약물들]) => (
                  <div key={카테고리} className="medication-category">
                    <div className="category-title">{카테고리}</div>
                    {약물들.map((약물) => (
                      <label key={약물} className="medication-item">
                        <input
                          type="checkbox"
                          checked={사용자정보.복용약물.includes(약물)}
                          onChange={() => 약물선택처리(약물)}
                        />
                        <span>{약물}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {사용자정보.복용약물.length > 0 && (
            <div className="selected-medications">
              <h4>선택된 약물:</h4>
              <div className="medication-tags">
                {사용자정보.복용약물.map((약물) => (
                  <span key={약물} className="medication-tag">
                    {약물}
                    <button 
                      onClick={() => 약물선택처리(약물)}
                      className="remove-medication"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 육체노동, 스트레스, 운동정도를 함께 그룹화 */}
        <div className="form-section intensity-group">
          <div className="intensity-item">
            <h3>육체노동 강도</h3>
            <div className="intensity-wrapper">
              <select
                name="육체노동"
                value={사용자정보.육체노동}
                onChange={입력처리}
                className="intensity-select"
              >
                <option value="">육체노동 강도 선택</option>
                {강도레벨.map((강도) => (
                  <option key={강도} value={강도}>{강도}</option>
                ))}
              </select>
              {사용자정보.육체노동 && (
                <div className="selected-intensity">
                  선택된 강도: <span className="intensity-value">{사용자정보.육체노동}</span>
                </div>
              )}
            </div>
          </div>

          <div className="intensity-item">
            <h3>스트레스 강도</h3>
            <div className="intensity-wrapper">
              <select
                name="스트레스"
                value={사용자정보.스트레스}
                onChange={입력처리}
                className="intensity-select"
              >
                <option value="">스트레스 강도 선택</option>
                {강도레벨.map((강도) => (
                  <option key={강도} value={강도}>{강도}</option>
                ))}
              </select>
              {사용자정보.스트레스 && (
                <div className="selected-intensity">
                  선택된 강도: <span className="intensity-value">{사용자정보.스트레스}</span>
                </div>
              )}
            </div>
          </div>

          <div className="intensity-item">
            <h3>운동 정도</h3>
            <div className="intensity-wrapper">
              <select
                name="운동정도"
                value={사용자정보.운동정도}
                onChange={입력처리}
                className="intensity-select"
              >
                <option value="">운동 정도 선택</option>
                {강도레벨.map((강도) => (
                  <option key={강도} value={강도}>{강도}</option>
                ))}
              </select>
              {사용자정보.운동정도 && (
                <div className="selected-intensity">
                  선택된 강도: <span className="intensity-value">{사용자정보.운동정도}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>기호식 선택</h3>
          <div className="preference-container">
            {Object.entries(기호식목록).map(([종류, 상태목록]) => (
              <div key={종류} className="preference-item">
                <label className="preference-label">{종류}</label>
                <select
                  className="preference-select"
                  value={사용자정보.기호식.find(item => item.startsWith(종류 + ':'))?.split(': ')[1] || ''}
                  onChange={(e) => 기호식처리(종류, e.target.value)}
                >
                  <option value="">선택하세요</option>
                  {상태목록.map((상태) => (
                    <option key={상태} value={상태}>
                      {상태}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {사용자정보.기호식.length > 0 && (
            <div className="selected-preferences">
              <h4>선택된 기호식:</h4>
              <div className="preference-tags">
                {사용자정보.기호식.map((기호) => (
                  <span key={기호} className="preference-tag">
                    {기호}
                    <button 
                      onClick={() => 기호식처리(기호.split(':')[0], '')}
                      className="remove-preference"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 증상 선택 부분 */}
      <div className="symptom-selection">
        <h2>증상 선택</h2>
        <div className="selection-rows">
          {증상선택목록.map((선택항목) => (
            <div key={선택항목.id} className="selection-row">
              <select 
                value={선택항목.대분류}
                onChange={(e) => 선택처리(e.target.value, '대분류', 선택항목.id)}
              >
                <option value="">대분류 선택</option>
                {Object.keys(증상카테고리).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={선택항목.중분류}
                onChange={(e) => 선택처리(e.target.value, '중분류', 선택항목.id)}
                disabled={!선택항목.대분류}
              >
                <option value="">중분류 선택</option>
                {선택항목.대분류 && Object.keys(증상카테고리[선택항목.대분류]).map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>

              <select
                value={선택항목.최종증상}
                onChange={(e) => 선택처리(e.target.value, '최종증상', 선택항목.id)}
                disabled={!선택항목.중분류}
              >
                <option value="">증상 선택</option>
                {선택항목.중분류 && 증상카테고리[선택항목.대분류][선택항목.중분류].map(symptom => (
                  <option key={symptom} value={symptom}>{symptom}</option>
                ))}
              </select>

              <button 
                className="delete-row-btn"
                onClick={() => 선택행삭제(선택항목.id)}
                disabled={증상선택목록.length === 1}
              >
                삭제
              </button>
            </div>
          ))}
        </div>

        <button 
          className="add-row-btn"
          onClick={선택행추가}
        >
          증상 추가
        </button>
      </div>
    </div>
  );
}

export default App;
