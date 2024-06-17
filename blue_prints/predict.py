# predict.py

from flask import Blueprint, request, jsonify
import threading
from predicts import *
from utils import *

predict_bp = Blueprint('predict', __name__)

# 定义一个全局的锁
predict_lock = threading.Lock()

def predict_image(image_path: str, model_type: str, explain=False) -> str:
    with predict_lock:  # 在这个上下文中加锁
        if explain:
            return Efficientnet_b7_predict_spore_with_gam(image_path)
        else:
            if model_type == '孢子与真菌':
                result = format_data(Efficientnet_b7_predict_spore(image_path))
            elif model_type == '气道':
                result = format_data(VIT_predict_trachea(image_path))
            else:
                return '未知模型'
            return result

@predict_bp.route('/api/predict', methods=['POST'])
def predict():
    try:
        # 获取请求数据
        data = request.json
        image_path = [data.get('image_path')]
        model_type = data.get('model_type')
        explain = data.get('explain', False)

        print(data)

        # 检查必填参数
        if not image_path or not model_type:
            return jsonify({'error': '参数缺失'}), 400

        # 调用预测函数
        result = predict_image(image_path, model_type, explain)

        # 返回结果
        return jsonify({'result': result})

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
