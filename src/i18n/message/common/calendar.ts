/**
 * Copyright (c) 2022 Hengyang Zhang
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export type CalendarMessage = {
    weekDays: string
    months: string
    dateFormat: string
    timeFormat: string
}

const _default: Messages<CalendarMessage> = {
    zh_CN: {
        weekDays: '星期一|星期二|星期三|星期四|星期五|星期六|星期天',
        months: '一月|二月|三月|四月|五月|六月|七月|八月|九月|十月|十一月|十二月',
        dateFormat: '{y}/{m}/{d}',
        timeFormat: '{y}/{m}/{d} {h}:{i}:{s}',
    },
    zh_TW: {
        weekDays: '禮拜一|禮拜二|禮拜三|禮拜四|禮拜五|禮拜六|禮拜天',
        months: '一月|二月|三月|四月|五月|六月|七月|八月|九月|十月|十一月|十二月',
        dateFormat: '{y}/{m}/{d}',
        timeFormat: '{y}/{m}/{d} {h}:{i}:{s}',
    },
    en: {
        weekDays: 'Mon|Tue|Wed|Thu|Fri|Sat|Sun',
        months: 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Set|Oct|Nov|Dec',
        dateFormat: '{m}/{d}/{y}',
        timeFormat: '{m}/{d}/{y} {h}:{i}:{s}',
    },
    ja: {
        weekDays: 'Mon|Tue|Wed|Thu|Fri|Sat|Sun',
        months: 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Set|Oct|Nov|Dec',
        dateFormat: '{y}/{m}/{d}',
        timeFormat: '{y}/{m}/{d} {h}:{i}:{s}',
    },
}

export default _default