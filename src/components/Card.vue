<template>
    <div @click="select" :class="{ 'card': true, 'selected': selected }">
        <!-- <img :src="image" height="280" />  -->
        {{ image }}
    </div>
</template>

<style>
.selected {
    margin-top: -20px;
}
</style>

<script>
export default {
    name: 'card',
    props: {
        number: Number,
        suit: String,
        selected: Boolean,
        hide: Boolean
    },
    computed: {
        /*
            Vueだと画像はBASE64エンコードされるが、requireしないとパスがそのまま渡される
            よって、imgにわたすのはrequireの戻り値
            参考: http://tk2000ex.blogspot.com/2017/11/vue.html
        */
        image() {
            const filename = this.hide ? 'back' : `${this.suit}_${this.number.toString().padStart(2, '0')}` // 1桁のアタマは0に
            return require(`../assets/card_${filename}.png`)
        },
        class() {
            return { card: true, selected: this.selected }
        },
    }, 
    methods: {
        select() {
            this.$emit('select', this)
        }
    }
}
</script>
