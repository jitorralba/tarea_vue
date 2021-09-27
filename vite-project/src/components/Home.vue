<script>

    import { ref, onMounted } from 'vue';
    import '../assets/style/main_table.css';
    import Detail from './Detail.vue';
    import axios from 'axios';

    export default {
        props: {
            modelValue: String,
            crypto_name: String,
        },
        data() {
            return {
                search: '',
                cryptos:null
            }
        },
        computed: {
            filteredCryptos() {
                return this.cryptos.filter(crypto => crypto.name.toLowerCase().includes(this.search.toLowerCase()))
            }
        },
        mounted() {
            this.getCryptos();
        },

        methods: {
            getCryptos(){
                axios
                    .get('https://api.coincap.io/v2/assets')
                        .then( response => {
                            this.cryptos = response.data.data
                        })
            },
        }
    }

</script>

<template>
<body class="bg-grey-700">
    <div>
        <div class="flex justify-center items-center">
            <table class="w-full border m-30 border-gray-700">
                <caption class="items-center">
                    <div class=" items-center grid grid-cols-2 font-bold text-xl my-5">
                        <p class="font-bold dark:text-gray-300  text-3xl my-5">Top Assets</p>
                        <input v-model="search" placeholder="Search a Crypto" class="rounded mx-10 dark:text-gray-700"/>
                    </div>
                </caption>
                <thead class=" my-10 text-center font-bold dark:text-gray-300">
                    <td class="p-2">Ranking</td>
                    <td class="p-2">Name</td>
                    <td class="p-2">Symbol</td>
                    <td class="p-2">Price (USD)</td>
                    <td class="p-2">View More</td>
                </thead>
                <tbody>
                    <tr class="border font-bold text-center dark:text-gray-300 border-gray-700" v-for="crypto in filteredCryptos" :key="crypto.id">
                        <td class="p-2">{{ crypto.rank }}</td>
                        <td class="p-2">{{ crypto.name }}</td>
                        <td class="p-2">{{ crypto.symbol }}</td>
                        <td class="p-2">{{ Math.round((crypto.priceUsd) * 100) / 100 }}</td>
                        <td class="border border-gray-700 rounded text-gray-700 bg-yellow-400 p-1 m-1">
                            <router-link :to="{name: 'detail', params: {id: crypto.id} }">Ver</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
</template>
