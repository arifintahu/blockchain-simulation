export default {
    data() {
        return {
        	toAddress: null,
        	amount: null
        }
    },
    methods: {
        submit() {
        	this.$http.post('/block/block', {
        		fromAddress: this.$store.getters.user.address,
        		toAddress: this.toAddress,
        		amount: this.amount
        	}).then((response) => {
        		console.log(response.data);
                this.toAddress = null;
                this.amount = null;
        	});
        }
    }
}