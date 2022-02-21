
# Why did I choose Vue?
I'm more used to work with Vue or React rather than angular. Vue is also smaller and not as complex as Angular JS. It's also worth noting that Angular JS has discontinued long term support.

# Model
This is the model structure to for the SelectBox
```
[
{
  value: 'ST', text: 'Striker',
},
{
  value: 'CAM', text: 'Center attack midfield',
},
{
  value: 'CF', text: 'Center Forward'
}
]
```

The text is displayed by default (although you can change that) and the value represents the key of the object.

Depending if **multiple** is enabled your v-model variable may be an object or an Array containg the multiple selected options

# Props
These are the props of the SelectBox component:
| Prop     | Type      | Description     | Default |
| ------------- | ------------- | -------- | -------- |
| placeholder          | String         | Input placeholder  | 'Choose Item' |
| dataSource           | Array         | Model data source  |[] |
| search           | Boolean         | Whether filtering is enabled or not  |false |
| multiple           | Boolean         | Whether multiple choice is enabled or not  |false |
| width           | Number         | The input width in px |300 |

# Slots
These are the available slots which enables customization of the component

| Slot     | Type      | Description     | Default |
| ------------- | ------------- | -------- | -------- |
| header          | Scoped Slot         | Specify the input header/title (chosen option)  | Displays selected item text |
| item           | Scoped Slot         | Specify the item shown on the list  |Displays the item text |
| empty           | Slot         | Specify the message when data source is empty (or filtering returns 0 results)  |'Nothing was found' |
