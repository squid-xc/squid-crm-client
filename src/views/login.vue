<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="phone">
                            <Input v-model="form.phone" placeholder="请输入手机号码">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <!--<p class="login-tip">没有账号,去注册?</p>-->
                    <router-link to="/register">没有账号,去注册?</router-link>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import {login} from '../api';

export default {
    data () {
        return {
            form: {
                phone: '15757176646',
                password: ''
            },
            rules: {
                phone: [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let loginParams = {
                        phone: this.form.phone,
                        password: this.form.password
                    };
                    let _this = this;

                    login(loginParams).then(function (res) {
                        res = res.data;
                        let { msg, code, data } = res;
                        if (code === 200) {
                            let user = data;
                            Cookies.set('user', user.name);
                            Cookies.set('stuff_id', user.id);
                            _this.$store.commit('setAvator', user.avatar);
                            Cookies.set('access', 0);
                            _this.$router.push({
                                name: 'home_index'
                            });
                        } else {
                            Cookies.set('access', 1);
                            alert(msg);
                        }
                    });
                }
            });
        }
    }
};
</script>

<style>

</style>
