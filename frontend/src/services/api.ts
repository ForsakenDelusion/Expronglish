import axios from 'axios';
import { Exercise, EvaluationResult } from '../types/exercise';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  async generateExercise(type: string): Promise<Exercise> {
    const response = await axios.get(`${API_BASE_URL}/exercises/generate`, {
      params: { exercise_type: type }
    });
    console.log('Generated exercise response:', response.data); // 打印返回的数据
    return response.data;
  },

  async evaluateResponse(
    userResponse: string,
    exerciseType: string,
    scenario: string
  ): Promise<EvaluationResult> {
    const response = await axios.post(`${API_BASE_URL}/exercises/evaluate`, {
      user_response: userResponse,
      exercise_type: exerciseType,
      scenario: scenario
    });
    console.log('Evaluation response:', response.data); // 打印返回的数据
    return response.data;
  }
}; 