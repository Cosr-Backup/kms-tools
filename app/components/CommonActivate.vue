<script lang="ts" setup>
const { gvlksData, title, generateScript } = defineProps<{
  gvlksData: GvlksData[]
  title: string
  generateScript: (formData: ActivateFormData) => string
}>()

const { t } = useI18n()

const monitorData = useState<MonitorInfo[]>('monitorData')

const editionById = new Map(
  gvlksData.flatMap(({ editions }) =>
    editions.map(edition => [edition.id, edition] as const)
  )
)

const formData = ref<ActivateFormData>({
  edition: gvlksData[0]?.editions[0]?.id ?? '',
  arch: 'x64',
  host: monitorData.value?.[0]?.host || '',
  license: ''
})

watch(
  () => formData.value.edition,
  editionId => {
    formData.value.license = editionById.get(editionId)?.license ?? ''
  },
  { immediate: true }
)

function getEditionLabel(edition: GvlksEdition) {
  return t(`gvlks.editions.${edition.id}`)
}

watch(monitorData, val => {
  formData.value.host = val?.[0]?.host || ''
})

const content = computed(() => {
  return generateScript(formData.value)
})

const fileUrl = computed(() => {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(content.value)}`
})

const { copy, copied } = useClipboard({
  source: content
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <ACard>
      <template #title>
        <div class="flex items-center gap-2">
          <i :class="`i-local:${title.toLowerCase().replace(/ /g, '-')}`" />
          <span>{{ title }}</span>
        </div>
      </template>
      <AForm :model="formData" layout="vertical">
        <AFormItem :label="t('label.edition')" field="edition" required>
          <ASelect v-model="formData.edition">
            <template v-for="item in gvlksData" :key="item.version">
              <AOptgroup :label="item.version">
                <template v-for="edition in item.editions" :key="edition.id">
                  <AOption
                    :value="edition.id"
                    :label="getEditionLabel(edition)"
                  />
                </template>
              </AOptgroup>
            </template>
          </ASelect>
        </AFormItem>
        <AFormItem
          v-if="title.toLowerCase() === 'office'"
          field="arch"
          :label="t('label.arch')"
          required
        >
          <ARadioGroup v-model="formData.arch" type="button">
            <ARadio value="x64">{{ t('label.x64') }}</ARadio>
            <ARadio value="x86">{{ t('label.x86') }}</ARadio>
          </ARadioGroup>
        </AFormItem>
        <AFormItem :label="t('label.host')" field="host" required>
          <ASelect v-model="formData.host">
            <template v-for="item in monitorData" :key="item.host">
              <AOption :value="item.host" :label="item.host" class="*:w-full">
                <div class="flex items-center gap-2">
                  <div class="flex-1">{{ item.host }}</div>
                  <ATag
                    :color="getRateColor(item.success / item.total)"
                    size="small"
                  >
                    {{ `${((item.success / item.total) * 100).toFixed(2)} %` }}
                  </ATag>
                  <ATag :color="getDelayColor(item.delay)" size="small">
                    {{ `${item.delay.toFixed(2)} ms` }}
                  </ATag>
                </div>
              </AOption>
            </template>
          </ASelect>
        </AFormItem>
        <AFormItem :label="t('label.license')" field="license" required>
          <AInput v-model="formData.license" dir="ltr" disabled />
        </AFormItem>
        <AFormItem :label="t('label.script')" required>
          <ClientOnly fallback-tag="textarea">
            <ATextarea v-model="content" dir="ltr" auto-size />
            <template #fallback>
              <ATextarea dir="ltr" auto-size />
            </template>
          </ClientOnly>
        </AFormItem>
        <AFormItem>
          <ASpace size="small">
            <ClientOnly fallback-tag="a">
              <a :href="fileUrl" download="kms.bat">
                <AButton type="primary">
                  {{ t('label.download') }}
                </AButton>
              </a>
            </ClientOnly>
            <AButton
              type="secondary"
              :status="copied ? 'success' : 'normal'"
              @click="copy()"
            >
              {{ copied ? t('label.copy-success') : t('label.copy') }}
            </AButton>
          </ASpace>
        </AFormItem>
      </AForm>
    </ACard>
  </div>
</template>
