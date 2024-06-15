import torch
from torchvision.transforms import Compose, Resize, ToTensor,Normalize
from models import Efficientnet,VIT
import os
from PIL import Image

def load_Efficientnet_model(model_path,type_num):
    device = 'cpu'
    print(f"模型开始加载")

    model = Efficientnet.build_efficientnet_b7(type_num).to(device)
    checkpoint = torch.load(model_path, map_location=torch.device('cpu'))
    model.load_state_dict(checkpoint)
    model.eval()
    return model

def efficientnet_test_transform(image_path):
    image = Image.open(image_path)
    # 获取图像的宽度和高度
    width, height = image.size
    # 计算最大边的大小
    max_side = max(width, height)
    # 压缩为更小的正方形大小
    new_size = 600  
    # 定义转换
    transform = Compose([
        Resize((max_side, max_side)),
        Resize((new_size, new_size)),
        ToTensor(),
    ])
    # 应用转换
    return transform(image)

def load_VIT_model(model_path,type_num):
    device = 'cpu'
    print(f"模型开始加载")

    model = VIT.build_vit_model(type_num).to(device)
    checkpoint = torch.load(model_path, map_location=torch.device('cpu'))
    model.load_state_dict(checkpoint)
    model.eval()
    return model

def vit_test_transform(image_path):
    image = Image.open(image_path)
    # 获取图像的宽度和高度
    width, height = image.size
    # 计算最大边的大小
    max_side = max(width, height)
    # 压缩为更小的正方形大小
    new_size = 224  # 直接调整到 224x224
    # 定义转换
    transform = Compose([
        Resize((max_side, max_side)),
        Resize((new_size, new_size)),
        ToTensor(),
        Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5]),  # 标准化
    ])
    # 应用转换
    return transform(image)