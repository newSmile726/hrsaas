//自定义图片加载失败指令
export const imgError = {
  inserted: (el, binding) => {
    // console.log(binding)
    if (!el.src) {
      el.src = binding.value
    } else {
      el.onerror = function () {
        el.src = binding.value
      }
    }
  },
  update(el, binding) {
    if (!el.src) {
      el.src = binding.value
    }
  }
}
