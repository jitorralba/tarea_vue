<template>
        <input class=" flex border rounded-xl p-1"
        type="text"
        placeholder="Search a Crypto..."
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script>
    export default {
        name: 'Input'
    }
</script>

<style lang="scss" scoped>

</style>