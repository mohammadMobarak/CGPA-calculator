import React, { useState } from 'react';
import { GradeInputState } from './types';
import { GraduationCap, School } from 'lucide-react';
import CGPACalculator from './components/CGPACalculator';

const GRADES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

const AIN_SHAMS_CS_VALUES: GradeInputState = {
  'A+': 4,
  'A': 4,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1,
  'D-': 0,
  'F': 0
};

function App() {
  const [gradeValues, setGradeValues] = useState<GradeInputState>({});
  const [showCalculator, setShowCalculator] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGradeValueChange = (grade: string, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setGradeValues(prev => ({
      ...prev,
      [grade]: numValue
    }));
    setError(null);
  };

  const setAinShamsValues = () => {
    setGradeValues(AIN_SHAMS_CS_VALUES);
    setError(null);
  };

  const validateGradeValues = () => {
    // Check if all grades have values
    const missingGrades = GRADES.filter(grade => {
      const value = gradeValues[grade];
      return typeof value !== 'number' || value === undefined;
    });

    if (missingGrades.length > 0) {
      setError(`Please enter values for all grades: ${missingGrades.join(', ')}`);
      return false;
    }

    // Check if values are within valid range (0-10)
    const invalidGrades = Object.entries(gradeValues).filter(([_, value]) => {
      return value < 0 || value > 10;
    });

    if (invalidGrades.length > 0) {
      setError('Grade values must be between 0 and 10');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateGradeValues()) {
      setShowCalculator(true);
    }
  };

  if (showCalculator) {
    return <CGPACalculator gradeValues={gradeValues} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center mb-8">
              <GraduationCap className="w-10 h-10 text-indigo-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">CGPA Calculator</h1>
            </div>
            
            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={setAinShamsValues}
                className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                <School className="w-5 h-5 mr-2" />
                Use Ain Shams CS Grading System
              </button>
            </div>

            <p className="text-gray-600 mb-6 text-center">
              Please enter the numerical value for each grade in your grading system.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GRADES.map((grade) => (
                  <div key={grade} className="relative">
                    <label 
                      htmlFor={`grade-${grade}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Grade {grade}
                    </label>
                    <input
                      type="number"
                      id={`grade-${grade}`}
                      step="0.01"
                      min="0"
                      max="10"
                      value={gradeValues[grade] !== undefined ? gradeValues[grade] : ''}
                      onChange={(e) => handleGradeValueChange(grade, e.target.value)}
                      className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Enter value"
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                  Continue to Calculator
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;