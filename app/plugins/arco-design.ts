export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const colorMode = useColorMode()

    watch(
      () => colorMode.value,
      value => {
        if (value === 'dark') {
          document.body.setAttribute('arco-theme', 'dark')
        } else {
          document.body.removeAttribute('arco-theme')
        }
      },
      { immediate: true }
    )
  }
})
