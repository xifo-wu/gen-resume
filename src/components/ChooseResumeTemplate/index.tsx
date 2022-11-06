import { Box, ButtonBase } from '@mui/material';
import Image from 'next/image';
import CheckIcon from '@mui/icons-material/Check';
import resumeTemplateList from '@/constant/resumeTemplateList';
import styles from './styles';

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

const ChooseResumeTemplate = (props: Props) => {
  const { value, onChange } = props;

  function handleChange(key: string) {
    if (key === value) return;

    onChange(key);
  }

  return (
    <Box sx={styles.container}>
      {resumeTemplateList.map((item) => (
        <ButtonBase key={item.key} sx={styles.buttonBase} onClick={() => handleChange(item.key)}>
          <Image fill src={item.cover} style={{ objectFit: 'cover' }} alt={item.name} />

          <Box className="item-content">
            <Box className="item-name">{item.name}</Box>
          </Box>

          {value === item.key && (
            <Box className="item-content-selected">
              <Box className="item-name">
                <CheckIcon />
              </Box>
            </Box>
          )}
        </ButtonBase>
      ))}
    </Box>
  );
};

export default ChooseResumeTemplate;
