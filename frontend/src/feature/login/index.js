import { Button, Form, Input } from 'antd';
import './index.css';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { loginAsync } from '@/stores/user.store';
// import { useDispatch } from 'react-redux';
// import { formatSearch } from '@/utils/formatSearch';

const initialValues = {
    username: '',
    password: '',
    // remember: true
};

const LoginForm = () => {
    // const navigate = useNavigate();
    // const location = useLocation();
    // const dispatch = useDispatch();

    const onFinished = async (form) => {
        // const res = dispatch(await loginAsync(form));

        // if (!!res) {
        //     const search = formatSearch(location.search);
        //     const from = search.from || { pathname: '/' };

        //     navigate(from);
        // }

        console.log(form);
    };

    return (
        <div className="login-page">
            <div className='cover-form'>
                <div className='app-user-form-header'>
                    <h1 className="login-page-title">Đăng nhập</h1>
                </div>
                <Form onFinish={onFinished} className="login-page-form" initialValues={initialValues}>
                    <div className='cover-field'>
                        <label className="login-page-form_title">Tài khoản</label>
                        <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}>
                            <Input placeholder="Tài khoản" />
                        </Form.Item>
                    </div>
                    <div className='cover-field'>
                        <label className="login-page-form_title">Mật khẩu</label>
                        <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                            <Input type="password" placeholder="Mật khẩu" />
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
