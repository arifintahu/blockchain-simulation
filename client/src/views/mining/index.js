export default {
    data() {
        return {
        	toAddress: null,
        	amount: null,
            blocks: []
        }
    },
    async mounted() {
        await this.pendingBlocks();
    },
    methods: {
        mining() {
        	this.$http.post('/block/mining', {
        		address: this.$store.getters.user.address,
        		size: this.blocks.length
        	}).then((response) => {
                this.blocks = [];
        	});
        },
        pendingBlocks() {
            this.$http.get('/block/mining').then((response) => {
                this.blocks = response.data;
            });
        }
    }
}