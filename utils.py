import os
import numpy as np
import matplotlib.pyplot as plt
import cv2
from pytorch_grad_cam import GradCAM
import torch
from PIL import Image
import tempfile

def format_data(input_data):
    # 初始化一个空的字典来存储格式化后的数据
    formatted_data = {}
    
    # 遍历输入数据的每一项，假设输入数据的每个字典的键都是目标格式中需要的键
    for item in input_data:
        for key, value in item.items():
            # 如果键尚未在格式化后的数据字典中，则添加该键并初始化一个列表
            if key not in formatted_data:
                formatted_data[key] = []
            
            # 将当前项的值添加到相应键的列表中
            formatted_data[key].append(value)
    
    
    return formatted_data
def extract_file_names(paths_list):
    """
    Extracts the file names from a list of file paths.

    Args:
        paths_list (list[str]): A list of file paths.

    Returns:
        list[str]: A new list containing only the extracted file names.
    """
    # 使用列表推导式遍历路径列表，对每个路径使用os.path.basename提取文件名
    return [os.path.basename(path) for path in paths_list]

class GradCAM:
    def __init__(self, model, target_layer,proportion=None):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        self.proportion=proportion
        self._register_hooks()

    def _register_hooks(self):
        def forward_hook(module, input, output):
            self.activations = output

        def backward_hook(module, grad_in, grad_out):
            self.gradients = grad_out[0]

        self.target_layer.register_forward_hook(forward_hook)
        self.target_layer.register_full_backward_hook(backward_hook)

    def generate_cam(self, input_image, target_class=None):
        self.model.eval()
        output = self.model(input_image)

        if target_class is None:
            target_class = output.argmax(dim=1).item()
            print(f"预测类型: {target_class}")

        self.model.zero_grad()
        class_loss = output[0, target_class]
        class_loss.backward()

        gradients = self.gradients.cpu().data.numpy()[0]
        activations = self.activations.cpu().data.numpy()[0]
        weights = np.mean(gradients, axis=(1, 2))
        cam = np.zeros(activations.shape[1:], dtype=np.float32)

        for i, w in enumerate(weights):
            cam += w * activations[i]

        cam = np.maximum(cam, 0)
        cam = cv2.resize(cam, (input_image.shape[2], input_image.shape[3]))
        # 反转颜色映射
        cam = 1 - cam
        cam = cam - np.min(cam)
        cam = cam / np.max(cam)
        return [cam,target_class]

    def visualize(self, input_image, cam, alpha=0.5, save=False):
        input_image = input_image.cpu().data.numpy()[0].transpose((1, 2, 0))
        input_image = (input_image - np.min(input_image)) / (np.max(input_image) - np.min(input_image))
        heatmap = cv2.applyColorMap(np.uint8(255 * cam), cv2.COLORMAP_JET)
        heatmap = np.float32(heatmap) / 255
        superimposed_img = heatmap * alpha + np.float32(input_image)
        superimposed_img = superimposed_img / np.max(superimposed_img)
        
        if save:
            if self.proportion is not None:
                height, width, _ = superimposed_img.shape
                new_width = int(height * self.proportion)
                new_height = height
                if width / height < self.proportion:
                    new_width = int(height * self.proportion)
                else:
                    # 否则，需要增大高度
                    new_height = int(width / self.proportion)
                superimposed_img = cv2.resize(superimposed_img, (new_width, new_height))
            # 创建一个临时文件并保存图像
            temp_dir = tempfile.gettempdir()
            _, temp_path = tempfile.mkstemp(suffix=".png", dir=temp_dir)
            plt.imsave(temp_path, superimposed_img)
            return temp_path
        else:
            # 如果save参数为False，则显示图像
            plt.imshow(superimposed_img)
            plt.axis('off')
            plt.show()
            return None