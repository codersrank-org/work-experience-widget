# Codersrank Work Experience Widget

<!-- DOCS_START -->

Codersrank Work Experience Widget is a web component that allows you easily integrate work experience information from your [CodersRank](https://codersrank.io) profile to your personal website:

<img src="preview.png" />

## Install from NPM

Widget script available through NPM:

```
npm i @codersrank/work-experience --save
```

After installation you need to import and register web component:

```js
import CodersrankWorkExperience from '@codersrank/work-experience';

// register web component as <codersrank-work-experience> element
window.customElements.define('codersrank-work-experience', CodersrankWorkExperience);
```

## Install from CDN

Widget can also be downloaded or linked directly from CDN:

```html
<!-- replace x.x.x with actual version -->
<script src="https://unpkg.com/@codersrank/work-experience@x.x.x/codersrank-work-experience.min.js"></script>
```

In this case it is not required to register web component, it is already registered as `<codersrank-work-experience>` element.

## Usage

As it is a web component the usage is pretty simple, just add widget HTML tag with your [CodersRank](https://codersrank.io) username

```html
<codersrank-work-experience username="YOUR_USERNAME"></codersrank-work-experience>
```

## Widget Attributes

Widget supports following properties as HTML element attributes:

| Name        | Type      | Default | Description                                                                               |
| ----------- | --------- | ------- | ----------------------------------------------------------------------------------------- |
| `username`  | `string`  |         | Your [CodersRank](https://codersrank.io) username                                         |
| `logos`     | `boolean` | `false` | Enables company logos                                                                     |
| `max-items` | `number`  |         | Limit number of work experiences to display                                               |
| `grid`      | `boolean` | `false` | Enables grid layout. Number of columns is configurable with `--grid-columns` CSS variable |
| `branding`  | `boolean` | `true`  | Displays "Powered by CodersRank" link                                                     |

For example:

```html
<codersrank-work-experience username="YOUR_USERNAME" logos></codersrank-work-experience>
```

## Styling

It is possible to customize widget colors with CSS Custom Properties (CSS Variables) by setting them directly on the widget element with style attribute or in CSS.

There are following CSS Custom Properties are available:

| Property                       | Value                    |
| ------------------------------ | ------------------------ |
| `--preloader-color`            | `#72a0a8`                |
| `--item-spacing`               | `2em`                    |
| `--item-border-radius`         | `0px`                    |
| `--item-border`                | `none`                   |
| `--item-padding`               | `0px`                    |
| `--item-bg-color`              | `0px`                    |
| `--grid-columns`               | `1`                      |
| `--logo-size`                  | `48px`                   |
| `--logo-margin`                | `16px`                   |
| `--nested-circle-size`         | `12px`                   |
| `--nested-circle-border-width` | `2px`                    |
| `--nested-circle-opacity`      | `0.25`                   |
| `--nested-line-opacity`        | `0.25`                   |
| `--nested-line-width`          | `2px`                    |
| `--company-font-size`          | `1.15em`                 |
| `--company-font-weight`        | `bold`                   |
| `--company-text-color`         | `inherit`                |
| `--company-opacity`            | `1`                      |
| `--title-font-size`            | `inherit`                |
| `--title-font-weight`          | `bold`                   |
| `--title-text-color`           | `inherit`                |
| `--title-opacity`              | `1`                      |
| `--location-text-color`        | `inherit`                |
| `--location-opacity`           | `0.55`                   |
| `--location-font-size`         | `inherit`                |
| `--location-font-weight`       | `inherit`                |
| `--date-text-color`            | `inherit`                |
| `--date-opacity`               | `0.55`                   |
| `--date-font-size`             | `inherit`                |
| `--date-font-weight`           | `inherit`                |
| `--description-font-size`      | `inherit`                |
| `--description-font-weight`    | `inherit`                |
| `--description-text-color`     | `inherit`                |
| `--description-opacity`        | `1`                      |
| `--tag-border`                 | `none`                   |
| `--tag-star-color`             | `#ff9900`                |
| `--tag-bg-color`               | `rgba(0, 0, 100, 0.075)` |
| `--tag-font-size`              | `0.85em`                 |
| `--tag-font-weight`            | `bold`                   |
| `--tag-padding`                | `0.35em 0.57em`          |
| `--tag-margin`                 | `0.28em`                 |
| `--tag-border-radius`          | `4px`                    |
| `--tag-text-color`             | `inherit`                |
| `--branding-text-color`        | `inherit`                |

For example, to change work experience title color to `purple` and font-size to `20px`, add this to CSS stylesheet:

```css
codersrank-work-experience {
  --title-text-color: purple;
  --title-font-size: 20px;
}
```

## Use As Image

It is also possible to insert Work Experience widget as an image. It is useful in places where you can't integrate web component, or for example on your GitHub profile README.md page.

Image URL is the following:

```
https://cr-ss-service.azurewebsites.net/api/ScreenShot?widget=work-experience&username=YOUR_USERNAME
```

It accepts all widget attributes as query string parameters, plus one extra parameter:

| Name    | Type     | Default | Description                                                                                                                                                                     |
| ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `width` | `number` | `800`   | Width of widget element (generated image). Note that generated image has @2x pixel density, so the PNG image will be actually generated in @2x size from the one specified here |
| `style` | `string` |         | `style` attribute value (here you can specify all CSS variables)                                                                                                                |

For example:

```html
<img
  src="https://cr-ss-service.azurewebsites.net/api/ScreenShot?widget=education&username=YOUR_USERNAME&max-items=2&logos=true&style=--item-bg-color:%23f00;--item-border-radius:10px"
/>
```

Note that you need to URL Encode some of the characters, for example `#` should be `%23` and `#ff0` color should be specified as `%23ff0` in query.

## Contribution

Yes please! See the [contributing guidelines](https://github.com/codersrank-org/work-experience-widget/blob/master/CONTRIBUTING.md) for details.

## Licence

This project is licensed under the terms of the [MIT license](https://github.com/codersrank-org/work-experience-widget/blob/master/LICENSE).
