<script>
import HomeVue from "./components/Home.vue";
import './assets/style/main_table.css'

export default {
  name: 'App',
  components: {
    HomeVue: HomeVue
  },
};

</script>

<template>
<body class="dark:bg-gray-800">
  <nav class="flex items-center bg-gray-500 roun">
    <div class="justify-center ml-5 my-5 w-10">
      <img alt="Vue logo" src="./assets/logo.png" />
    </div>
  <h1 class="text-3xl text-yellow-500 font-bold ">ryptoWatcher</h1>
  </nav>
  <router-view/>
</body>
</template>