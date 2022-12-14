import { ReactElement, useRef, useState } from 'react';
import router from 'next/router';
import LoadingButton from '@mui/lab/LoadingButton';
import { Theme, lighten, Grid } from '@mui/material';
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
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  login: string;
  password: string;
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
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (payload: FormData) => {
    setSubmitting(true);
    const { status, data, error } = await apiPost<FormData, any>({
      url: '/api/v1/auth/login/using-password',
      data: payload,
    });

    if (status >= 400 && error) {
      setSubmitting(false);
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success('ζ¬’θΏεζ₯ π ');
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
            <Title>ζ¬’θΏεζ₯</Title>
            <SubTitle>
              θΏζ²‘ζθ΄¦ε·οΌ
              <Link href="/sign-up" sx={{ textDecoration: 'none' }}>
                &nbsp;ζ³¨ε&nbsp;
              </Link>
            </SubTitle>
            <Form onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
              <InputField<FormData>
                name="login"
                control={control}
                errors={errors}
                rules={{
                  required: 'η¨ζ·εδΈθ½δΈΊη©Ί',
                }}
                inputField={{
                  label: 'η¨ζ·ε',
                  placeholder: 'δ½Ώη¨η¨ζ·εζι?η?±η»ε½'
                }}
              />

              <PasswordField<FormData>
                name="password"
                control={control}
                errors={errors}
                rules={{
                  required: 'ε―η δΈθ½δΈΊη©Ί',
                }}
                inputField={{
                  label: 'ε―η ',
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
                {submitting ? 'η»ε½δΈ­οΌθ―·η¨ε' : 'η»ε½'}
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
