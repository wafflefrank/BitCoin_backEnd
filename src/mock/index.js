// 引入Mock文件，由于 Vite 不支持require()方法所以改用import
import * as Mock from 'mockjs';
// 模拟返回的数据格式，可以自己随便定义
const memberData = {
  status: 200,
  reset: '0',
  message: 'success',
  data: {
    'list|1-10': [
      {
        'id|+1': 1,
        name: '@name',
        'age|20-40': 20,
        image: '@image',
      },
    ],
  },
};
// 10調資料
const result10 = {
  status: 200,
  reset: '0',
  message: 'success',
  data: {
    'list|10': [
      {
        'id|+1': 1,
        name: '@name',
        'age|20-50': 20,
        自定義組: () => Mock.Random.extend({
          constellation() {
            const constellations = [
              '白羊座',
              '金牛座',
              '雙子座',
              '巨蟹座',
              '獅子座',
              '處女座',
              '天秤座',
              '天蠍座',
              '射手座',
              '摩羯座',
              '水瓶座',
              '雙魚座',
            ];
            return this.pick(constellations);
          },
          coinType() {
            const coinTypes = ['越南盾', '台幣', '美金'];
            return this.pick(coinTypes);
          },
        }),
        幣別: () => Mock.Random.coinType(),
        星座: () => Mock.Random.constellation(),
        image: () => Mock.Random.image('100x100'),
        date: () => Mock.Random.date('yyyy--mm--dd'),
      },
    ],
  },
};
// 20調資料
const result20 = {
  status: 200,
  reset: '0',
  message: 'success',
  data: {
    'list|20': [
      {
        'id|+1': 1,
        name: '@name',
        'age|20-50': 20,
        自定義組: () => Mock.Random.extend({
          constellation() {
            const constellations = [
              '白羊座',
              '金牛座',
              '雙子座',
              '巨蟹座',
              '獅子座',
              '處女座',
              '天秤座',
              '天蠍座',
              '射手座',
              '摩羯座',
              '水瓶座',
              '雙魚座',
            ];
            return this.pick(constellations);
          },
          coinType() {
            const coinTypes = ['越南盾', '台幣', '美金'];
            return this.pick(coinTypes);
          },
        }),
        幣別: () => Mock.Random.coinType(),
        星座: () => Mock.Random.constellation(),
        image: () => Mock.Random.image('100x100'),
        date: () => Mock.Random.date('yyyy--mm--dd'),
      },
    ],
  },
};
// 用mock拦截对应的请求地址，并发送返回数据对象（这里以正则来匹配带有api/的请求地址）
const responseData = Mock.mock('/mock/news', 'get', memberData);
const testData = Mock.mock('/mock/testdata&limit=10', 'get', result10);

const testData20 = Mock.mock('/mock/testdata&limit=20', 'get', result20);

// 导出返回对象，可以导出多个对象
export default { responseData, testData, testData20 };
