<template>
    <div class="game-grid">
        <GameRow rowId="0"></GameRow>
        <GameRow rowId="1"></GameRow>
        <GameRow rowId="2"></GameRow>
        <GameRow rowId="3"></GameRow>
        <GameRow rowId="4"></GameRow>
        <GameRow rowId="5"></GameRow>
    </div>
</template>

<script>
import GameRow from './GameRow'

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

export default {
    name: 'GameGrid',
    components: {
        GameRow
    },
    mounted() {
        this.$store.dispatch('generateWord');
        window.addEventListener("keydown", async e => {
            const letter = e.key.toUpperCase();
            if(letter.length == 1 && letter.match(/^[A-Z]/))
            {
                if(this.$store.state.words[this.$store.state.currentRow].length < 5)
                    this.$store.state.words[this.$store.state.currentRow] = this.$store.state.words[this.$store.state.currentRow].concat(letter);
            }
            if(e.key == "Backspace")
            {
                if(this.$store.state.words[this.$store.state.currentRow].length > 0)
                    this.$store.state.words[this.$store.state.currentRow] = this.$store.state.words[this.$store.state.currentRow].slice(0, -1);
            }
            if(e.key == "Enter")
            {
                if(this.$store.state.words[this.$store.state.currentRow].length == 5)
                {
                    if(await this.$store.dispatch("checkWord"))
                    {
                        this.$store.commit("updateStatus", {status: "", type: 0});
                        if(await this.$store.dispatch("guessWord"))
                        {
                            await delay(1);
                            this.$store.commit("updateStatus", {status: "You found the word in " + (this.$store.state.currentRow + 1) + " tries !", type: 2});
                            this.$store.state.currentRow = -1;
                        }
                        else
                        {
                            this.$store.state.currentRow = this.$store.state.currentRow + 1;
                            if(this.$store.state.currentRow > 5)
                            {
                                await delay(1);
                                this.$store.commit("updateStatus", {status: "You loosed !", type: 1});
                                this.$store.state.currentRow = -1;
                            }
                        }
                    }
                    else
                    {
                        this.$store.commit("updateStatus", {status: "The word is not in the list", type: 1});
                    }
                }
                else
                {
                    this.$store.commit("updateStatus", {status: "The word is not 5 letters long", type: 1});
                }
            }
        });
    }
}
</script>

<style>
</style>
