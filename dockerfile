FROM --platform=linux/amd64 python:3.10.8


# 设置工作目录
WORKDIR /app

# 复制./authority文件夹到容器内的/server文件夹内
#COPY ./authority /server

COPY . /app


RUN apt-get update && apt-get install -y libgl1-mesa-glx


# 安装所需的Python包
RUN pip install torch torchvision taipy

EXPOSE 8000

# 在容器启动时执行的命令
CMD ["python", "/app/main.py"]
