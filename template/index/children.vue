<template>
  <div>
    <app-title head-title="find_flighs"></app-title>
    <ul class="airlineList-style" v-show="showAirlineList">
            <li
              v-for="airlines in airlineList"
              v-on:click=""
            >
          </li>
    </ul>
  </div>
</template>

<script>
// 公共模块
import appTitle from 'src/components/app-title/appTitle';
import * as dataService from 'src/pages/travel-service/common/api';

export default {
  components: {
    appTitle,
  },
  data() {
    return {
      msg: '',
      airlineList: airlineList
    };
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
  @import '../../../styles/mixin';
</style>
