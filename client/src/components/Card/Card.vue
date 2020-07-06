<template>
  <div>
    <v-card
      max-width="344"
      outlined
      @click=click
    >
      <v-card-title>Block</v-card-title>
      <v-card-text>
        <div>
          <p class="mb-1 mt-1 font-weight-black">Hash</p>
          <p>{{block.hash}}</p>
        </div>
        <v-divider></v-divider>
        <div>
          <p class="mb-1 mt-1 font-weight-black">Previous Hash</p>
          <p>{{block.previousHash ? block.previousHash : 0}}</p>
        </div>
        <v-divider></v-divider>
        <div>
          <p class="mb-1 mt-1 font-weight-black">Nonce</p>
          <p>{{block.nonce}}</p>
        </div>
        <v-divider></v-divider>
        <div>
          <p class="mb-1 mt-1 font-weight-black">Timestamp</p>
          <p>{{block.timestamp}}</p>
        </div>
        <v-divider></v-divider>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: {
      block: Object
    },
    data() {
        return {
        }
    },
    methods: {
        click(e) {
            this.$emit('click', e);
        }
    },
}
</script>