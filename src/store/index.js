import Vue from 'vue'
import Vuex from 'vuex'
import {db} from '../main'


Vue.use(Vuex)

export default new Vuex.Store({
    actions: {
        async createNewContact({commit}, task) {
            await db.collection('telephones').add(task)
                .then(() => {
                    commit('createNewContact', task)
                })
        },
        async changeContact({commit}, task) {
            await db.collection('telephones').doc(task.id).update({title: task.title})
                .then(() => {
                    commit('changeContact', task)
                })
        },
        async deleteContact({commit}, task) {
            await db.collection('telephones').doc(task).delete()
                .then(n => {
                    commit('deleteContact', task)
                })

        },
        async fetchContacts(ctx) {
            await db.collection('telephones')
                .get()
                .then(con => {
                    const collection = []
                    con.forEach(doc => {
                        collection.push({id: doc.id, title: doc.data().title})
                    })
                    ctx.commit('updateContacts', collection)
                })
        }
    },
    mutations: {
        createNewContact(state, task) {
            //
        },
        changeContact(state, {id, title}) {
            const con = state.contacts.findIndex(c => c.id === id)
            state.contacts[con] = {...state.contacts[con], title}
        },
        deleteContact(state, id) {
            const delCon = state.contacts.findIndex(c => c.id === id)
            state.contacts.splice(delCon, 1)
        },
        updateContacts(state, collection) {
            state.contacts = collection
        }
    },
    state: {
        contacts: []
    },
    getters: {
        allContacts: state => state.contacts,
        getContactsId: state => id => state.contacts.find(contact => contact.id === id)
    }
})
