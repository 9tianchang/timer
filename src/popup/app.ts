import { ECharts, init, use } from "echarts/core"
import { PieChart } from 'echarts/charts'
import { TitleComponent, ToolboxComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// Register echarts
use([TitleComponent, ToolboxComponent, TooltipComponent, LegendComponent, CanvasRenderer, PieChart])

import { computed, ComputedRef, defineComponent, h, onMounted, Ref, ref, watch } from "vue"
import { t } from "./locale"
import SiteInfo, { SiteItem } from "../entity/dto/site-info"
import timerService, { SortDirect, TimerQueryParam } from "../service/timer-service"
import { formatPeriodCommon } from "../util/time"
import { getLatestVersion } from "../api/version"
import { PieOptionProps, pieOptions } from './components/chart/option'
import { pieChartContainer } from './components/chart'
import handleClick from './components/chart/click-handler'
import footer, { FooterProps } from './components/footer'

const DEFAULT_DATE_TYPE: SiteItem = 'focus'

const width = '750px'
const height = '500px'

const typeRef: Ref<SiteItem> = ref(DEFAULT_DATE_TYPE)
const mergeDomainRef: Ref<boolean> = ref(false)

const chartContainerRef: Ref<HTMLDivElement> = ref()
let pie: ECharts

// Data
const dataRef: Ref<SiteInfo[]> = ref([])

const totalInfo: ComputedRef = computed(() => {
    const type = typeRef.value
    if (type === 'time') {
        const totalCount = dataRef.value.map(d => d[type] || 0).reduce((a, b) => a + b, 0)
        return t(msg => msg.totalCount, { totalCount })
    } else {
        const totalTime = formatPeriodCommon(dataRef.value.map(d => d[type]).reduce((a, b) => a + b, 0))
        return t(msg => msg.totalTime, { totalTime })
    }
})

// Latest version
const latestVersionRef: Ref<string | null> = ref(null)
getLatestVersion().then(latestVersion => latestVersionRef.value = latestVersion)

const computedQueryParamRef = computed(() => {
    const param: TimerQueryParam = {
        date: new Date(),
        mergeDomain: mergeDomainRef.value,
        sort: typeRef.value,
        sortOrder: SortDirect.DESC
    }
    return param
})

// Query data and update the pie
const queryDataAndUpdate = async () => {
    const rows = await timerService.select(computedQueryParamRef.value, true)
    const result = []
    const other: SiteInfo = { host: t(msg => msg.otherLabel), focus: 0, total: 0, date: '0000-00-00', time: 0, mergedHosts: [] }
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        if (i < 10) {
            result.push(row)
        } else {
            other.focus += row.focus
            other.total += row.total
        }
    }
    rows.length > 10 && result.push(other)
    dataRef.value = result

    const pieOptionProps: PieOptionProps = {
        typeRef,
        mergeDomainRef,
        dataRef
    }
    pie.setOption(pieOptions(pieOptionProps), true, false)
}

queryDataAndUpdate()


const footerProps: FooterProps = {
    totalInfo,
    latestVersionRef,
    typeRef,
    mergeDomainRef
}

export default defineComponent(() => {
    // watch
    watch(typeRef, queryDataAndUpdate)
    watch(mergeDomainRef, queryDataAndUpdate)

    onMounted(() => {
        pie = init(chartContainerRef.value)
        // Bound the listener
        pie.on('click', handleClick)
    })

    return () => h('div',
        { style: `width:${width}; height:${height};` },
        [
            pieChartContainer({ chartContainerRef, width, height }),
            footer(footerProps)
        ]
    )
})