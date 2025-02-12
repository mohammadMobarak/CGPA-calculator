export interface GradeInputState {
  [key: string]: number;
}

export interface Subject {
  id: string;
  name: string;
  grade: string;
  hours: number;
}

export interface CGPACalculatorProps {
  gradeValues: GradeInputState;
}