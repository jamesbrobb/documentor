```html

<div class="container" responsiveContainer></div>

```

```css
.container {
  --XS: 200px;
  --SM: 400px;
  --MD: 600px;
  --LG: 800px;
  --XL: 1000px;
  --XXL: 1200px;

  --responsive-example-background-color: #f06292;

  display: block;
  width: 100%;
  height: 100%;
  background-color: var(--responsive-example-background-color);
}

.container.XS {
  --responsive-example-background-color: #ec407a;
}

.container.SM {
  --responsive-example-background-color: #e91e63;
}

.container.MD {
  --responsive-example-background-color: #d81b60;
}

.container.LG {
  --responsive-example-background-color: #c2185b;
}

.container.XL {
  --responsive-example-background-color: #ad1457;
}

.container.XXL {
  --responsive-example-background-color: #880e4f;
}

```
