<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { computed } from 'vue';
import { Home, User, Book, Star, Airplay } from 'lucide-vue-next';
import { useRoute, useRouter } from 'vue-router';

const LucideIcons = { Home, User, Book, Star, Airplay };

export default {
  components: LucideIcons,
  setup() {
    const router = useRouter();
    const routes = computed(() => {
      const routeList = [];
      router.options.routes.forEach(route => {
        if (route.name && route.name !== 'home' && LucideIcons[route.meta.icon]) {
          routeList.push({
            name: route.name,
            path: route.path,
            meta: { icon: route.meta.icon }
          });
        }
      });

      return routeList;
    });

    return {
      routes
    };
  }
};
</script>

<style>
#app {
  display: flex;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.nav-link {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #fff;
  text-decoration: none;
}

.nav-link span {
  margin-left: 10px;
}
</style>