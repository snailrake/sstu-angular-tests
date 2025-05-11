export interface User {
  username: string;
  role: 'student' | 'teacher';
  // пароль мы здесь не храним после логина
}
