// Components
import { Box, Container, Grid, Paper } from '@mui/material';
import FullPageLoading from '@/components/FullPageLoading';
import FullBackgroundArea from '@/components/FullBackgroundArea';
import ResumeModuleManage from '@/components/ResumeModuleManage';

// Hooks
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useApi from '@/hooks/useApi';

// Constant
import templateMap from '@/components/Resume/templateMap';

import styles from '@/components/EditResumePage/styles';
import ChooseResumeTemplate from '@/components/ChooseResumeTemplate';
import ToolsBar from '@/components/EditResumePage/ToolsBar';
import ResumeSetting from '@/components/ResumeSetting';
import { toast } from 'react-toastify';
import { apiPut } from '@/api';

const EditResumePage = () => {
  const router = useRouter();
  const { query } = router;
  const {
    data = {},
    loading,
    mutate,
    ...rest
  } = useApi(query.slug ? `/api/v1/resumes/${query.slug}` : null);
  // 当前的工具 Tab
  const [currentTab, setCurrentTab] = useState('chooseResumeTemplate');

  console.log(data, "lllll", rest)

  if (loading) {
    return <FullPageLoading loading={loading} />;
  }

  const ResumeComponent = templateMap[data.layoutType].component || null;
  const handleActionClick = () => {};
  async function handleLayoutTypeChange(layoutType: string) {
    // TODO Fix any
    mutate(
      async (originData: any) => {
        const response = await apiPut({
          url: `/api/v1/resumes/${query.slug}/resume-layout-type`,
          data: {
            layoutType,
          },
        });
        const { error } = response;
        if (error) {
          toast.error(error.message);
          return originData;
        }

        console.log(response, 'response');

        return response;
      },
      { revalidate: false },
    );
  }

  return (
    <Box sx={styles.pageContainer}>
      <FullBackgroundArea
        sx={{
          zIndex: -1,
          position: 'fixed',
          '& .overlay-bottom': {
            background: 'transparent',
          },
        }}
        src="https://unsplash.com/photos/YmQ0-nmWcV0/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mjh8fHNlYXxlbnwwfHx8fDE2Njc5Nzg5NTM&force=true&w=1920"
      />

      <Container maxWidth="xl">
        <Box sx={styles.imitateMacAppContainer}>
          <Box sx={styles.imitateMacAppHeader}>
            <Box sx={styles.menuCircle}>
              <Box className="close action" />
              <Box className="yellow action" />
              <Box className="full action" />
            </Box>
          </Box>

          <Box sx={styles.imitateMacAppBody}>
            <Grid container>
              <Grid item xs>
                <ToolsBar value={currentTab} onChange={setCurrentTab} />
                <Box
                  sx={{
                    height: `calc(${297 * 0.7}mm - 56px)`,
                  }}
                >
                  {currentTab === 'chooseResumeTemplate' && (
                    <ChooseResumeTemplate
                      value={data.layoutType}
                      onChange={handleLayoutTypeChange}
                    />
                  )}

                  {currentTab === 'resumeSetting' && (
                    <ResumeSetting
                      layoutType={data.layoutType}
                      themeColor={data.themeColor}
                      mutate={mutate}
                    />
                  )}

                  <ResumeModuleManage data={data} currentTab={currentTab} onChange={setCurrentTab} />
                </Box>
              </Grid>
              <Grid item xs="auto">
                <Box
                  sx={{
                    width: `calc(${210 * 0.7}mm)`,
                    height: `calc(${297 * 0.7}mm)`,
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      transform: 'scale(0.7)',
                      width: '210mm',
                      height: '297mm',
                      transformOrigin: 'top left',
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },
                    }}
                  >
                    <ResumeComponent data={data} onActionClick={handleActionClick} />
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EditResumePage;
