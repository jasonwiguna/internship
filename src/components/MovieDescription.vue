<template>
  <container>
    <md-card>
      <md-card-header>
        <header class="md-title">Movie Description</header>
      </md-card-header>
    </md-card>

    <div>
      <md-card>
        <md-card-media>
          <img
            v-on:click="viewDetails(item.id)"
            :src="'https://image.tmdb.org/t/p/w500'+description.backdrop_path"
          >
        </md-card-media>
        <md-card-content>
          <p>Title: {{description.original_title}}</p>
          <p>Release Year: {{description.release_date}}</p>
          <p>Description: {{description.overview}}</p>
        </md-card-content>
      </md-card>
    </div>

    <md-card>
      <md-card-header>
        <header class="md-title">Related Movies:</header>
      </md-card-header>
      <containerMovie>
        <div1 v-for="(items, $index) in filteredItems()" :key="$index">
          <th v-for="(item, $index) in items" :key="$index" v-on:click="viewDetails(item.id)">
            <md-card>
              <md-card-media>
                <img :src="'https://image.tmdb.org/t/p/w500'+item.backdrop_path" alt="People">
              </md-card-media>
              <md-card-content>
                <div class="md-title">{{item.original_title}}</div>
              </md-card-content>
            </md-card>
          </th>
        </div1>
      </containerMovie>
    </md-card>
    <infinite-loading slot="append" @infinite="infiniteHandler"></infinite-loading>
    <router-view/>
  </container>
</template>

<script src="https://unpkg.com/vue-infinite-loading@^2/dist/vue-infinite-loading.js"></script>
<script>
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";

const api = "http://localhost:3000/";

export default {
  name: "description",
  data() {
    return {
      page: 1,
      description: [],
      list: [],
      infiniteId: +new Date()
    };
  },
  methods: {
    infiniteHandler($state) {
      axios
        .get(api + "description/" + this.$route.params.id + "/" + this.page)
        .then(({ data }) => {
          this.description = data.movies;
          if (data.similar.length) {
            this.page += 1;
            this.list.push(...data.similar);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
    changeType() {
      this.page = 1;
      this.list = [];
      this.infiniteId += 1;
    },
    viewDetails: function(id) {
      this.$router.push({ name: "description", params: { id: id } });
      this.$router.go();
    },
    filteredItems() {
      const self = this;
      const total = this.list.length;
      let spread = [];
      let temp = [];
      let i = 0;
      while (i < total) {
        temp.push(self.list[i]);
        if (i % 2 == 0) {
          spread.push(temp);
        } else {
          temp = [];
        }
        i++;
      }
      return spread;
    }
  }
};
</script>

<style scoped>
container {
  display: flex;
  justify-content: stretch;
  flex-direction: column;
  margin-left: 20%;
  margin-right: 20%;
}
containerMovie {
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  justify-content: stretch;
  flex-direction: column;
}
header {
  font-size: 25px;
}
p {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  text-align: center;
}
mar {
  margin-left: 5%;
  margin-right: 5%;
  flex: 1;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
}
div1 {
  margin-top: 2%;
  cursor: pointer;
}
th {
  padding-left: 1%;
  padding-right: 1%;
  padding-top: 1%;
  padding-bottom: 1%;
}
th:hover {
  box-shadow: 20px 20px 40px 0px rgba(0, 0, 0, 0.5);
}
</style>