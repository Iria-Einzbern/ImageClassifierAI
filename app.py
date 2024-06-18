# app.py

from flask import Flask
from blue_prints.upload import upload_bp, scheduler
from blue_prints.predict import predict_bp
from flask_cors import CORS

app = Flask(__name__)

CORS(app, supports_credentials=True)

# 设置密钥
app.secret_key = 'smartlab411'

# 初始化 APScheduler
scheduler.init_app(app)
scheduler.start()


# 注册上传蓝图到 /uploadAPI 路径下
app.register_blueprint(upload_bp, url_prefix='/uploadAPI')
# 注册预测蓝图到 /predictAPI 路径下
app.register_blueprint(predict_bp, url_prefix='/predictAPI')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555)
