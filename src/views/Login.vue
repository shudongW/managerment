<template>
  <div id="login">
    <h2>LOGIN</h2>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="rForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入用户名" width="200px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" placeholder="请输入用户名" ></el-input>
      </el-form-item>
      <el-form-item prop="remember">
        <el-checkbox label="记住密码" class="remember" name="type"></el-checkbox>
      </el-form-item>
        <el-button type="primary" @click.native="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        pass: ''
      },
      userToken: '',
      rules: {
        name: [
          {validator: validateName, trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm: function () {
      this.$refs.rForm.validate((valid) => {
        if (valid) {
          let _this = this
          _this.$router.push('/index')
          // alert('submit')
          // this.$router.push({ path: '/index' })
          // let data = JSON.stringify({
          //   'password': this.ruleForm.pass,
          //   'username': this.ruleForm.name
          // })
          _this.$store.dispatch('LoginByEmail', _this.ruleForm).then(res => {
            this.$router.push('/index')
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
        //   _this.$ajax.post('/api/user/login', data).then((res) => {
        //     console.log(res.data)
        //     _this.$message.success('登录成功')
        //     let data = res.data
        //     // 根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
        //     _this.$store.commit('set_token', data['Authorization'])
        //     if (_this.$store.state.token) {
        //       _this.$router.push('/')
        //       console.log(_this.$store.state.token)
        //     } else {
        //       _this.$router.replace('/login')
        //     }
        //     alert('登陆成功')
        //   }).catch((response) => {
        //     alert('账号或密码错误')
        //     console.log(response)
        //   })
        // } else {
        //   console.log('error submit!!')
        //   return false
        // }
      })
    },
    resetForm: function (rForm) {
      this.$refs.rForm.resetFields()
    }
  }
}
</script>

<style scoped>
  #login{
    background-color: azure;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 300px;
    margin: -200px 0 0 -220px;
    #border: 1px solid red;
    border-radius:5px;
    box-shadow: darkgrey 5px 5px 0px 0px;
  }
  h2{
    text-align: center;
  }
  .demo-ruleForm{
    width: 440px;
    text-align: center;
    #border: 1px solid red;
  }
  .el-form-item{
    float: left;
    #border: 1px solid red;
    width: 400px;
  }
  .el-input{
    width: 300px;
  }
  .remember{
    float: left;
  }
  .msg{
    color: red;
    height: 10px;
  }
</style>
