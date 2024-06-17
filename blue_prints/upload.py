# upload.py

from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
from flask_apscheduler import APScheduler
import time

upload_bp = Blueprint('upload', __name__)

# 临时上传文件存储路径
TEMP_UPLOAD_FOLDER = 'temp_uploads'
if not os.path.exists(TEMP_UPLOAD_FOLDER):
    os.makedirs(TEMP_UPLOAD_FOLDER)
# 允许的文件类型
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif','bmp'}
UPLOAD_CLEAN_INTERVAL = 3 * 60 * 60  # 3 hours in seconds


# 初始化 Flask-APScheduler
scheduler = APScheduler()

# 判断允许的文件类型
def allowed_file(filename):
    return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 配置定时清理临时文件的任务
@scheduler.task('interval', id='upload_clean_task', seconds=UPLOAD_CLEAN_INTERVAL)
def clean_old_files():
    now = time.time()
    for filename in os.listdir(TEMP_UPLOAD_FOLDER):
        filepath = os.path.join(TEMP_UPLOAD_FOLDER, filename)
        if os.path.isfile(filepath):
            file_created_time = os.path.getctime(filepath)
            if now - file_created_time > UPLOAD_CLEAN_INTERVAL:
                os.remove(filepath)
                print(f"Deleted old file: {filename}")

# 启动定时任务
scheduler.start()


@upload_bp.route('/upload', methods=['POST'])
def upload_file():
    #print(request.files)
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not allowed'}), 400
    
    #print(file.filename)

    # 获取上传文件的原始文件名
    original_filename = secure_filename(file.filename)

    # 构建保存文件的路径
    save_path = os.path.join(TEMP_UPLOAD_FOLDER, original_filename)

    # 保存文件到临时文件中
    file.save(save_path)

    # 返回成功响应
    return jsonify({'message': '上传成功', 'filename': file.filename}), 200
