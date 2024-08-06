import React from 'react';
import { Element } from 'react-scroll';

const QuizzesTable = ({ quizzes, onDelete, viewType }) => {
  let defaultMessage = '';

  switch (viewType) {
    case 'batch':
      defaultMessage = 'No quizzes scheduled for the selected batch.';
      break;
    case 'user':
      defaultMessage = 'You have not scheduled any quizzes yet.';
      break;
    default:
      defaultMessage = 'No quizzes scheduled for the selected batch.';
      break;
  }

  return (
    <div className="w-full mt-8">
      {quizzes.length > 0 ? (
        <div className="w-full mt-4 bg-white shadow-md overflow-hidden">
          <Element name="quizzesContainer" className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-800 text-white">
                <tr>
                  {onDelete && <th className="py-3 px-4 text-center">Batch</th>}
                  <th className="py-3 px-4 text-center">Course</th>
                  <th className="py-3 px-4 text-center">Date</th>
                  <th className="py-3 px-4 text-center">Start Time</th>
                  <th className="py-3 px-4 text-center">End Time</th>
                  <th className="py-3 px-4 text-center">Location</th>
                  {onDelete && <th className="py-3 px-4 text-center">Delete</th>}
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr key={quiz._id} className="border-b">
                    {onDelete && <td className="py-3 px-4 text-center">{quiz.batch}</td>}
                    <td className="py-3 px-4 text-center">{quiz.course}</td>
                    <td className="py-3 px-4 text-center">{new Date(quiz.startTime).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-center">{new Date(quiz.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="py-3 px-4 text-center">{new Date(quiz.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="py-3 px-4 text-center">{quiz.location}</td>
                    {onDelete && (
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onDelete(quiz._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </Element>
        </div>
      ) : (
        <p className="text-center text-gray-900 mt-24 font-semibold">{defaultMessage}</p>
      )}
    </div>
  );
};

export default QuizzesTable;
