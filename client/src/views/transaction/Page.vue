<template>
  <div>
    <v-container class="mb-6 pa-6 grey lighten-5">
      <h1>Create Transaction</h1>
      <p class="mb-6">Transfer some money to someone!</p>
      <v-text-field
          :value="$store.getters.user.address"
          label="From Address"
          disabled
       ></v-text-field>
       <v-text-field
          v-model="toAddress"
          label="To Address"
       ></v-text-field>
       <v-text-field
          v-model="amount"
          label="Amount"
       ></v-text-field>
       <v-btn color="primary" @click.prevent="submit">Submit</v-btn>
    </v-container>
  </div>
</template>

<script src="./index.js"></script>

<style src="./style.less" lang="less" scoped></style>