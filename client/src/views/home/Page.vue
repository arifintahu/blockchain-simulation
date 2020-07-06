<template>
  <div>
    <v-container class="mb-6 pa-6 grey lighten-5">
      <h1>Blockchain</h1>
      <p class="mb-6">Each card represents a block on the chain.</p>
      <p>Found {{blocks.length}} Blocks</p>
      <div class="block-card d-flex">
        <Card class="mr-2" v-for="block in blocks" :block="block" :key="block.timestamp" @click="readBlock(block)"></Card>
      </div>
      <div class="my-5">
        <h1>Transactions</h1>
        <v-simple-table v-if="showBlock && showBlock.transactions">
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
              <tr>
                <td>{{showBlock.transactions.fromAddress}}</td>
                <td>{{showBlock.transactions.toAddress}}</td>
                <td>{{showBlock.transactions.amount}}</td>
                <td>{{showBlock.timestamp}}</td>
                <td>null</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-container>
  </div>
</template>

<script src="./index.js"></script>

<style src="./style.less" lang="less" scoped></style>