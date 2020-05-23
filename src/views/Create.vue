<template>
    <div class="row">
        <div class="col offset-s1">
            <h5>Добавить телефон:</h5>
            <form @submit.prevent="submitCreate">
                <div class="input-field">
                    <input v-model="title" id="title" type="text" class="validate" required>
                    <label for="title">введите номер</label>
                    <span class="helper-text" data-error="Поле не может быть пустым"></span>
                </div>
                <button class="btn-floating btn waves-effect waves-light green darken-1" type="submit">
                    <i class="material-icons right">send</i>
                </button>
            </form>
            <router-link tag="button" class="waves-effect waves-light btn-small grey darken-3" style="border-radius: 15px" to="/">назад</router-link>
        </div>
    </div>
</template>

<script>
    import {db} from '../main'
    export default {
        name: 'create',
        data: () => ({
            title: ''
        }),
        methods: {
            async submitCreate() {
                const newContact = {title:this.title}
                await this.$store.dispatch('createNewContact', newContact)
                this.$router.push('/')
            }
        },
    }
</script>

<style scoped>
    h5 {
        margin-left: 1rem;
    }
    form {
        margin-left: 1rem;
        display: flex;
        align-items: center;
    }
    button {
        margin-left: .5rem;
    }
</style>
