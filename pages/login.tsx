import { ReactElement, useMemo, useState } from 'react';
import {
  Box,
  IconButton,
  Container,
  TextField,
  Paper,
  Typography,
  Button,
  Divider,
  Grid,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import router from 'next/router';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import FullBackgroundArea from '@/components/FullBackgroundArea';
import Link from '@/Link';
import SimpleAppBarLayout from '@/layouts/SimpleAppBarLayout';
import styles from '@/styles/loginPageStyles';
import api from '@/api';

interface FormData {
  email: string;
  password: string;
}

const backgroundUrl =
  'https://images.unsplash.com/photo-1648315156503-5335899e3470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState(false);

  const toastConfig = useMemo(
    () => ({
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }),
    [],
  );

  const onSubmit = async (payload: FormData) => {
    setLoading(true);
    const { data } = await api<any>({
      method: 'POST',
      url: '/api/v1/user/login',
      data: payload,
    });
    setLoading(false);

    if (!data.success) {
      toast.error(data.message, toastConfig);
      return;
    }

    window.localStorage.setItem('accessToken', data.meta.accessToken);
    router.push('/dashboard');
  };

  return (
    <>
      <FullBackgroundArea src={backgroundUrl} sx={{ zIndex: -1, position: 'fixed' }} />
      <Container>
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12} sm={8} md={6}>
            <Paper elevation={0} sx={styles.loginPaper}>
              <Typography sx={styles.subTitle}>Login</Typography>
              <Typography variant="h4" sx={styles.title}>
                登录
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                还没有账号吗？那就
                <Link href="/sign-up" sx={{ textDecoration: 'none' }}>
                  &nbsp;创建一个新账号&nbsp;
                </Link>
                吧！
              </Typography>

              <Box sx={styles.contentBox}>
                <Box
                  component="form"
                  sx={{
                    px: 1,
                    '& .MuiTextField-root': { my: 2 },
                  }}
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: '邮箱不能为空',
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: '邮箱格式不正确',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        label="邮箱"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: '密码不能为空' }}
                    render={({ field }) => (
                      <TextField
                        label="密码"
                        type="password"
                        variant="outlined"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={{ width: '100%' }}
                        {...field}
                      />
                    )}
                  />

                  <LoadingButton
                    loading={loading}
                    size="large"
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{ my: 1 }}
                  >
                    登录
                  </LoadingButton>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Divider>第三方账号登录</Divider>
                  <Box sx={{ display: 'flex', gap: 2, mt: 1, justifyContent: 'center' }}>
                    <IconButton disabled>
                      <GitHubIcon />
                    </IconButton>

                    <IconButton disabled>
                      <GoogleIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <SimpleAppBarLayout>{page}</SimpleAppBarLayout>;
};

export default Login;
