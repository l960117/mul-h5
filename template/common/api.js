/**
 * 创建页面数据
 */
const setpromise = data => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

// 编译环境使用真实数据
if (process.env.NODE_ENV === 'development') {
  // test
} else {
  // test
}

// const airlineList = () => { return setpromise(airline) };

// export default { airlineList, airline, cardList }
