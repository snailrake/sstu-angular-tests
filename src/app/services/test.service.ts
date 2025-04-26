import {Injectable} from '@angular/core';

export interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  points: number; // Баллы для вопроса
}

export interface Test {
  title: string;
  questions: Question[];
}

export interface StudentResult {
  name: string;
  score: number;
}

@Injectable({ providedIn: 'root' })
export class TestService {
  private testsKey = 'tests';
  private resultsKey = 'results';

  // Сохраняем тест
  saveTest(test: Test): void {
    const arr = this.getTests();
    arr.push(test);
    localStorage.setItem(this.testsKey, JSON.stringify(arr));
  }

  // Получаем все тесты
  getTests(): Test[] {
    return JSON.parse(localStorage.getItem(this.testsKey) || '[]');
  }

  // Сохраняем результат
  saveResult(result: StudentResult): void {
    const results = this.getResults();
    results.push(result);
    localStorage.setItem(this.resultsKey, JSON.stringify(results));
  }

  // Получаем все результаты
  getResults(): StudentResult[] {
    return JSON.parse(localStorage.getItem(this.resultsKey) || '[]');
  }
}
