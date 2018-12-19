<template>
    <div class="card">
        <img :src="image" height="280" :class="selectedClass" />
    </div>
</template>

<script>
export default {
    name: 'card',
    props: {
        number: Number,
        suit: String,
        selected: Boolean
    },
    data() {
        return {
            selectedClass: {
                'margin-top': '-20px'
            }
        }
    },
    computed: {
        /*
            Vueだと画像はBASE64エンコードされるが、requireしないとパスがそのまま渡される
            よって、imgにわたすのはrequireの戻り値
            参考: http://tk2000ex.blogspot.com/2017/11/vue.html
        */
        image: function(){
            const filename = this.hide ? 'back' : `${this.suit}_${this.number.toString().padStart(2, '0')}` // 1桁のアタマは0に
            return require(`../assets/card_${filename}.png`)
        }
    }
}
</script>
