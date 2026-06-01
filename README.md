# 💧 喝水 App

帮助你定时补水的健康工具 App。核心亮点是一个**沙漠逐渐变成热带雨林的动态场景动画**，直观反映今日喝水进度。

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.85-blue?logo=react" />
  <img src="https://img.shields.io/badge/Expo-SDK%2056-black?logo=expo" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Platform-Android-green?logo=android" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" />
</p>

---

## ✨ 功能特性

| 功能 | 描述 |
|------|------|
| 🏜️→🌴 场景动画 | 7个阶段：沙漠 → 绿洲 → 稀树草原 → 森林 → 热带雨林 |
| 💧 一键喝水 | 水波纹点击特效，鼓励文案弹窗 |
| 📊 数据统计 | 今日完成率、本周平均、连续达标天数、柱状图 |
| 🔔 定时提醒 | 自定义间隔、勿扰时段、30条随机提醒文案 |
| ⚙️ 个性化设置 | 目标杯数、每杯水量、提醒开关 |
| 💾 本地存储 | 关闭重开数据保留，次日自动重置 |
| 🎨 动态细节 | 云朵飘动、草木摇摆、飞鸟蝴蝶、阳光光柱 |

---

## 📱 场景阶段

| 进度 | 阶段 | 场景 |
|------|------|------|
| 0% | 沙漠 | 烈日、龟裂土地、仙人掌 |
| 0~25% | 荒漠化缓解 | 淡蓝天空、零星枯草 |
| 25~40% | 绿洲初现 | 小水坑、草丛、灌木 |
| 40~55% | 稀树草原 | 小树、细溪流、白云 |
| 55~70% | 郁郁葱葱 | 中等树木、宽溪流、飞鸟 |
| 70~100% | 森林边缘 | 密集树木、小瀑布、蝴蝶 |
| 100% | 热带雨林 | 大瀑布、阳光光柱、满屏绿意 |

---

## 🛠️ 技术栈

- **框架**：React Native + Expo SDK 56
- **路由**：expo-router（文件路由）
- **语言**：TypeScript（严格模式）
- **动画**：react-native-svg
- **存储**：@react-native-async-storage/async-storage
- **图表**：react-native-chart-kit
- **通知**：expo-notifications

---

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn
- Android 手机（安装 Expo Go）

### 安装运行

```bash
# 克隆仓库
git clone https://github.com/sunshineboy007/drinkwater.git
cd drinkwater

# 安装依赖
npm install

# 启动开发服务器
npx expo start
```

手机打开 Expo Go 扫描二维码即可运行。

### 打包 APK

```bash
# 安装 EAS CLI
npm install -g eas-cli

# 登录 Expo
eas login

# 构建 APK
eas build --platform android --profile preview
```

---

## 📁 项目结构

```
drinkwater/
├── app/                          # 页面路由
│   ├── _layout.tsx               # 根布局
│   └── (tabs)/
│       ├── _layout.tsx           # 底部Tab导航
│       ├── index.tsx             # 主页（场景+喝水按钮）
│       ├── stats.tsx             # 统计页
│       └── settings.tsx          # 设置页
├── components/
│   ├── DrinkingSceneAnimation.tsx # 场景动画主组件
│   ├── scene/
│   │   ├── Sky.tsx               # 天空图层
│   │   ├── Ground.tsx            # 地面图层
│   │   ├── Water.tsx             # 水体图层
│   │   ├── Vegetation.tsx        # 植被图层
│   │   └── Effects.tsx           # 特效图层
│   ├── WaterButton.tsx           # 喝水按钮
│   ├── ProgressText.tsx          # 进度显示
│   └── ToastMessage.tsx          # 鼓励弹窗
├── hooks/                        # 自定义Hooks
│   ├── useDrinkingData.ts        # 喝水数据管理
│   ├── useNotifications.ts       # 通知管理
│   └── useSceneAnimation.ts      # 动画管理
├── utils/                        # 工具函数
│   ├── storage.ts                # AsyncStorage封装
│   ├── notifications.ts          # 通知调度
│   ├── dateUtils.ts              # 日期处理
│   └── quotes.ts                 # 文案库
├── constants/theme.ts            # 主题常量
└── types/index.ts                # 类型定义
```

---

## 🎨 主题色

| 用途 | 颜色 | 预览 |
|------|------|------|
| 主色 | `#4A90D9` | ![#4A90D9](https://via.placeholder.com/16/4A90D9/4A90D9.png) |
| 背景 | `#E8F4FD` | ![#E8F4FD](https://via.placeholder.com/16/E8F4FD/E8F4FD.png) |
| 点缀 | `#52C4E8` | ![#52C4E8](https://via.placeholder.com/16/52C4E8/52C4E8.png) |
| 文字主色 | `#1A1A2E` | ![#1A1A2E](https://via.placeholder.com/16/1A1A2E/1A1A2E.png) |
| 文字副色 | `#6B7280` | ![#6B7280](https://via.placeholder.com/16/6B7280/6B7280.png) |

---

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源。

---

<p align="center">
  💧 每一杯水都算数，保持喝水，健康生活！
</p>
