<template>
  <router-view/>
</template>

<style>
@font-face {
  font-family: 'Programme';
  src: local('Programme Regular'), local('Programme-Regular'),
  url('@/assets/fonts/Programme-Regular.woff2') format('woff2'),
  url('@/assets/fonts/Programme-Regular.woff') format('woff'),
  url('@/assets/fonts/Programme-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

:root {
  box-sizing: border-box;
  --font-family: Programme, Arial, sans-serif;
  --font-feature-settings: "ss07", "ss08", "ss11", "ss12", "ss14", "ss15", "ss16", "ss18", "ss19", "ss20", "ss21";
  font-family: var(--font-family);
  font-feature-settings: var(--font-feature-settings);
  font-size: 1.2rem;

  --corner: 60;

  --lemon: hsl(60, 100%, 70%);
  --dark: hsl(0, 0%, 13%);
  --white: hsl(0, 0%, 100%);

  color: var(--dark);
}

*,
:before,
:after {
  padding: 0;
  border: none;
  margin: 0;
  outline: none;
  background: none;
  box-sizing: inherit;
}
</style>
