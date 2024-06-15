import torch.nn as nn
import timm

def build_vit_model(num_classes: int):
    # 创建ViT模型实例
    vit_model = timm.create_model('vit_base_patch16_224', pretrained=True)
    print('ViT模型已加载')

    # 修改模型的分类器部分，即最后的全连接层
    vit_model.head = nn.Linear(vit_model.head.in_features, num_classes)

    # 打印模型结构，确认更改
    return vit_model

if __name__ == '__main__':
    model = build_vit_model(2)
