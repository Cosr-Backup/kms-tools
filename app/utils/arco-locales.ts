import arEG from '@arco-design/web-vue/es/locale/lang/ar-eg'
import deDE from '@arco-design/web-vue/es/locale/lang/de-de'
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import esES from '@arco-design/web-vue/es/locale/lang/es-es'
import frFR from '@arco-design/web-vue/es/locale/lang/fr-fr'
import idID from '@arco-design/web-vue/es/locale/lang/id-id'
import itIT from '@arco-design/web-vue/es/locale/lang/it-it'
import jaJP from '@arco-design/web-vue/es/locale/lang/ja-jp'
import kmKH from '@arco-design/web-vue/es/locale/lang/km-kh'
import koKR from '@arco-design/web-vue/es/locale/lang/ko-kr'
import msMY from '@arco-design/web-vue/es/locale/lang/ms-my'
import nlNL from '@arco-design/web-vue/es/locale/lang/nl-nl'
import ptPT from '@arco-design/web-vue/es/locale/lang/pt-pt'
import ruRU from '@arco-design/web-vue/es/locale/lang/ru-ru'
import thTH from '@arco-design/web-vue/es/locale/lang/th-th'
import viVN from '@arco-design/web-vue/es/locale/lang/vi-vn'
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import zhTW from '@arco-design/web-vue/es/locale/lang/zh-tw'

const arcoLocales = {
  ar: arEG,
  de: deDE,
  en: enUS,
  es: esES,
  fr: frFR,
  id: idID,
  it: itIT,
  ja: jaJP,
  km: kmKH,
  ko: koKR,
  ms: msMY,
  nl: nlNL,
  pt: ptPT,
  ru: ruRU,
  th: thTH,
  vi: viVN,
  'zh-cn': zhCN,
  'zh-tw': zhTW
} as const

type ArcoLocaleCode = keyof typeof arcoLocales

export function resolveArcoLocale(locale: string) {
  return arcoLocales[locale as ArcoLocaleCode] ?? zhCN
}
