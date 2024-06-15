import torch
import torch.nn as nn
import torchvision.models as models
from torchvision.models import EfficientNet_B7_Weights


class PreConv(nn.Module):
    def __init__(self, in_channels, out_channels):
        super(PreConv, self).__init__()
        self.conv = nn.Conv2d(
            in_channels=in_channels,
            out_channels=out_channels,
            kernel_size=3,  # 选择合适的核大小
            stride=1,       # 选择合适的步长
            padding=1,      # 通常设置为(kernel_size-1)/2，以保持输出尺寸不变
            bias=False
        )

    def forward(self, x):
        x = self.conv(x)
        return x
    
def print_model_io_layers(model):
    # 打印输入层的第一层和第二层
    print("First Layer of the Input Layer:")
    if isinstance(model.features[0], nn.Sequential):
        print(model.features[0][0])  # 第一层
        print("输入第一层权重尺寸:", model.features[0][0].weight.size())
        if len(model.features[0]) > 1:
            print("Second Layer of the Input Layer:")
            print(model.features[0][1])  # 第二层
            print("输入第二层权重尺寸:", model.features[0][1].weight.size())
        else:
            print("No second layer directly in sequence.")
    else:
        print(model.features[0])  # 如果不是序列，直接打印第一层
        print("输入第一层权重尺寸:", model.features[0].weight.size())

    # 打印输出层的最后一层
    print("Last Layer of the Output Layer:")
    if isinstance(model.classifier, nn.Sequential):
        print(model.classifier[-1])  # 访问最后一个元素
    else:
        print(model.classifier)  # 如果不是序列，直接打印

def build_efficientnet_b7(num_classes:int):
    # 创建EfficientNet-B7模型实例
    efficientnet_b7 = models.efficientnet_b7(weights=EfficientNet_B7_Weights.IMAGENET1K_V1)
    #print_model_io_layers(efficientnet_b7)

    # # 假设原始模型输入是3通道RGB图像
    # pre_conv = PreConv(3, 3)  # 新的卷积层输入输出均为3通道
    # # 创建一个新的nn.Sequential模块来组合新的卷积层和原始模型的第一层
    # new_features = nn.Sequential(pre_conv, efficientnet_b7.features)
    # # 替换原始模型的features部分
    # efficientnet_b7.features = new_features


    # 修改模型的分类器部分，即最后的全连接层
    efficientnet_b7.classifier = nn.Sequential(
        nn.Dropout(0.5),  # 保持与原有架构中的dropout相同，如果有的话
        nn.Linear(efficientnet_b7.classifier[1].in_features, num_classes)  # 更改输出特征数
    )

    # 打印模型结构，确认更改（默认EfficientNet-B7是600x600像素）
    # print(efficientnet_b7)
    #print_model_io_layers(efficientnet_b7)
    return efficientnet_b7
