<template>
<div>
    <div class="flex justify-center items-center">
        <table class="w-full border m-30 border-gray-700">
            <caption class="justify-center">
                <p class="font-bold dark:text-gray-300  text-2xl my-5">{{ crypto_name }} Price through Time</p>
                <div class="grid grid-cols-2 font-bold dark:text-gray-300  text-xl my-5">
                    <div class="font-bold dark:text-gray-300  text-xl my-5">
                        <button v-on:click="days += 1" class="border border-gray-700 rounded text-gray-700 bg-yellow-400 p-1 m-1">Add Day</button>
                    </div>
                    <div class="font-bold dark:text-gray-300  text-xl my-5">
                        <button v-on:click="days -= 1" class="border border-gray-700 rounded text-gray-700 bg-yellow-400 p-1 m-1">Remove Day</button>
                    </div>
                </div>
            </caption>
            <thead class="text-center font-bold text-gray-700 bg-yellow-400">
                <td class="p-2">Price (USD)</td>
                <td class="p-2">Date</td>
            </thead>
            <tbody>
                <tr class="border font-bold text-center dark:text-gray-300 border-gray-700" v-for="price in crypto.slice(0, days*24)" :key="price.time">
                    <td class="p-2">$ {{ Math.round((price.priceUsd) * 100) / 100 }}</td>
                    <td class="p-2">{{ reformat_date(price.date) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";

    export default {
        setup() {
            const route = useRoute();
            const crypto_id = ref("");
            const crypto = ref({});
            const crypto_name = ref("");
            const days = ref(1);
            onMounted( async()  => {
                crypto_id.value = ref(route.params.id);
                const request = 'https://api.coincap.io/v2/assets/' + crypto_id.value.value + '/history?interval=h1';
                const response = await fetch(request);
                const formatted = await response.json();
                crypto.value = formatted.data;
                crypto_name.value = crypto_id.value.value[0].toUpperCase() + crypto_id.value.value.substring(1);
                ;
            });

            function reformat_date(date){

            const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];

            const month = monthNames[parseInt(date.substring(5, 7)) - 1];
            const day = date.substring(8,10)
            const hour = date.substring(11, 19);
            
            return day + ' of ' + month + ' at ' + hour;
        }

            return {
                crypto_id,
                crypto_name,
                crypto,
                reformat_date,
                days,
            }
        },
    }
</script>