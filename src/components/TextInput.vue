<template>
  <div class="header">
    <div class="search">
      <input
          :value="value"
          v-bind="$attrs"
          v-on="$listeners"
          @input="$emit('text-input', $event.target.value)"
          @keyup.enter="$emit('text-input', $event.target.value)"
          class="text-input"
          type="text"
          placeholder="Search for a photo"
          aria-label="Search for a photo "
      />
    </div>
    <p class="credit">
      Photos provided by
      <a
          href="https://pixabay.com/"
          target="_blank"
          rel="noopener noreferrer"
      >Pixabay</a>
    </p>

    <div class="filter-btn">
      <button @click="$emit('sort', 'comments')" class="btn btn-sort-comment-like">
        <span>SORT</span>
        <img class="icon" src="../assets/icons/chat_bubble_outline_white_24dp.svg">
      </button>
      <button @click="$emit('sort', 'likes')" class="btn btn-sort-comment-like">
        <span>SORT</span>
        <img class="icon" src="../assets/icons/thumb_up_alt_white_24dp.svg">
      </button>
    </div>
  </div>

</template>

<script>
export default {
  name: "TextInput",
  model: {
    prop: 'value',
    event: 'text-input'
  },
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
