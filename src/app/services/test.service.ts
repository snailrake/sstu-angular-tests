import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface Test {
  id?: number;
  title: string;
  questions: Question[];
  timeLimit: number;
}

export interface StudentResult {
  id?: number;
  name: string;
  score: number;
  testId: number;
}

@Injectable({ providedIn: 'root' })
export class TestService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  saveTest(test: Test): Observable<Test> {
    return this.http.post<Test>(`${this.api}/tests`, test);
  }

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.api}/tests`);
  }

  saveResult(result: StudentResult): Observable<StudentResult> {
    return this.http.post<StudentResult>(`${this.api}/results`, result);
  }

  getResults(): Observable<StudentResult[]> {
    return this.http.get<StudentResult[]>(`${this.api}/results`);
  }

  getResultsByStudent(username: string): Observable<StudentResult[]> {
    return this.getResults().pipe(
      map(results => results.filter(r => r.name === username))
    );
  }
}
