import { computed, onMounted, onUnmounted, ref,Ref } from "vue"

type Point = {
    x: number,
    y: number
}

export const useSwipe = (element: Ref<HTMLElement | null>) => {
    // 响应式的起点
    const start = ref<Point | null>(null);

    const end = ref<Point | null>(null);
    // 
    const swiping = ref(false)
    // 计算移动距离
    const distance = computed(() => {
        if (!start.value || !end.value) {
            return null
        }
        return {
            x: end.value.x - start.value.x,
            y: end.value.y - start.value.y,
        }
    })
    const direction = computed(() => {
        if (!distance.value) {
            return ""
        }
        const { x, y } = distance.value
        // 根据投影计算移动方向
        if (Math.abs(x) > Math.abs(y)) {
            return x > 0 ? 'right' : 'left'
        } else {
            return y > 0 ? 'down' : 'up'
        }
    })
    const onStart = (e: TouchEvent) => {
        swiping.value = true
        end.value = start.value = { x: e.touches[0].screenX, y: e.touches[0].screenY }
        // 开始移动 记录起点和终点的未知
    }
    const onMove = (e: TouchEvent) => {
        if (!start.value) {
            return
        }
        end.value = { x: e.touches[0].screenX, y: e.touches[0].screenY, }
        // 如果存在起点说明开移动 记录重点
    }
    const onEnd = (e: TouchEvent) => {
        swiping.value = false
    }

    onMounted(() => {
        if (!element.value) { return }
        element.value.addEventListener('touchstart', onStart)
        element.value.addEventListener('touchmove', onMove)
        element.value.addEventListener('touchend', onEnd)
    })
    onUnmounted(() => {
        if (!element.value) { return }
        element.value.removeEventListener('touchstart', onStart)
        element.value.removeEventListener('touchmove', onMove)
        element.value.removeEventListener('touchend', onEnd)
    })
    // 暴露钩子
    return {
        swiping,
        distance,
        direction
    }
}