<template>
    <div>
        <div class="row valign-wrapper ">
                <div class="search-wrapper">
                <span class="search">
                    <div class="input-field">
                        <input type="text" style="width: 180px" v-model="filter">
                    </div>
                    <button class="waves-effect waves-light btn-small blue darken-4" type="button" @click="searchFilter()">найти</button>
                    <button class="btn-floating btn-small waves-effect waves-light red" @click="noSearch()">&times</button>
                </span>


                <router-link tag="button" class="waves-effect waves-light btn-small green darken-1" to="/create">добавить</router-link>
                </div>
        </div>
        <div v-if="!contact.length" class="loader-info">
            <div class="lds-dual-ring"></div>
            <p>Загрузка</p>
        </div>
        <div v-else>
        <ul class="collection with-header z-depth-1">
            <li class="collection-header"><span>телефон</span><span>действие</span></li>
            <li class="collection-item valign-wrapper"  v-for="contact in items" :key="contact.id">
                <span>{{contact.title}}</span>
                <span>
                    <router-link tag="i" class="small material-icons" :to="'/contact/' + contact.id">
                        border_color
                    </router-link>
                    <i class="small material-icons" @click="deleteContact(contact.id)">delete</i>
                </span>
            </li>
        </ul>
        <div class="right-align">
        <Paginate
                v-model="page"
                :page-count="pageCount"
                :click-handler="pageChange"
                :prev-text="'назад'"
                :next-text="'вперед'"
                :container-class="'pagination'"
                :page-class="'waves-effect'"
                :active-class="'active grey darken-3'"
        />
        </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import paginationMixin from '../mixins/pagination.mixin'
    export default {
        name: 'App',
        data: () => ({
            filter: '',
            contact: []
        }),
        mixins: [paginationMixin],
        computed: {
            ...mapGetters(['allContacts']),
        },
        methods: {
            ...mapActions(['fetchContacts']),
            async deleteContact(id) {
                await this.$store.dispatch('deleteContact', id)
                this.contact = this.allContacts
                this.setupPagination(this.contact)
            },
            searchFilter() {
                if(!this.filter.trim()) {
                    this.contact = this.allContacts
                    this.setupPagination(this.contact)
                } else {
                    const newContact = this.contact.filter(n =>  n.title.includes(this.filter))
                    this.setupPagination(newContact)
                }
            },
            noSearch() {
                this.contact = this.allContacts
                this.setupPagination(this.contact)
                this.filter = ''
            }
        },
        async mounted() {
            await this.fetchContacts()
            this.contact = this.allContacts
            this.setupPagination(this.contact)
        }
    }
</script>

<style scoped>
    .collection-header {
        font-weight: bold;
        display: flex;
        justify-content: space-between;
    }
    .collection-item {
        display: flex;
        justify-content: space-between;
    }
    .search {
        display: flex;
        align-items: center;
    }
    button {
        margin-left: 1rem;
        border-radius: 15px;
    }
    i {
        margin-left: 1rem;
        cursor: pointer;
    }
    input[type=text]:not(.browser-default):focus:not([readonly]) {
        border-bottom: 1px solid #545555;
        box-shadow: 0 1px 0 0 #545555
    }
    .search-wrapper {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
    .loader-info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .lds-dual-ring {
        display: inline-block;
        width: 80px;
        height: 80px;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #fff;
        border-color: #0a0a0a transparent #0a0a0a transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
