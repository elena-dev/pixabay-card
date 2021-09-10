<template>
  <div>
    <text-input v-model="query" @text-input="searchPhoto" @sort="sort">
    </text-input>
    <div class="container-body">
      <photo-card :listCards="sortedCards"/>
    </div>
  </div>
</template>

<script>
import PhotoCard from './components/PhotoCard.vue'
import TextInput from './components/TextInput.vue'
import debounce from 'lodash.debounce';

import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    PhotoCard,
    TextInput
  },
  data() {
    return {
      query: 'cats',
      sortBy: 'likes',
      sortDirection: 'desc',
    }
  },
  computed: {
    ...mapGetters({
      listCards: "cards/getCards"
    }),
    sortedCards() {
      let cards = this.listCards
      if (this.sortDirection !== '' && this.sortBy !== ''&&this.listCards) {
        cards.sort((p1, p2) => {
          let modifier = 1;
          if (this.sortDirection === 'desc') modifier = -1;
          if (p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier;
          if (p1[this.sortBy] > p2[this.sortBy]) return modifier;
          return 0;
        });
      }
      return this.listCards
    }
  },
  methods: {
    ...mapActions({
      getListCards: "cards/getList"
    }),
    searchPhoto: debounce(function () {
      this.getListCards(this.query);
    }, 300),

    sort(el) {
      if (el === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      }
      this.sortBy = el;
    }
  },

  async mounted() {
    await this.getListCards(this.query)
  }
}
</script>

<style>

</style>
