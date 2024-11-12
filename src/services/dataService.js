export const saveHealthData = async (data) => {
  try {
    localStorage.setItem('healthData', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('데이터 저장 중 오류 발생:', error);
    return false;
  }
};

export const loadHealthData = () => {
  try {
    const data = localStorage.getItem('healthData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('데이터 불러오기 중 오류 발생:', error);
    return null;
  }
};

export const deleteHealthData = async () => {
  try {
    localStorage.removeItem('healthData');
    return true;
  } catch (error) {
    console.error('데이터 삭제 중 오류 발생:', error);
    return false;
  }
};

export const backupHealthData = async () => {
  try {
    const data = localStorage.getItem('healthData');
    if (!data) return null;
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-data-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('데이터 백업 중 오류 발생:', error);
    return false;
  }
};

export const restoreHealthData = async (file) => {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          localStorage.setItem('healthData', JSON.stringify(data));
          resolve(data);
        } catch (error) {
          reject(new Error('잘못된 백업 파일입니다.'));
        }
      };
      reader.onerror = () => reject(new Error('파일을 읽는 중 오류가 발생했습니다.'));
      reader.readAsText(file);
    });
  } catch (error) {
    console.error('데이터 복원 중 오류 발생:', error);
    throw error;
  }
};

export const searchHealthData = (searchTerm) => {
  try {
    const allData = localStorage.getItem('healthData');
    if (!allData) return [];

    const parsedData = JSON.parse(allData);
    const searchResults = [];

    // 이름, 주민번호, 연락처로 검색
    if (parsedData.기본정보?.이름?.includes(searchTerm) ||
        parsedData.기본정보?.주민번호?.includes(searchTerm) ||
        parsedData.기본정보?.연락처?.includes(searchTerm)) {
      searchResults.push(parsedData);
    }

    return searchResults;
  } catch (error) {
    console.error('데이터 검색 중 오류 발생:', error);
    return [];
  }
};
