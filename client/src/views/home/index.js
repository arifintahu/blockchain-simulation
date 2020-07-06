import Card from '../../components/Card/Card.vue';

export default {
    components: {
    	Card
    },
    data() {
        return {
            blocks: [],
            showBlock: null
        }
    },
    async mounted() {
        await this.getChain();
    },
    methods: {
        getChain() {
            this.$http.get(`/block/chain`).then((response) => {
                this.blocks = response.data.chain;
            });
        },
        readBlock(block) {
            this.showBlock = block;
        }
    }
}