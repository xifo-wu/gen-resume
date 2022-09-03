import {
  Box,
  IconButton,
  Container,
  TextField,
  Paper,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import FullBackgroundArea from '@/components/FullBackgroundArea';
import Link from '@/Link';

interface FormData {
  email: string;
  password: string;
}

const SignUp = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <>
      <FullBackgroundArea
        sx={{ zIndex: -1 }}
        src="https://images.unsplash.com/photo-1648315156503-5335899e3470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      />
      <Container>
        <Box
          sx={{
            display: 'flex',
            gap: 5,
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: 'auto',
            textAlign: 'center',
            height: '100%',
            minHeight: '100vh',
          }}
        >
          <Box sx={{ flex: 1, color: '#fff', '@media(max-width: 800px)': { display: 'none' }, }}>
            {/* <Typography
              variant="h4"
              sx={{
                color: '#fff',
                letterSpacing: 3,
                fontFamily: 'monospace',
                mb: 3,
                fontWeight: '700',
                lineHeight: '1.3333333333333333',
                fontSize: '2rem',
                '@media (min-width: 600px)': {
                  fontSize: '2.5rem',
                },
                '@media (min-width: 900px)': {
                  fontSize: '2.75rem',
                },
              }}
            >
              Gen-Resume
            </Typography>
            <Typography variant="subtitle2">Hey! 你是新来的吗?</Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 5,
                fontWeight: 700,
                lineHeight: 2,
                letterSpacing: 1.5,
                fontSize: '1.125rem',
                '@media (min-width: 600px)': {
                  fontSize: '1.5rem',
                },
                '@media (min-width: 900px)': {
                  fontSize: '1.75rem',
                },
              }}
            >
              只需要花几分钟时间注册，就可以使用我们的
              <Typography sx={{ display: 'inline', fontFamily: 'monospace' }} variant="inherit">
                &nbsp;Gen-Resume&nbsp;
              </Typography>
              生成简历啦 🎉
            </Typography> */}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              py: 2,
              height: '100%',
              '@media(max-width: 800px)': { flex: '0 0 100%' },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                py: 2,
                px: 1,
              }}
            >
              <Typography
                sx={{
                  background:
                    'linear-gradient(95deg, #1c7ed6 15%, #22b8cf 45%, #FB5343 75%, #6549D5 100%) 98%/200% 100%',
                  textTransform: 'capitalize',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  fontFamily: 'Public Sans,sans-serif',
                  display: 'inline-block',
                }}
              >
                sign up
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  margin: '0',
                  fontWeight: '700',
                  lineHeight: '1.3333333333333333',
                  fontSize: '1.125rem',
                  '@media (min-width: 600px)': {
                    fontSize: '1.5rem',
                  },
                  '@media (min-width: 900px)': {
                    fontSize: '1.75rem',
                  },
                }}
              >
                注册
              </Typography>
              <Typography variant="subtitle2"
              sx={{
                mt: 2,
              }}>已经有账号了？那就去<Link href="/login" sx={{ textDecoration: 'none' }}>&nbsp;登录&nbsp;</Link>吧！</Typography>

              <Box
                sx={{
                  maxWidth: 375,
                  margin: 'auto',
                  mt: 3,
                }}
              >
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
                        // onChange={(e) => field.onChange(e.target.value)}
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

                  <Button size="large" variant="contained" type="submit" fullWidth sx={{ my: 1 }}>
                    注册
                  </Button>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Divider>第三方账号注册</Divider>
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
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
