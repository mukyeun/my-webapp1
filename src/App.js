import React, { useState } from 'react';
import './App.css';
import { 증상카테고리 } from './data/SymptomCategories';

function App() {
  const [기본정보, 기본정보설정] = useState({
    이름: '',
    생년: '',
    주민번호: '',
    연락처: '',
    키: '',
    체중: '',
    BMI: '',
    성별: ''
  });

  const [증상선택, 증상선택설정] = useState({
    대분류: '',
    중분류: '',
    소분류: ''
  });

  const [운동강도, 운동강도설정] = useState('');
  const [스트레스강도, 스트레스강도설정] = useState('');
  const [기호식선택, 기호식선택설정] = useState('');

  const [복용약물, 복용약물설정] = useState({
    혈압약: false,
    당뇨약: false,
    고지혈증약: false,
    항응고제: false,
    기타약물: false
  });

  const [맥파분석, 맥파분석설정] = useState({
    수축기혈압: '',
    이완기혈압: '',
    맥박: '',
    맥파전달속도: '',
    혈관나이: '',
    동맥경화도: '',
  });

  const [메모, 메모설정] = useState('');

  return (
    <div className="App">
      {/* 기본 정보 */}
      <section>
        <h3 className="section-title">기본 정보</h3>
        <div className="form-row">
          <div className="form-group">
            <label>이름</label>
            <input type="text" placeholder="이름을 입력하세요" />
          </div>
          <div className="form-group">
            <label>생년</label>
            <select>
              <option value="">생년을 선택하세요</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>주민번호</label>
            <input type="text" placeholder="주민번호를 입력하세요" />
          </div>
          <div className="form-group">
            <label>연락처</label>
            <input type="text" placeholder="연락처를 입력하세요" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>키(cm)</label>
            <input type="number" placeholder="키를 입력하세요" />
          </div>
          <div className="form-group">
            <label>체중(kg)</label>
            <input type="number" placeholder="체중을 입력하세요" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>BMI</label>
            <input type="text" readOnly />
          </div>
          <div className="form-group">
            <label>성별</label>
            <select>
              <option value="">선택하세요</option>
              <option value="남">남</option>
              <option value="여">여</option>
            </select>
          </div>
        </div>
      </section>

      {/* 증상 선택 */}
      <section>
        <h3 className="section-title">증상 선택</h3>
        <div className="select-row">
          <select>
            <option value="">대분류 선택</option>
          </select>
          <select>
            <option value="">중분류 선택</option>
          </select>
          <select>
            <option value="">소분류 선택</option>
          </select>
        </div>
      </section>

      {/* 운동 강도 */}
      <section>
        <h3 className="section-title">운동 강도</h3>
        <select className="full-width">
          <option value="">운동 강도를 선택하세요</option>
          <option value="낮음">낮음</option>
          <option value="중간">중간</option>
          <option value="높음">높음</option>
        </select>
      </section>

      {/* 스트레스 강도 */}
      <section>
        <h3 className="section-title">스트레스 강도</h3>
        <select className="full-width">
          <option value="">스트레스 강도를 선택하세요</option>
          <option value="낮음">낮음</option>
          <option value="중간">중간</option>
          <option value="높음">높음</option>
        </select>
      </section>

      {/* 기호식 선택 */}
      <section>
        <h3 className="section-title">기호식 선택</h3>
        <select className="full-width">
          <option value="">기호식을 선택하세요</option>
          {/* 기호식 옵션들 */}
        </select>
      </section>

      {/* 복용 약물 */}
      <section>
        <h3 className="section-title">복용 약물</h3>
        <div className="checkbox-row">
          <label><input type="checkbox" /> 혈압약</label>
          <label><input type="checkbox" /> 당뇨약</label>
          <label><input type="checkbox" /> 고지혈증약</label>
          <label><input type="checkbox" /> 항응고제</label>
          <label><input type="checkbox" /> 기타약물</label>
        </div>
      </section>

      {/* 맥파 분석 */}
      <section>
        <h3 className="section-title">맥파 분석</h3>
        <div className="form-row">
          <div className="form-group">
            <label>수축기 혈압</label>
            <input type="text" placeholder="mmHg" />
          </div>
          <div className="form-group">
            <label>이완기 혈압</label>
            <input type="text" placeholder="mmHg" />
          </div>
          <div className="form-group">
            <label>맥박</label>
            <input type="text" placeholder="회/분" />
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

      {/* 메모 */}
      <section>
        <h3 className="section-title">메모</h3>
        <textarea 
          className="full-width"
          placeholder="메모를 입력하세요"
          value={메모}
          onChange={(e) => 메모설정(e.target.value)}
        />
      </section>
    </div>
  );
}

export default App;
