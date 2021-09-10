<template>
  <div class="card">
    <div class="card-wrapper">
      <ul class="card-item">
        <li class="" v-for="card in listCards " :key="card.id">
          <a :href="card.pageURL">
            <img :src="card.webformatURL">
          </a>
          <div class="info" @click="clicked(card.id)">
            <div class="tags">
              <div class="tags-items" v-for="(el,key) in card.tags"
                   :key="key">
                <p> {{ el }} </p>
                <div v-if="isClick&&idTag === card.id">
                  <span @click="deleteTag({idCard:card.id, idTag:key})">x</span>
                </div>
              </div>
              <div class="tags-items tags-items-inpt" v-if="isClick&&idTag === card.id&&isAddTag">
                <p>
                  <input v-model="tag" @keyup.enter="addTag({idCard:card.id, tag:tag})">
                </p>
                <span @click="isAddTag = false">x</span>
              </div>
            </div>
            <div class="counts">
              <div class="counts_items">
                <img class="icon" src="../assets/icons/thumb_up_alt_white_24dp.svg">
                <span>
                {{ card.likes }}
              </span>
              </div>
              <div class="counts_items">
                <img class="icon" src="../assets/icons/chat_bubble_outline_white_24dp.svg">
                <span> {{ card.comments }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: {
    listCards: [],
  },
  data() {
    return {
      tag: '',
      isAddTag: false,
      idTag: "",
      isClick: false,
      delay: 700,
      clicks: 0,
      timer: null
    }
  },
  methods: {
    ...mapActions({
      deleteTag: "cards/deleteTag",
      addTag_Store: "cards/addTag"
    }),

    clicked(id) {
      this.clicks++
      if (this.clicks === 1) {
        let self = this
        this.timer = setTimeout(function () {
          self.clicks = 0
          this.isClick = true

        }, this.delay);
      } else {
        clearTimeout(this.timer);
        this.clicks = 0;
        this.isAddTag = true
        this.isClick = !this.isClick
      }
      this.idTag = id
    },
    addTag(data) {
      this.addTag_Store(data)
      this.tag = ''
    }
  },

  computed: {},


}
</script>

