export const validateHealthData = (data) => {
  const errors = {};

  // 기본 정보 검증
  if (!data.기본정보?.이름) {
    errors.이름 = '이름을 입력해주세요.';
  }

  if (!data.기본정보?.주민번호) {
    errors.주민번호 = '주민등록번호를 입력해주세요.';
  }

  if (!data.기본정보?.연락처) {
    errors.연락처 = '연락처를 입력해주세요.';
  }

  // 신체 정보 검증
  if (!data.기본정보?.키 || data.기본정보.키 <= 0) {
    errors.키 = '올바른 키를 입력해주세요.';
  }

  if (!data.기본정보?.체중 || data.기본정보.체중 <= 0) {
    errors.체중 = '올바른 체중을 입력해주세요.';
  }

  // 맥파 분석 데이터 검증
  if (!data.맥파분석?.수축기혈압 || data.맥파분석.수축기혈압 <= 0) {
    errors.수축기혈압 = '수축기 혈압을 입력해주세요.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
