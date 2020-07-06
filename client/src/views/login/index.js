export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    mounted() {
    },
    methods: {
        login() {
            this.$http.post('/user/login', {
                username: this.username,
                password: this.password
            }).then( (response) => {
                if (response.data.username) {
                    this.saveSession(response.data);
                    this.$router.push({ name: 'Home' });
                }
            });
        },
        saveSession(data) {
            sessionStorage.setItem('user', JSON.stringify(data));
        }
    }
}