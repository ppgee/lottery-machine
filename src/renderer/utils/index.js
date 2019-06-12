// 数组打乱
export const shuffle = (arr = []) => {
  const len = arr.length
  for (let i = 0; i < arr.length; i++) {
    let index = parseInt(Math.random() * (len - i))
    let temp = arr[index]
    arr[index] = arr[len - i - 1]
    arr[len - i - 1] = temp
  }

  return arr
}

// 随机排序
export const randomSort = (arr = []) => {
  const randomFn = (a, b) => {
    return Math.random() > 0.5 ? -1 : 1
  }

  return arr.sort(randomFn)
}
