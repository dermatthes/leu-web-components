# leu-web-components
Webcomponents for websites




## Build-In Elements

### `leu-elem`

```
<select is="leu-elem" data-leu-options="{key1: 'Key 1', key2: "Key 2"}"></select>
```


### `leu-data`

```html
<script is="leu-data" id="data1">
    ["a", "b", "c"]
</script>
<script async>
    let data = await document.getElementById("data1").data;
</script>

```
