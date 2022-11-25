import { Box, Tabs, Tab } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import styles from './styles';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ToolsBar = (props: Props) => {
  const { value, onChange } = props;

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    onChange(newValue);
  };

  return (
    <Box sx={styles.container}>
      <Tabs variant="scrollable" value={value} onChange={handleChange} sx={styles.tabs}>
        <Tab value="chooseResumeTemplate" label="选择模版" />
        <Tab value="resumeSetting" label="简历设置" />
        <Tab value="moduleManage" label="模块管理" />
        <Tab value="printPreview" icon={<PrintIcon />} iconPosition="start" label="打印预览" />
      </Tabs>
    </Box>
  );
};

export default ToolsBar;
