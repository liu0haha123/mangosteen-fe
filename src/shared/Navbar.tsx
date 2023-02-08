import { defineComponent } from "vue";
export const Navbar = defineComponent({
    setup: (props, context) => {
        return () => (<div>
            {context.slots.defalut?.()}
        </div>)
    }
})