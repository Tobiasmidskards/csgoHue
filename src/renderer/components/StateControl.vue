<template>
    <div class="state-control">
        <div class="columns is-mobile">
            <div class="column">
                <div class="button is-fullwidth is-black" @click="triggerState('off')">Off</div>
            </div>
            <div class="column">
                <div class="button is-fullwidth is-light" @click="triggerState('default')">Default</div>
            </div>
            <div class="column">
                <div class="button is-fullwidth is-info" @click="triggerState('freeze')">Freeze</div>
            </div>
            <div class="column">
                <div class="button is-fullwidth is-danger" @click="triggerState('planted')">Planted</div>
            </div>
        </div>
        <div class="columns is-mobile">
            <div class="column">
                <div class="button is-fullwidth is-warning" @click="triggerState('exploded')">Exploded</div>
            </div>
            <div class="column">
                <div class="button is-fullwidth is-success" @click="triggerState('defused')">Defuse</div>
            </div>
            <div class="column">
                <div class="button is-fullwidth is-light" @click="triggerState('sparkle')">Sparkle</div>
            </div>
            <div class="column">
            </div>
        </div>
        <div class="columns is-mobile">
            <div class="column">
                <div class="button is-fullwidth is-danger" @click="triggerState('twin')">T win</div>
            </div>
            <div class="column">
                <div class="button is-fullwidth is-info" @click="triggerState('ctwin')">CT win</div>
            </div>
            <div class="column">
            </div>
            <div class="column">
            </div>
        </div>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        props: [],
        data() {
            return {
                default: null,
            };
        },
        mounted() {
        },
        computed: {
            ...mapGetters([
                'game_data',
                'current_state',
            ]),
        },
        methods: {
            triggerState(state) {
                this.$store.dispatch('setCurrentState', state);
            },
        },
    };
</script>

<style>
</style>
