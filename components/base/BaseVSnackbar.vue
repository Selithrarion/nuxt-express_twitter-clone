<template>
    <v-snackbar :value="isVisible" top light color="errorPink">
        Что-то пошло не так, но не беспокойтесь — давайте попробуем еще раз.
    </v-snackbar>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: {
        	isVisible: {
        		type: Boolean,
                default: false,
            }
        }
    })
</script>