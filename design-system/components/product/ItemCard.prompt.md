The signature CampusFinder list row: thumbnail, name with a Lost/Found badge, description preview, location and time. A left accent stripe and the badge both reflect the item type (orange = Lost, teal = Found). Items posted within the hour show a "NEW" flag.

```jsx
<ItemCard
  item={{ name: 'Blue Backpack', type: 'Found', location: 'Library, 3rd Floor',
          time: '2 hours ago', reporterName: 'Sarah J.', isNew: true,
          description: 'Blue Jansport with a laptop sleeve' }}
  onPress={() => navigate('ItemDetails')}
/>
```
