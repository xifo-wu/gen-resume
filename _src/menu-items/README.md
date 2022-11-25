# 菜单组件

## 数据结构

```jsx

const menu = [
  {
    id: 'id-1',
    title: 'Menu 1',
    type: 'group',
    // caption: 'Pages Caption', // 二级标题
    children: [
      {
        id: 'id-1-1',
        title: 'Menu 1-1',
        icon: '', // ICON 组件
        type: 'item',
        url: '', // http 或 mailto 开头，跳转站外
        // target: true,
      }
    ]
  }
]

```