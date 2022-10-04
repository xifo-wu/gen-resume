import { ReactElement, useRef, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import router from 'next/router';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Theme, lighten, Grid } from '@mui/material';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Link from '@/Link';
import { apiPost } from '@/api';
import SimpleAppBarLayout from '@/layouts/SimpleAppBarLayout';
import Container from '@/components/SignUpPage/Container';
import ContentContainer from '@/components/SignUpPage/ContentContainer';
import Form from '@/components/Form';
import InputField from '@/components/Form/InputField';
import SubTitle from '@/components/SignUpPage/SubTitle';
import Title from '@/components/SignUpPage/Title';
import PasswordField from '@/components/Form/PasswordField';
import { emailRegex } from '@/enums/const';
import 'react-toastify/dist/ReactToastify.css';


interface FormData {
  email: string;
  verifyCode: string;
  password: string;
  passwordConfirm: string;
}

const contentBoxSx = (theme: Theme) => ({
  [theme.breakpoints.down('md')]: {
    borderRadius: 1,
    background: '#fff',
    boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)',
    margin: 'auto',
    maxWidth: 640,
  },
});

const SignUp = () => {
  const [cookies, setCookie] = useCookies(['can-send-verify-code']);
  const [countDown, setCountDown] = useState<number>(0);
  const [countDowning, setCountDowning] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const intervalRef = useRef<string | number | NodeJS.Timer | null | undefined>(null);

  const {
    control,
    reset,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      verifyCode: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const password = useRef({});
  password.current = watch('password', '');

  useEffect(() => {
    const canSendVerifyCode = cookies['can-send-verify-code'];

    if (canSendVerifyCode) {
      setCountDowning(true);
      intervalRef.current = setInterval(() => {
        const nextCountDown = dayjs().diff(canSendVerifyCode, 's') * -1;
        setCountDown(nextCountDown);
        if (nextCountDown === 0) {
          intervalRef.current && clearInterval(intervalRef.current);
          setCountDowning(false);
        }
      }, 1000);
    } else {
      setCountDowning(false);
    }

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, []);

  // #region 发送验证码方法
  const sendVerifyCode = async () => {
    const email = getValues('email');

    if (!email) {
      toast.error('请先输入邮箱');
      return;
    }

    if (!email.match(emailRegex)) {
      toast.error('邮箱格式不正确');
      return;
    }

    const { status, data, error } = await apiPost({
      url: '/api/v1/auth/verify-codes/email',
      data: {
        email,
      },
    });

    if (status >= 400 && error) {
      toast.error(error.message);
      return;
    }

    const expiresDate = dayjs().add(60, 's');
    setCookie('can-send-verify-code', expiresDate.format('YYYY-MM-DDTHH:mm:ssZ'), {
      expires: expiresDate.toDate(),
    });

    setCountDowning(true);
    intervalRef.current = setInterval(() => {
      const nextCountDown = dayjs().diff(expiresDate, 's') * -1;
      setCountDown(nextCountDown);
      if (nextCountDown === 0) {
        intervalRef.current && clearInterval(intervalRef.current);
        setCountDowning(false);
      }
    }, 1000);

    toast.success('发送成功，请检查邮箱～');
  };
  // #endregion

  const onSubmit = async (payload: FormData) => {
    setSubmitting(true);
    const { status, data, error } = await apiPost<FormData, any>({
      url: '/api/v1/auth/sign-up/using-email',
      data: payload,
    });

    if (status >= 400 && error) {
      setSubmitting(false);
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success('注册成功 🎉 自动登录中～');
    }

    reset();
    await new Promise((r) => setTimeout(r, 1000));
    const { meta } = data;
    window.localStorage.setItem('accessToken', meta.token);
    setSubmitting(false);
    router.push('/dashboard');
  };

  return (
    <Container>
      <Grid container>
        <Grid item xl={5} lg={5} md={6} xs={12} sx={contentBoxSx}>
          <ContentContainer>
            <Title>创建新账号</Title>
            <SubTitle>
              已经有账号了？
              <Link href="/login" sx={{ textDecoration: 'none' }}>
                &nbsp;登录&nbsp;
              </Link>
            </SubTitle>
            <Form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
              <InputField<FormData>
                name="email"
                control={control}
                errors={errors}
                rules={{
                  required: '邮箱不能为空',
                  pattern: {
                    value: emailRegex,
                    message: '邮箱格式不正确',
                  },
                }}
                inputField={{
                  label: '邮箱',
                }}
              />

              <InputField<FormData>
                name="verifyCode"
                control={control}
                errors={errors}
                rules={{
                  required: '验证码不能为空',
                }}
                inputField={{
                  label: '验证码',
                  type: 'number',
                  sx: {
                    '& .MuiInputBase-input': {
                      flex: 1,
                      mr: 2,
                    },
                  },
                  InputProps: {
                    endAdornment: (
                      <Button onClick={sendVerifyCode} variant="contained" disabled={countDowning}>
                        {countDown ? countDown : '发送验证码'}
                      </Button>
                    ),
                  },
                }}
              />

              <PasswordField<FormData>
                name="password"
                control={control}
                errors={errors}
                rules={{
                  required: '密码不能为空',
                }}
                inputField={{
                  label: '密码',
                }}
              />

              <PasswordField<FormData>
                name="passwordConfirm"
                control={control}
                errors={errors}
                rules={{
                  required: '确认密码不能为空',
                  validate: (value) => value === password.current || '输入的两次密码不相同',
                }}
                inputField={{
                  label: '确认密码',
                }}
              />

              <LoadingButton
                loading={submitting}
                // fix MUI warning
                startIcon={<></>}
                loadingPosition="start"
                size="large"
                variant="contained"
                type="submit"
                fullWidth
                sx={(theme) => ({
                  my: 2,
                  height: 56,
                  fontSize: '1.125rem',
                  background: `linear-gradient(126deg, ${theme.palette.primary.main}, ${lighten(
                    theme.palette.primary.main,
                    0.45,
                  )});`,
                })}
              >
                {submitting ? '注册中，请稍后' : '注册'}
              </LoadingButton>
            </Form>
          </ContentContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

SignUp.getLayout = function getLayout(page: ReactElement) {
  return <SimpleAppBarLayout titleColor="#fff">{page}</SimpleAppBarLayout>;
};

export default SignUp;
