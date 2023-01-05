import { defineComponent ,ref } from "vue";

export const App = defineComponent({
    setup() {
        const count = ref(6);

        const inc = () => {
            count.value++
        };

        return () => (
            <div onClick={inc}>{count.value}</div>
        );
    }
})

