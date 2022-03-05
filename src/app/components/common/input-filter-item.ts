/**
 * Copyright (c) 2022 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ElInput } from "element-plus"
import { defineComponent, h, Ref, ref } from "vue"

const _default = defineComponent({
    name: "InputFilterItem",
    props: {
        placeholder: String
    },
    emits: ["clear", "enter"],
    setup(props, ctx) {
        const modelValue: Ref<string> = ref("")
        return () => h(ElInput, {
            class: 'filter-item',
            modelValue: modelValue.value,
            placeholder: props.placeholder,
            clearable: true,
            onClear() {
                modelValue.value = ''
                ctx.emit("clear")
            },
            onInput: (val: string) => modelValue.value = val.trim(),
            onKeyup: (event: KeyboardEvent) => event.key === 'Enter' && ctx.emit("enter", modelValue.value)
        })
    }
})

export default _default