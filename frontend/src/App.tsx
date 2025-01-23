import React, { useState } from 'react';
import { Exercise, EvaluationResult, ExerciseType } from './types/exercise';
import { api } from './services/api';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { Container, Card, Button, Input } from './components/Layout';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  const [exerciseType, setExerciseType] = useState<ExerciseType>('daily');
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [userResponse, setUserResponse] = useState('');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateExercise = async () => {
    setLoading(true);
    setError(null);
    try {
      const newExercise = await api.generateExercise(exerciseType);
      console.log('Generated exercise:', newExercise); // 打印返回的数据
      if (newExercise && newExercise.scenario && Array.isArray(newExercise.requirements)) {
        setExercise(newExercise);
      } else {
        console.error('Invalid exercise format:', newExercise);
        setError('生成的练习格式无效。');
      }
      setUserResponse('');
      setEvaluation(null);
    } catch (error) {
      console.error('Error generating exercise:', error);
      setError('生成练习时出错，请稍后重试。');
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!exercise) return;
    
    setLoading(true);
    try {
      const result = await api.evaluateResponse(
        userResponse,
        exerciseType,
        exercise.scenario
      );
      setEvaluation(result);
    } catch (error) {
      console.error('Error evaluating response:', error);
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Card>
          {error && <div className="error-message">{error}</div>}
          {loading && <div className="loading-indicator">加载中...</div>}
          <div className="mb-4">
            <select
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value as ExerciseType)}
              className="border p-2 rounded mr-2"
            >
              <option value="daily">日常对话</option>
              <option value="formal">正式写作</option>
              <option value="academic">学术写作</option>
              <option value="tourism">旅游对话</option>
              <option value="business">商务交流</option>
              <option value="entertainment">休闲娱乐</option>
            </select>
            <Button
              onClick={generateExercise}
              disabled={loading}
            >
              生成练习
            </Button>
          </div>
          {exercise && (
            <div className="mt-4">
              <h3 className="font-bold">场景描述:</h3>
              <p>{exercise.scenario}</p>
              <h4 className="font-bold">要求:</h4>
              <ul>
                {exercise.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
              {/* 隐藏参考答案 */}
              {evaluation && (
                <>
                  <h4 className="font-bold">参考答案:</h4>
                  <p>{exercise.reference_answer}</p>
                </>
              )}
            </div>
          )}
          {exercise && (
            <div className="mt-4">
              <textarea
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="输入你的回答..."
              />
              <Button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                disabled={loading}
              >
                提交回答
              </Button>
            </div>
          )}
          {evaluation && (
            <div className="mt-4">
              <h3 className="font-bold">改进建议:</h3>
              <ul>
                {evaluation.suggestions && evaluation.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
              <h4 className="font-bold">改进后的版本:</h4>
              <p>{evaluation.improved_version}</p>
            </div>
          )}
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;