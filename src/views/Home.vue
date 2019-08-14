<template>
  <div>
    <div class="text-center hero">
      <img class="mb-3 app-logo" src="/logo.png" alt="Vue.js logo" width="120" />
      <h2 class="mb-4">Thematic Frontend Test Project</h2>
      <p>
        This is a sample application for calling Thematic Test data
      </p>
    </div>

    <hr />

    <div>
      <h2 class="my-5 text-center">Proof the backend works</h2>

    <div v-if="currentUserData">
      {{ currentUserData }}
    </div>
    <div v-else>
      Not yet logged in?
    </div>
    </div>
  </div>
</template>

<script>

import request from 'superagent';
import authConfig from "../../auth_config.json";

export default {
  name: "home",
  data() {
    return {
      currentUserData: null
    };
  },
  computed: {
  },
  methods: {
    buildRequest(endpoint) {
      return `${authConfig.apiBase}/${endpoint}`;
    },
    async handleLoginEvent(data) {
      if( !data.loggedIn ) {
        this.currentUserData = null;
      }
      else {
        const url = this.buildRequest('current-user');
        const accessToken = await this.$auth.getAccessToken();
        request.get(url)
          .set('Authorization', `Bearer ${accessToken}`)
          .end((err, res) => {
            this.currentUserData = res.text;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.next-steps {
  .fa-link {
    margin-right: 5px;
  }
}
</style>
