import requests
import time

# 记录开始时间
start_time = time.time()

url = 'http://localhost:5555/predict'
data = {
    'image_path': '/Users/ame/Documents/Python/Taipy/6_0.jpg',
    'model_type': '气道',
    'explain': False
}

response = requests.post(url, json=data)

# 记录结束时间
end_time = time.time()
# 计算请求所花的时间
elapsed_time = end_time - start_time


print(response.json())
print(f"耗时 {elapsed_time:.4f} 秒.")