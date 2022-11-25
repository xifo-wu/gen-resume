import type { KeyedMutator } from 'swr';
import type { Color, ColorChangeHandler } from 'react-color';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { apiPut } from '@/api';
import { toast } from 'react-toastify';
import { Box, rgbToHex, Typography } from '@mui/material';
import { SketchPicker } from 'react-color';
import { resumeTemplateMap } from '@/components/Resume/templateMap';;
import resumePresetColors from '@/constant/resumePresetColors';
import styles from './styles';

interface Props {
  mutate: KeyedMutator<any>;
  themeColor: string;
  layoutType: string;
}

const ResumeSetting = (props: Props) => {
  const { mutate, layoutType, themeColor: themeColorProps } = props;
  const router = useRouter();
  const { query } = router;

  const [themeColor, setThemeColor] = useState<Color>(() => {
    if (themeColorProps) {
      return rgbToHex(themeColorProps);
    }

    return rgbToHex(resumeTemplateMap[layoutType].themeColor);
  });

  const handleThemeChangeComplete: ColorChangeHandler = (color) => {
    setThemeColor(color.rgb);
    const rgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a || 1})`;

    mutate(
      async (originData: any) => {
        const response = await apiPut({
          url: `/api/v1/resumes/${query.slug}`,
          data: {
            themeColor: rgba,
          },
        });
        const { error } = response;
        if (error) {
          toast.error(error.message);
          return originData;
        }

        return response;
      },
      { revalidate: false },
    );
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="button" gutterBottom>
        主题色
      </Typography>
      <Box>
        <SketchPicker
          styles={{
            default: {
              picker: {
                width: 256,
                boxShadow: 'none',
                position: 'relative',
                boxSizing: 'border-box',
              },
            },
          }}
          color={themeColor}
          onChangeComplete={handleThemeChangeComplete}
          presetColors={resumePresetColors}
        />
      </Box>
    </Box>
  );
};

export default ResumeSetting;
