// 获取元素
const form = document.getElementById('register')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

// 检查必填字段
function checkRequired (inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      // 显示错误信息
      showError(input, `请填写${getFieldName(input)}`)
    } else {
      // 显示成功提示
      showSuccess(input)
    }
  })
}

// 错误提示
function showError (input, message) {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  // formControl.classList.add('error')
  const small = formControl.querySelector('small')
  small.innerText = message
}

// 成功提示
function showSuccess (input) {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
  // formControl.classList.add('success')
}

// 获取表单名字
function getFieldName (input) {
  let inputId = input.id
  return input.dataset[inputId]
}

// 检查长度
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)}不少于${min}位`)
  } else if(input.value.length > max) {
    showError(input, `${getFieldName(input)}不大于${max}位`)
  } else {
    showSuccess(input)
  }
}

// 检查邮箱
function checkEmail(input) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, '邮箱格式不正确')
  }
}

// 再次检查密码
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, '请输入相同的密码')
  }
}

// 事件表单submit监听
form.addEventListener('submit', function (e) {
  // 阻止默认事件
  e.preventDefault()

  // 表单验证必填字段
  checkRequired([username, email, password, password2])
  // 检查用户名长度
  checkLength(username, 3, 5)
  // 检查密码长度
  checkLength(password, 6, 25)
  // 检查邮箱
  checkEmail(email)
  // 再次检查密码
  checkPasswordsMatch(password, password2)
})
