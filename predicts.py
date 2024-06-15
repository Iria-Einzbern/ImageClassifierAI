from models import modelTools
import torch
import torch.nn.functional as F
from PIL import Image
from utils import GradCAM

def Efficientnet_b7_predict_spore(image_paths):
    # 定义标签列表
    labels = extract_labels_from_txt("classificationTables/孢子真菌EFB7.txt")
    model = modelTools.load_Efficientnet_model('model_save/Efficientnet_b7_孢子与真菌.pth',3)
    input_tensors = [modelTools.efficientnet_test_transform(image_path).to('cpu') for image_path in image_paths]
    with torch.no_grad():
        # 批量预测
        outputs = model(torch.stack(input_tensors))
        # 计算 softmax 以获取概率分布
        outputs = F.softmax(outputs, dim=1).tolist()

        # 将概率转换为百分比，并转换为字符串
        outputs = [[f"{round(prob * 100, 2)}%" for prob in probs] for probs in outputs]

    # 对每个样本的预测结果进行格式化
    formatted_results = [format_result(output, labels) for output in outputs]
    
    return formatted_results

def VIT_predict_trachea(image_paths):
    # 定义标签列表
    labels = extract_labels_from_txt("classificationTables/气道VIT.txt")
    model = modelTools.load_VIT_model('model_save/VIT_气道.pth',2)
    input_tensors = [modelTools.vit_test_transform(image_path).to('cpu') for image_path in image_paths]
    with torch.no_grad():
        # 批量预测
        outputs = model(torch.stack(input_tensors))
        # 计算 softmax 以获取概率分布
        outputs = F.softmax(outputs, dim=1).tolist()

        # 将概率转换为百分比，并转换为字符串
        outputs = [[f"{round(prob * 100, 2)}%" for prob in probs] for probs in outputs]

    # 对每个样本的预测结果进行格式化
    formatted_results = [format_result(output, labels) for output in outputs]
    
    return formatted_results


def Efficientnet_b7_predict_spore_with_gam(image_path):
    model = modelTools.load_Efficientnet_model('model_save/Efficientnet_b7_孢子与真菌.pth',3)
    model.eval()
    img_tensor = modelTools.efficientnet_test_transform(image_path[0])
    img = Image.open(image_path[0])
    input_tensor = img_tensor.unsqueeze(0).to('cpu')
    # 创建Grad-CAM对象
    target_layer = model.features[-1]
    grad_cam = GradCAM(model, target_layer,img.size[0]/img.size[1])
    img.close()
    cam = grad_cam.generate_cam(input_tensor)
    output_path = grad_cam.visualize(input_tensor, cam[0], alpha=0.4, save=True)
    return [output_path,cam[1]]
    



def format_result(result, labels):
    """
    格式化单个样本的预测结果为字典。
    """
    prediction_dict = {}
    for i, label in enumerate(labels):
        prediction_dict[label] = result[i]  # 直接使用result的值，因为我们已经转为列表了
    
    return prediction_dict

def extract_labels_from_txt(file_path):
    """
    从TXT文件中提取标签并返回一个包含标签的列表。

    参数:
    file_path (str): TXT文件的路径。

    返回:
    labels (list): 包含所有标签的列表。
    """
    labels = []
    with open(file_path, 'r') as file:
        for line in file:
            # 假设每行都是 "索引-标签" 的格式，我们只关心标签部分
            label = line.split('-')[1].strip()  # 使用split分割并去掉前后空格
            labels.append(label)
    return labels

        
if __name__ == '__main__':
    print(VIT_predict_trachea(['/Users/ame/Documents/Python/Taipy/5_1.jpg']))