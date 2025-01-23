from openai import OpenAI
from ..core.config import settings
import json

client = OpenAI(api_key=settings.DEEPSEEK_API_KEY, base_url="https://api.deepseek.com")

async def generate_exercise(exercise_type: str) -> dict:
    prompt = f"""
    生成一个{exercise_type}类型的英语练习场景，要求如下：
    - 场景描述应详细且具体，包含时间、地点和人物。
    - 提供至少三个具体的要求。
    - 参考答案应包含完整的句子结构和自然的表达。
    示例格式：
    {{
        "scenario": "场景描述（中文）",
        "requirements": ["要求1", "要求2", "要求3"],
        "reference_answer": "参考答案（英文）"
    }}
    """
    
    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are a helpful assistant"},
                {"role": "user", "content": prompt}
            ],
            stream=False
        )
        result = response.choices[0].message.content
        exercise_data = json.loads(result)  # 解析JSON字符串
        print("Generated exercise data:", exercise_data)  # 打印解析后的数据
        return exercise_data
    except Exception as e:
        print(f"Error during API call: {e}")
        raise

async def evaluate_response(user_input: str, exercise_type: str, scenario: str) -> dict:
    prompt = f"""
    评估以下英语回答。场景：{scenario}
    类型：{exercise_type}
    用户回答：{user_input}
    
    请根据以下标准进行评估：
    - 表达准确性：检查语法、拼写和标点符号。
    - 语言地道性：评估用词和表达是否自然。
    - 内容完整性：回答是否涵盖所有要求。
    
    请特别注意用户是否满足以下具体要求：
    - 询问Tom今天早上的跑步情况
    - 告诉Tom你今天的计划
    - 邀请Tom晚上一起看电影
    
    请提供以下格式的JSON评估：
    {{
        "suggestions": [
            "指出具体的语法错误和改进建议",
            "提供更自然的表达方式",
            "指出未满足的具体要求"
        ],
        "improved_version": "改进后的版本"
    }}
    """
    
    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "You are a helpful assistant"},
                {"role": "user", "content": prompt}
            ],
            stream=False
        )
        result = response.choices[0].message.content
        print("Raw evaluation response:", result)  # 打印原始响应

        # 去掉不必要的包裹符号
        if result.startswith("```json"):
            result = result[7:-3].strip()

        evaluation_data = json.loads(result)  # 解析JSON字符串
        print("Evaluation data:", evaluation_data)  # 打印解析后的数据
        return evaluation_data
    except Exception as e:
        print(f"Error during API call: {e}")
        raise 