import React, { useState } from 'react';
import { Trash2, PlusCircle, Calculator } from 'lucide-react';
import type { Subject, CGPACalculatorProps } from '../types';

export default function CGPACalculator({ gradeValues }: CGPACalculatorProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState<Subject>({
    id: '',
    name: '',
    grade: 'A',
    hours: 3
  });
  const [cgpa, setCGPA] = useState<number | null>(null);

  const GRADES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

  const handleAddSubject = () => {
    if (!newSubject.name) return;
    
    setSubjects([...subjects, {
      ...newSubject,
      id: crypto.randomUUID()
    }]);
    
    setNewSubject({
      id: '',
      name: '',
      grade: 'A',
      hours: 3
    });
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const handleUpdateSubject = (id: string, field: keyof Subject, value: string | number) => {
    setSubjects(subjects.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const calculateCGPA = () => {
    if (subjects.length === 0) return;

    let totalPoints = 0;
    let totalHours = 0;

    subjects.forEach(subject => {
      // Get the grade value from the gradeValues prop
      const gradeValue = gradeValues[subject.grade];
      console.log(`Subject: ${subject.name}, Grade: ${subject.grade}, Value: ${gradeValue}, Hours: ${subject.hours}`);
      
      // Only add to totals if we have a valid grade value
      if (typeof gradeValue === 'number') {
        totalPoints += gradeValue * subject.hours;
        totalHours += subject.hours;
      }
    });

    console.log(`Total Points: ${totalPoints}, Total Hours: ${totalHours}`);
    const calculatedCGPA = totalHours > 0 ? totalPoints / totalHours : 0;
    console.log(`Calculated CGPA: ${calculatedCGPA}`);
    setCGPA(calculatedCGPA);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Your Subjects</h2>
          
          {/* Add New Subject Form */}
          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter subject name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade
                </label>
                <select
                  value={newSubject.grade}
                  onChange={(e) => setNewSubject({ ...newSubject, grade: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {GRADES.map(grade => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credit Hours
                </label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={newSubject.hours}
                  onChange={(e) => setNewSubject({ ...newSubject, hours: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddSubject}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Subject
              </button>
            </div>
          </div>

          {/* Subjects List */}
          <div className="space-y-4 mb-8">
            {subjects.map(subject => (
              <div key={subject.id} className="bg-gray-50 p-4 rounded-lg flex items-center gap-4">
                <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) => handleUpdateSubject(subject.id, 'name', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <select
                      value={subject.grade}
                      onChange={(e) => handleUpdateSubject(subject.id, 'grade', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {GRADES.map(grade => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={subject.hours}
                      onChange={(e) => handleUpdateSubject(subject.id, 'hours', parseInt(e.target.value))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteSubject(subject.id)}
                  className="p-2 text-red-600 hover:text-red-700 focus:outline-none"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Calculate CGPA Button and Result */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={calculateCGPA}
              disabled={subjects.length === 0}
              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate CGPA
            </button>
            
            {cgpa !== null && (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800">Your CGPA</h3>
                <p className="text-3xl font-bold text-indigo-600">
                  {cgpa.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}