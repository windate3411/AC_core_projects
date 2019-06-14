const task = {
  engineer: ['加個按鈕', '加新功能', '切個版', '改一點 code'],
  designer: ['畫一張圖', '改個 logo', '順便幫忙設計一下', '隨便換個設計'],
  entrepreneur: ['週末加班', '要能賺錢', '想個business model', '找 VC 募錢']
}
const phrase = ['很簡單', '很容易', '很快', '很正常']

const job = {
  engineer: '工程師',
  designer: '設計師',
  entrepreneur: '創業家'
}

function talkTrashy(jobTitle) {
  if (jobTitle === undefined) return
  const index1 = Math.floor(Math.random() * task[jobTitle].length)
  const index2 = Math.floor(Math.random() * task[jobTitle].length)
  return `身為一個${job[jobTitle]}，${task[jobTitle][index1]}應該${phrase[index2]}吧!`
}

module.exports = {
  talkTrashy
}