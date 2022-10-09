import React from 'react';
import { styled, useMediaQuery, useTheme } from '@mui/material';

// project imports
import animations from '@/utils/animations';
import type { AnimationsKeys } from '@/utils/animations';

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  // 开启加载时动画
  enableLoadingAnimation?: boolean;
  // 动画名称
  animation?: AnimationsKeys;
}

interface GenGProps {
  animation?: AnimationsKeys;
  enableLoadingAnimation?: boolean;
}

const GenG = styled('g', {
  shouldForwardProp: (prop) => prop !== 'animation' && prop !== 'enableLoadingAnimation',
})<GenGProps>(({ animation, enableLoadingAnimation }) => ({
  ...(animation && enableLoadingAnimation && { animationName: animations[animation] }),
  animationDuration: '5s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'ease-in-out',
}));

const Logo = (props: LogoProps) => {
  const { animation, enableLoadingAnimation, ...rest } = props;
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      viewBox="0 0 213 48"
      preserveAspectRatio="xMidYMid meet"
      colorInterpolationFilters="sRGB"
      {...rest}
    >
      <g>
        <g fill={matchUpMd ? "url(#gradient)" : '#2065d1' }>
          <g transform="scale(1)">
            <GenG animation={animation} enableLoadingAnimation={enableLoadingAnimation}>
              <path
                d="M14.28-13.09L14.28-13.09 18.75-13.09Q19.66-13.09 20.22-12.53 20.78-11.97 20.78-11.06L20.78-11.06 20.78-3.53Q20.78-2.44 20.03-1.75L20.03-1.75Q17.19 0.44 13.09 0.44L13.09 0.44Q8.06 0.44 4.89-2.78 1.72-6 1.72-11.75L1.72-11.75Q1.72-17.44 4.95-20.78 8.19-24.13 13.09-24.13L13.09-24.13Q16.59-24.13 19.22-22.16L19.22-22.16Q20.41-21.09 19.22-19.69L19.22-19.69Q17.88-18.06 16.34-19.25L16.34-19.25Q14.88-20.06 13.25-20.06L13.25-20.06Q10.25-20.06 8.41-17.88 6.56-15.69 6.56-11.91L6.56-11.91Q6.56-7.97 8.34-5.81 10.13-3.66 13.56-3.66L13.56-3.66Q15.47-3.66 16.53-4.53L16.53-4.53 16.53-9.22 14.28-9.22Q12.34-9.22 12.34-11.16 12.34-13.09 14.28-13.09ZM38.75 0L38.75 0 27.94 0Q27 0 26.42-0.58 25.84-1.16 25.84-2.09L25.84-2.09 25.84-21.59Q25.84-22.53 26.42-23.11 27-23.69 27.94-23.69L27.94-23.69 38.44-23.69Q40.38-23.69 40.38-21.72 40.38-19.75 38.44-19.75L38.44-19.75 30.59-19.75 30.59-14.28 36.91-14.28Q38.91-14.28 38.91-12.28L38.91-12.28Q38.91-10.31 36.91-10.31L36.91-10.31 30.59-10.31 30.59-3.97 38.75-3.97Q40.72-3.97 40.72-1.97L40.72-1.97Q40.72 0 38.75 0ZM47.59-23.69L47.59-23.69 49.22-23.69Q50.34-23.69 50.88-22.69L50.88-22.69 57.22-11.06 59.59-5.94 59.75-5.94Q59.13-12.13 59.13-14.25L59.13-14.25 59.13-21.44Q59.13-23.69 61.38-23.69 63.63-23.69 63.63-21.44L63.63-21.44 63.63-2.41Q63.63-1.25 62.83-0.63 62.03 0 60.78 0L60.78 0Q58.81 0 58.03-1.44L58.03-1.44 51.97-12.69 49.56-17.75 49.41-17.75Q49.44-17.31 49.64-15.33 49.84-13.34 49.92-12.03 50-10.72 50-9.5L50-9.5 50-2.25Q50 0 47.75 0 45.5 0 45.5-2.25L45.5-2.25 45.5-21.59Q45.5-22.53 46.08-23.11 46.66-23.69 47.59-23.69Z"
                transform="translate(0, 24.1299991607666)"
              />
            </GenG>
            <g fill="#0a0619" transform="translate(67, 0)">
              <g transform="scale(1)">
                <path
                  d="M8.63-7.5L8.63-7.5 3.22-7.5Q1.56-7.5 1.56-9.19L1.56-9.19Q1.56-10.84 3.22-10.84L3.22-10.84 8.63-10.84Q10.31-10.84 10.31-9.19L10.31-9.19Q10.31-7.5 8.63-7.5ZM22.53-19.94L19.47-19.94 19.47-12.72 22.53-12.72Q27.25-12.72 27.25-16.5L27.25-16.5Q27.25-18.34 26.08-19.14 24.91-19.94 22.53-19.94L22.53-19.94ZM16.81-23.69L16.81-23.69 22.97-23.69Q31.88-23.69 31.88-16.5L31.88-16.5Q31.88-11.44 27.38-9.69L27.38-9.69 31.56-2.38Q32.16-1.31 31.78-0.66 31.41 0 30.19 0L30.19 0 29.09 0Q27.56 0 26.91-1.28L26.91-1.28 22.75-8.97 19.47-8.97 19.47-2.38Q19.47 0 17.09 0 14.72 0 14.72-2.38L14.72-2.38 14.72-21.59Q14.72-22.53 15.3-23.11 15.88-23.69 16.81-23.69ZM49.44 0L49.44 0 38.63 0Q37.69 0 37.11-0.58 36.53-1.16 36.53-2.09L36.53-2.09 36.53-21.59Q36.53-22.53 37.11-23.11 37.69-23.69 38.63-23.69L38.63-23.69 49.13-23.69Q51.06-23.69 51.06-21.72 51.06-19.75 49.13-19.75L49.13-19.75 41.28-19.75 41.28-14.28 47.59-14.28Q49.59-14.28 49.59-12.28L49.59-12.28Q49.59-10.31 47.59-10.31L47.59-10.31 41.28-10.31 41.28-3.97 49.44-3.97Q51.41-3.97 51.41-1.97L51.41-1.97Q51.41 0 49.44 0ZM69.66-1.69L69.66-1.69Q67.28 0.44 63.25 0.44L63.25 0.44Q59.47 0.44 56.22-1.69L56.22-1.69Q54.63-3 55.94-4.56L55.94-4.56Q57.34-6.25 59.19-4.91L59.19-4.91Q61.28-3.66 63.38-3.66L63.38-3.66Q65.19-3.66 66.16-4.38 67.13-5.09 67.13-6.38L67.13-6.38Q67.13-7 66.92-7.45 66.72-7.91 66.11-8.31 65.5-8.72 65.09-8.91 64.69-9.09 63.59-9.56L63.59-9.56 60.41-10.91Q55.63-12.91 55.63-17.28L55.63-17.28Q55.63-20.22 57.92-22.17 60.22-24.13 63.81-24.13L63.81-24.13Q67.19-24.13 69.88-22.25L69.88-22.25Q71.25-21.06 70.09-19.69L70.09-19.69Q68.78-18.09 67.19-19.22L67.19-19.22Q65.56-20.06 63.81-20.06L63.81-20.06Q62.22-20.06 61.3-19.39 60.38-18.72 60.38-17.56L60.38-17.56Q60.38-16.47 61.22-15.86 62.06-15.25 63.81-14.56L63.81-14.56Q64-14.5 64.09-14.47L64.09-14.47 67.19-13.16Q69.5-12.19 70.73-10.67 71.97-9.16 71.97-6.72L71.97-6.72Q71.97-3.72 69.66-1.69ZM89.81-10.25L89.81-10.25 89.81-21.41Q89.81-23.69 92.09-23.69 94.38-23.69 94.38-21.41L94.38-21.41 94.38-10.66Q94.38 0.44 85.22 0.44L85.22 0.44Q76 0.44 76-10.66L76-10.66 76-21.31Q76-23.69 78.38-23.69 80.75-23.69 80.75-21.31L80.75-21.31 80.75-10.25Q80.75-6.69 81.89-5.17 83.03-3.66 85.22-3.66L85.22-3.66Q87.47-3.66 88.64-5.19 89.81-6.72 89.81-10.25ZM117.94-23.69L117.94-23.69 120.31-23.69Q120.88-23.69 121.2-23.36 121.53-23.03 121.53-22.47L121.53-22.47 121.53-2.16Q121.53 0 119.41 0L119.41 0Q117.22 0 117.22-2.16L117.22-2.16 117.22-9.88Q117.22-11.56 117.81-17.66L117.81-17.66 117.66-17.66Q116.28-13.56 112.59-3.44L112.59-3.44Q112.13-2.16 110.72-2.16L110.72-2.16 110.63-2.16Q109.38-2.16 108.94-3.31L108.94-3.31 105.69-12.09 103.81-17.66 103.69-17.66Q104.28-11.56 104.28-9.88L104.28-9.88 104.28-2.13Q104.28 0 102.19 0L102.19 0Q100.03 0 100.03-2.13L100.03-2.13 100.03-21.59Q100.03-22.53 100.61-23.11 101.19-23.69 102.13-23.69L102.13-23.69 103.66-23.69Q104.41-23.69 105.02-23.27 105.63-22.84 105.84-22.16L105.84-22.16 109.31-12.59Q109.72-11.41 110.75-8.03L110.75-8.03 110.91-8.03Q111.13-8.69 111.59-10.23 112.06-11.78 112.34-12.59L112.34-12.59 115.75-22.16Q115.97-22.84 116.58-23.27 117.19-23.69 117.94-23.69ZM140.25 0L140.25 0 129.44 0Q128.5 0 127.92-0.58 127.34-1.16 127.34-2.09L127.34-2.09 127.34-21.59Q127.34-22.53 127.92-23.11 128.5-23.69 129.44-23.69L129.44-23.69 139.94-23.69Q141.88-23.69 141.88-21.72 141.88-19.75 139.94-19.75L139.94-19.75 132.09-19.75 132.09-14.28 138.41-14.28Q140.41-14.28 140.41-12.28L140.41-12.28Q140.41-10.31 138.41-10.31L138.41-10.31 132.09-10.31 132.09-3.97 140.25-3.97Q142.22-3.97 142.22-1.97L142.22-1.97Q142.22 0 140.25 0Z"
                  transform="translate(-1.559999942779541, 24.1299991607666)"
                />
              </g>
            </g>
          </g>
        </g>
        <g
          className="slogan"
          fill="#0a0619"
          transform="matrix(0.8261444514240744,0,0,0.8261444514240744,58.55991344029751,31.82874872795233)"
          opacity={1}
        >
          <g transform="scale(1, 1)">
            <g transform="scale(1.3200000000000003)">
              <path
                d="M5.34-9.75L5.34-9.75Q5.48-9.70 5.67-9.66L5.67-9.66Q6.66-9.52 6.61-9.38L6.61-9.38Q6.61-9.33 6.52-9.23L6.52-9.23Q6.19-8.86 5.72-7.88L5.72-7.88L8.91-7.88Q10.78-7.88 11.34-7.97L11.34-7.97L11.34-6.89Q10.92-6.94 8.91-6.98L8.91-6.98L5.34-6.98Q4.83-6.09 3.84-4.73L3.84-4.73Q3.70-4.55 3.66-4.45L3.66-4.45L3.66-0.14Q3.70 1.22 3.70 1.17L3.70 1.17L2.58 1.17Q2.67 0.66 2.67-0.23L2.67-0.23L2.67-3.42Q1.59-2.34 1.08-1.97L1.08-1.97Q0.61-2.48 0.19-2.72L0.19-2.72Q1.50-3.52 2.67-4.64L2.67-4.64L2.63-5.44Q2.95-5.44 3.28-5.39L3.28-5.39Q3.75-5.91 4.31-6.98L4.31-6.98L3.28-6.98Q2.77-6.98 1.88-6.94L1.88-6.94Q1.27-6.94 1.03-6.94L1.03-6.94L1.03-8.02Q2.11-7.92 3.28-7.92L3.28-7.92L4.73-7.92Q5.16-8.77 5.34-9.75ZM6.89-6.19L6.89-6.19Q7.92-6.23 8.06-6.09L8.06-6.09Q8.06-6 8.02-5.81L8.02-5.81Q7.92-5.58 7.92-5.25L7.92-5.25L7.92-4.13L8.91-4.13Q9.47-4.13 10.78-4.17L10.78-4.17L10.78-3.14Q10.78-3.14 10.59-3.14L10.59-3.14Q9.28-3.23 8.91-3.23L8.91-3.23L7.92-3.23L7.92-0.33L9.09-0.33Q10.78-0.38 11.20-0.42L11.20-0.42L11.20 0.52Q11.06 0.52 10.55 0.52L10.55 0.52Q9.61 0.47 9.09 0.47L9.09 0.47L5.58 0.47Q4.69 0.47 3.94 0.56L3.94 0.56L3.94-0.42Q4.27-0.38 5.53-0.38L5.53-0.38Q6.42-0.33 6.98-0.33L6.98-0.33L6.98-3.23Q5.20-3.23 4.50-3.14L4.50-3.14L4.50-4.17Q5.63-4.13 6.98-4.13L6.98-4.13Q6.98-5.39 6.89-6.19ZM20.33-9.56L20.33-9.56Q20.70-9.52 21.27-9.52L21.27-9.52Q21.73-9.47 21.73-9.42L21.73-9.42Q21.73-9.38 21.69-9.33L21.69-9.33Q21.50-9.09 21.45-8.67L21.45-8.67Q21.36-8.30 21.41-6.75L21.41-6.75L23.33-7.08Q23.75-7.17 24.27-7.31L24.27-7.31Q24.64-7.41 24.59-7.36L24.59-7.36L24.78-6.38Q24.73-6.38 24.64-6.38L24.64-6.38Q24.22-6.38 23.42-6.23L23.42-6.23L21.41-5.91Q21.41-5.16 21.41-4.50L21.41-4.50L23.61-4.92Q24.27-5.02 24.78-5.20L24.78-5.20Q24.88-5.25 24.92-5.25L24.92-5.25L25.11-4.17Q25.06-4.17 24.97-4.17L24.97-4.17Q24.50-4.22 23.70-4.08L23.70-4.08L21.55-3.70Q21.78-2.72 22.11-1.97L22.11-1.97Q22.86-2.67 23.42-3.66L23.42-3.66Q24.59-3 24.59-2.86L24.59-2.86Q24.59-2.77 24.41-2.67L24.41-2.67Q23.61-2.25 22.53-1.17L22.53-1.17Q23.33-0.09 23.89 0L23.89 0Q24.13-0.42 24.13-1.22L24.13-1.22Q24.59-0.80 25.30-0.52L25.30-0.52Q25.25-0.42 25.20-0.28L25.20-0.28Q24.78 1.22 24.31 1.22L24.31 1.22Q23.28 1.13 21.78-0.56L21.78-0.56Q20.33 0.38 19.16 0.98L19.16 0.98Q19.02 1.03 18.97 1.08L18.97 1.08L17.89 0.23Q19.67-0.09 21.36-1.31L21.36-1.31Q20.89-2.30 20.66-3.52L20.66-3.52L20.14-3.38Q19.39-3.23 18.92-3.09L18.92-3.09Q18.83-3 18.78-3.05L18.78-3.05L18.64-4.13Q18.64-4.13 18.73-4.13L18.73-4.13Q19.16-4.08 19.91-4.22L19.91-4.22L20.56-4.36Q20.56-4.55 20.52-4.88L20.52-4.88Q20.47-5.44 20.47-5.72L20.47-5.72L19.81-5.58Q19.30-5.48 18.88-5.34L18.88-5.34Q18.73-5.25 18.73-5.30L18.73-5.30L18.59-6.23Q18.55-6.28 19.02-6.33L19.02-6.33Q19.53-6.38 19.72-6.42L19.72-6.42L20.47-6.56Q20.47-7.45 20.38-8.77L20.38-8.77Q20.33-9.28 20.33-9.56ZM22.02-8.77L22.91-9.33Q23.52-8.77 24.03-7.88L24.03-7.88L22.95-7.31Q22.67-8.16 22.02-8.77L22.02-8.77ZM19.06-1.64L19.06-1.64L19.02-0.56Q18.50-0.47 16.53 0L16.53 0Q15.27 0.23 14.94 0.33L14.94 0.33L14.61-0.89Q16.16-0.89 19.06-1.64ZM16.11-2.95L16.11-2.95Q17.70-3.23 18.64-3.47L18.64-3.47L18.45-2.48Q18.17-2.44 16.53-2.16L16.53-2.16Q15.31-1.92 15.13-1.92L15.13-1.92L14.80-2.95Q15.64-3.52 16.81-5.25L16.81-5.25Q16.44-5.16 15.45-4.97L15.45-4.97Q15.03-4.88 14.89-4.83L14.89-4.83L14.61-5.91Q15.59-6.70 16.58-9.52L16.58-9.52Q16.63-9.52 16.77-9.47L16.77-9.47Q17.98-9.09 17.89-8.91L17.89-8.91Q17.89-8.81 17.75-8.77L17.75-8.77Q17.47-8.63 17.28-8.30L17.28-8.30Q17.09-7.97 16.67-7.31L16.67-7.31Q16.11-6.38 15.69-5.77L15.69-5.77L17.23-6.05Q17.80-6.80 17.98-7.59L17.98-7.59Q18.17-7.50 18.45-7.41L18.45-7.41Q19.34-7.03 19.20-6.94L19.20-6.94Q19.20-6.89 19.11-6.84L19.11-6.84Q18.13-6.05 16.11-2.95ZM35.36-9.75L35.36-9.75Q36.44-9.56 36.58-9.38L36.58-9.38Q36.58-9.33 36.48-9.23L36.48-9.23Q36.16-8.95 35.88-8.48L35.88-8.48L37.66-8.48Q38.69-8.48 39.20-8.58L39.20-8.58Q39.30-8.58 39.30-8.58L39.30-8.58L39.30-7.64Q39.30-7.64 39.20-7.64L39.20-7.64Q38.64-7.73 37.61-7.73L37.61-7.73L37.19-7.73Q37.33-7.41 37.52-6.98L37.52-6.98Q37.61-6.75 37.66-6.61L37.66-6.61L36.63-6.47Q36.44-7.45 36.25-7.73L36.25-7.73L35.50-7.73Q34.98-6.89 34.52-6.38L34.52-6.38L33.53-6.66Q34.70-7.50 35.36-9.75ZM30.77-9.70L30.77-9.70Q31.84-9.38 31.89-9.23L31.89-9.23Q31.89-9.19 31.75-9.09L31.75-9.09Q31.42-8.86 31.14-8.48L31.14-8.48L32.50-8.48Q33.39-8.48 33.95-8.58L33.95-8.58Q34.05-8.58 34.09-8.58L34.09-8.58L34.09-7.64Q34.05-7.64 33.95-7.64L33.95-7.64Q33.48-7.73 32.59-7.73L32.59-7.73L32.41-7.73Q32.59-7.31 32.83-6.61L32.83-6.61L31.84-6.56Q31.80-7.17 31.47-7.73L31.47-7.73L30.67-7.73Q30.58-7.64 30.53-7.55L30.53-7.55Q30.11-6.94 29.69-6.52L29.69-6.52Q29.55-6.38 29.36-6.19L29.36-6.19L28.38-6.66Q30.02-7.78 30.77-9.70ZM30.44-6.09L31.33-6.42Q31.84-5.72 32.22-4.92L32.22-4.92L31.33-4.55Q31.05-5.25 30.44-6.09L30.44-6.09ZM38.55-6.14L38.55-6.14Q38.45-5.77 38.45-4.88L38.45-4.88L38.45 0Q38.78 1.17 36.34 1.22L36.34 1.22Q36.20 0.42 35.92 0L35.92 0Q37.52 0.42 37.42-0.42L37.42-0.42L37.42-5.30L34.23-5.30Q33.34-5.30 32.64-5.20L32.64-5.20Q32.55-5.20 32.55-5.20L32.55-5.20L32.55-6.23Q32.59-6.23 32.69-6.23L32.69-6.23Q33.30-6.14 34.23-6.14L34.23-6.14L37.19-6.14Q37.75-6.14 38.22-6.19L38.22-6.19Q38.36-6.19 38.41-6.19L38.41-6.19Q38.55-6.23 38.55-6.14ZM29.55-5.06L29.55-5.06Q30.67-5.02 30.77-4.83L30.77-4.83Q30.77-4.78 30.72-4.69L30.72-4.69Q30.53-4.31 30.53-3.80L30.53-3.80L30.53-0.66Q30.53 0.47 30.63 1.03L30.63 1.03Q30.63 1.13 30.63 1.13L30.63 1.13L29.50 1.13Q29.59 0.70 29.59-0.61L29.59-0.61L29.59-3.84Q29.59-4.88 29.55-5.06ZM36.02-3.33L36.02-3.33L36.02-1.69Q36.02-0.70 36.11-0.33L36.11-0.33Q35.92-0.42 34.89-0.42L34.89-0.42L32.97-0.42Q31.98-0.42 31.80-0.33L31.80-0.33Q31.89-0.75 31.89-1.45L31.89-1.45L31.89-3.23Q31.89-4.13 31.80-4.50L31.80-4.50Q32.13-4.41 33.06-4.41L33.06-4.41L34.89-4.41Q36.02-4.41 36.11-4.45L36.11-4.45Q36.02-4.27 36.02-3.33ZM35.08-3.70L32.78-3.70L32.78-2.72L35.08-2.72L35.08-3.70ZM35.08-2.11L32.83-2.11L32.83-1.13L35.08-1.13L35.08-2.11ZM44.02-9.19L44.02-9.19Q44.81-9.09 46.45-9.09L46.45-9.09L50.95-9.09Q52.69-9.09 53.16-9.19L53.16-9.19L53.16-8.16Q52.73-8.20 51-8.20L51-8.20L45-8.20Q44.95-3.70 44.63-1.97L44.63-1.97Q44.30-0.19 43.36 0.89L43.36 0.89Q42.94 0.42 42.38 0.09L42.38 0.09Q43.41-0.80 43.73-2.81L43.73-2.81Q44.06-4.69 43.92-9.05L43.92-9.05Q43.92-9.19 44.02-9.19ZM48-7.69L48-7.69Q49.41-7.69 49.45-7.50L49.45-7.50Q49.45-7.50 49.41-7.45L49.41-7.45Q49.13-6.98 49.08-5.67L49.08-5.67L50.20-5.67Q51.66-5.67 52.36-5.72L52.36-5.72Q52.45-5.77 52.41-5.63L52.41-5.63Q52.22-4.41 51.98-1.22L51.98-1.22Q51.94-0.70 51.94-0.61L51.94-0.61Q51.89 0.61 49.36 0.70L49.36 0.70Q49.31 0.05 48.84-0.61L48.84-0.61Q50.06-0.19 50.72-0.66L50.72-0.66Q51.05-1.41 51.28-4.83L51.28-4.83L48.98-4.83Q48.52-0.94 45.56 0.80L45.56 0.80Q45.23 0.42 44.48 0.05L44.48 0.05Q47.63-1.31 47.91-4.78L47.91-4.78L47.53-4.78Q46.22-4.78 45.75-4.73L45.75-4.73L45.75-5.72Q45.84-5.72 45.98-5.72L45.98-5.72Q46.78-5.63 47.53-5.63L47.53-5.63L48.05-5.63Q48.19-6.80 48-7.69ZM65.61-9.42L65.61-9.42Q65.66-9.42 65.80-9.42L65.80-9.42Q66.83-9.33 66.83-9.23L66.83-9.23Q66.88-9.09 66.73-8.86L66.73-8.86Q66.64-8.72 66.64-8.63L66.64-8.63L66.64-0.19Q66.64 0.84 64.58 0.84L64.58 0.84Q64.63 0.33 64.11-0.33L64.11-0.33Q65.56 0 65.70-0.61L65.70-0.61L65.70-7.88Q65.70-9 65.61-9.42ZM59.66-9.42L59.66-9.42Q60.88-9.33 60.88-9.19L60.88-9.19Q60.88-9.14 60.78-9L60.78-9Q60.69-8.86 60.69-8.77L60.69-8.77L60.69-7.73L61.30-7.73Q62.33-7.78 62.84-7.83L62.84-7.83L62.84-6.84Q62.47-6.94 61.30-6.94L61.30-6.94L60.69-6.94L60.69-5.67L61.63-5.67Q62.56-5.72 63.22-5.77L63.22-5.77L63.22-4.88Q62.89-4.92 61.67-4.92L61.67-4.92L60.64-4.92L60.64-3.75L61.53-3.75Q62.42-3.80 63.03-3.84L63.03-3.84Q63.08-3.84 63.08-3.80L63.08-3.80Q63.03-3.70 63.03-3.19L63.03-3.19Q62.98-2.86 62.98-2.63L62.98-2.63Q62.98-2.34 62.98-1.73L62.98-1.73Q62.98-1.13 62.94-0.75L62.94-0.75Q62.80-0.09 61.39-0.05L61.39-0.05Q61.39-0.61 60.92-1.17L60.92-1.17Q61.91-0.89 62-1.22L62-1.22Q62.05-1.69 62.05-3L62.05-3L60.64-3L60.64-0.66Q60.64 0 60.73 0.89L60.73 0.89L59.56 0.89Q59.61 0.28 59.66-0.66L59.66-0.66L59.66-3L58.39-3L58.39-1.36Q58.39-0.38 58.44-0.05L58.44-0.05L57.45-0.05Q57.45-0.19 57.45-0.56L57.45-0.56Q57.50-1.13 57.50-1.36L57.50-1.36L57.50-2.48Q57.50-3.23 57.41-3.80L57.41-3.80Q57.41-3.84 57.45-3.84L57.45-3.84Q58.20-3.75 58.91-3.75L58.91-3.75L59.70-3.75L59.70-4.92L58.34-4.92Q57.59-4.92 56.84-4.83L56.84-4.83L56.84-5.77Q57.59-5.67 58.34-5.67L58.34-5.67L59.70-5.67L59.70-6.94L58.20-6.94Q57.69-6 57.69-6L57.69-6Q57.36-6.23 56.84-6.33L56.84-6.33Q57.55-7.45 58.06-8.81L58.06-8.81L58.91-8.58Q58.86-8.48 58.77-8.30L58.77-8.30Q58.63-7.97 58.53-7.69L58.53-7.69L59.70-7.69L59.70-8.81Q59.70-9.05 59.66-9.28L59.66-9.28Q59.66-9.38 59.66-9.42ZM63.64-7.97L63.64-7.97Q64.39-7.97 64.81-7.78L64.81-7.78Q64.81-7.73 64.77-7.55L64.77-7.55Q64.67-7.31 64.67-7.13L64.67-7.13L64.67-3Q64.67-2.16 64.77-1.41L64.77-1.41L63.69-1.41Q63.69-1.55 63.69-2.20L63.69-2.20Q63.73-2.91 63.73-3.09L63.73-3.09L63.73-6.84Q63.73-7.73 63.64-7.97ZM76.42-9.56L76.42-9.56Q77.45-9.33 77.55-9.14L77.55-9.14Q77.50-9.05 77.36-8.86L77.36-8.86Q77.17-8.72 77.13-8.63L77.13-8.63Q77.08-8.53 76.89-8.20L76.89-8.20Q76.70-7.83 76.56-7.59L76.56-7.59L79.47-7.59Q80.41-7.59 81.30-7.69L81.30-7.69L81.30-6.70Q80.88-6.75 79.42-6.80L79.42-6.80L77.45-6.80L77.45-4.92L79.23-4.92Q79.94-4.92 80.83-5.02L80.83-5.02L80.83-4.03Q80.08-4.13 79.23-4.13L79.23-4.13L77.45-4.13L77.45-2.06L79.42-2.06Q80.36-2.11 81.06-2.16L81.06-2.16L81.06-1.17Q80.41-1.22 79.42-1.27L79.42-1.27L77.45-1.27L77.45-0.56Q77.45 0.56 77.55 1.03L77.55 1.03L76.42 1.03Q76.52 0.19 76.52-0.70L76.52-0.70L76.52-6.80L76.14-6.80L74.92-4.59Q74.50-4.88 73.94-5.02L73.94-5.02Q75.48-6.94 76.42-9.56ZM73.09-9.52L73.09-9.52Q74.27-9.14 74.22-8.95L74.22-8.95Q74.22-8.86 74.08-8.77L74.08-8.77Q73.89-8.58 73.80-8.39L73.80-8.39Q73.38-7.45 73.19-6.98L73.19-6.98L73.19-0.98Q73.19-0.75 73.23 0L73.23 0Q73.23 0.56 73.23 0.70L73.23 0.70L72.25 0.70Q72.34-0.09 72.34-0.98L72.34-0.98L72.34-5.53L71.22-3.61Q70.98-3.89 70.47-4.41L70.47-4.41Q72.11-6.42 73.09-9.52Z"
                transform="translate(-0.1875, 9.75)"
              />
            </g>
          </g>
        </g>
      </g>
      <defs>
        <linearGradient x1={0} y1={0} x2={1} y2={0} id="gradient">
          <stop offset="0%" stopColor="#2065d1" />
          <stop offset="100%" stopColor="#05befe" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
