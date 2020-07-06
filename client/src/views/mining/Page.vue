<template>
  <div>
    <v-container class="mb-6 pa-6 grey lighten-5">
      <h1>Pending Transaction</h1>
      <p class="mb-6">These transactions are waiting to be included in the next block. Next block is created when you start the mining process.</p>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">From</th>
              <th class="text-left">To</th>
              <th class="text-left">Amount</th>
              <th class="text-left">Timestamp</th>
              <th class="text-left">Valid?</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(block, index) in blocks" :key="index">
              <td>{{block.transaction.fromAddress}}</td>
              <td>{{block.transaction.toAddress}}</td>
              <td>{{block.transaction.amount}}</td>
              <td>{{block.timestamp}}</td>
              <td>null</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-btn class="my-6" color="primary" @click.prevent="mining">Mining</v-btn>
    </v-container>
  </div>
</template>

<script src="./index.js"></script>

<style src="./style.less" lang="less" scoped></style>