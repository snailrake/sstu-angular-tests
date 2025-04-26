import { Injectable } from '@angular/core';

export interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  points: number;
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

  // сохранить тест в localStorage
  saveTest(test: Test): void {
    const arr = this.getTests();
    arr.push(test);
    localStorage.setItem(this.testsKey, JSON.stringify(arr));
  }

  // получить все тесты
  getTests(): Test[] {
    return JSON.parse(localStorage.getItem(this.testsKey) || '[]');
  }

  // сохранить результат студента
  saveResult(result: StudentResult): void {
    const arr = this.getResults();
    arr.push(result);
    localStorage.setItem(this.resultsKey, JSON.stringify(arr));
  }

  // получить все результаты
  getResults(): StudentResult[] {
    return JSON.parse(localStorage.getItem(this.resultsKey) || '[]');
  }
}
